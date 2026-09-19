#!/usr/bin/env python3
"""Post a photo entry to the VK community wall.

    vk_post.py "текст поста" slide1.jpg slide2.jpg ...
    vk_post.py --at "2026-09-20 15:00" "текст" slide*.jpg

--at takes local Chelyabinsk time (UTC+5) and schedules the post instead of
publishing it now.

Reads VK_GROUP_ID (numeric, no minus sign) and a token from the
environment. Two tokens matter, and which one is present decides what the
script can do:

  VK_USER_TOKEN  a personal token of a community admin, scope
                 photos,wall,offline. REQUIRED for any post with photos.
  VK_TOKEN       the community token. Posts text, but VK refuses it every
                 photo upload method (error 27), so it cannot build a
                 carousel.

Posting still happens as the community either way: wall.post carries
owner_id=-<group> and from_group=1, so a user token produces a post signed
by the community, not by the person.

Tokens are only ever sent in a POST body, never printed — including in
error messages, which are reported from VK's own JSON.
"""

import argparse
import datetime as dt
import os
import sys

try:
    import requests
except ImportError:
    sys.exit("python3 -m pip install requests")

API = "https://api.vk.com/method"
VERSION = "5.199"
TZ_OFFSET = dt.timedelta(hours=5)  # Chelyabinsk
# VK itself accepts ten, but the owner's rule for this account is three:
# a wall post never carries more.
MAX_ATTACHMENTS = 3


def call(method, token, _on_27=None, **params):
    """Call a VK method, raising on an API error.

    VK answers errors with HTTP 200 and an "error" object, so a response
    that is not checked here would flow on as if it were a result.

    `_on_27` replaces the message for error 27, which always means the
    same thing — this token is a community token and the method wants a
    personal one — and always needs the same long explanation.
    """
    params.update(access_token=token, v=VERSION)
    r = requests.post(f"{API}/{method}", data=params, timeout=60)
    r.raise_for_status()
    body = r.json()
    if "error" in body:
        err = body["error"]
        if err["error_code"] == 27 and _on_27:
            sys.exit(_on_27)
        sys.exit(f"VK error {err['error_code']}: {err['error_msg']}")
    return body["response"]


NO_PHOTO_UPLOAD = """\
VK error 27 on photos.getWallUploadServer.

A community token cannot upload photos to a wall — the permission is
granted (groups.getTokenPermissions lists "photos") but VK refuses the
method itself, on every API version, and the same for
photos.getUploadServer and docs.getWallUploadServer. There is no way
round it from the community side, so a post with photos needs a
personal token of a community admin.

To make one: dev.vk.com → Мои приложения → создать Standalone-приложение,
take its client_id, and open

  https://oauth.vk.com/authorize?client_id=<ID>&display=page
  &redirect_uri=https://oauth.vk.com/blank.html
  &scope=photos,wall,offline&response_type=token&v=5.199

Grant it, then copy access_token= out of the address bar you land on and
set it as VK_USER_TOKEN in the cloud environment's variables. Do not paste
a token into a chat message — it grants your account, not the community.
The post is still signed by the community: from_group=1 sees to that."""


def upload_photo(path, token, group_id):
    """Upload one photo to the wall and return its attachment string."""
    # Each photo needs its own upload server; the URL is single-use.
    server = call("photos.getWallUploadServer", token, group_id=group_id,
                  _on_27=NO_PHOTO_UPLOAD)
    upload_url = server["upload_url"]

    with open(path, "rb") as fh:
        up = requests.post(upload_url, files={"photo": (os.path.basename(path), fh)}, timeout=180)
    up.raise_for_status()
    uploaded = up.json()

    saved = call(
        "photos.saveWallPhoto",
        token,
        group_id=group_id,
        server=uploaded["server"],
        photo=uploaded["photo"],
        hash=uploaded["hash"],
    )[0]
    return f"photo{saved['owner_id']}_{saved['id']}"


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--at", metavar="'YYYY-MM-DD HH:MM'",
                    help="schedule for this local Chelyabinsk time instead of posting now")
    ap.add_argument("message")
    ap.add_argument("photos", nargs="+")
    args = ap.parse_args()

    # A user token does everything a community token does here and is the
    # only one VK lets upload a photo, so it wins whenever it is set.
    token = os.environ.get("VK_USER_TOKEN") or os.environ.get("VK_TOKEN")
    group_id = os.environ.get("VK_GROUP_ID")
    if not token:
        sys.exit("Neither VK_USER_TOKEN nor VK_TOKEN is set — add one to "
                 "the cloud environment's variables")
    if not group_id:
        sys.exit("VK_GROUP_ID is not set (numeric id, no minus sign)")
    if not os.environ.get("VK_USER_TOKEN"):
        print("warning: posting with the community token; photos will fail",
              file=sys.stderr)

    if len(args.photos) > MAX_ATTACHMENTS:
        sys.exit(f"a post carries at most {MAX_ATTACHMENTS} photos, got {len(args.photos)}")
    missing = [p for p in args.photos if not os.path.isfile(p)]
    if missing:
        sys.exit("no such file: " + ", ".join(missing))

    # Resolve the schedule before uploading, so a bad time fails in a second
    # rather than after seven photos have gone up.
    publish_date = None
    if args.at:
        local = dt.datetime.strptime(args.at, "%Y-%m-%d %H:%M")
        when = (local - TZ_OFFSET).replace(tzinfo=dt.timezone.utc)
        if when <= dt.datetime.now(dt.timezone.utc):
            sys.exit(f"{args.at} is in the past")
        publish_date = int(when.timestamp())
        print(f"scheduling for {args.at} Chelyabinsk ({when:%Y-%m-%d %H:%M} UTC)", file=sys.stderr)

    print(f"uploading {len(args.photos)} photo(s)…", file=sys.stderr)
    attachments = []
    for path in args.photos:
        attachment = upload_photo(path, token, group_id)
        attachments.append(attachment)
        print(f"  {os.path.basename(path)} → {attachment}", file=sys.stderr)

    params = dict(
        owner_id=f"-{group_id}",
        from_group=1,
        message=args.message,
        attachments=",".join(attachments),
    )

    if publish_date is not None:
        params["publish_date"] = publish_date

    post_id = call("wall.post", token, **params)["post_id"]
    verb = "scheduled" if args.at else "published"
    print(f"{verb}: https://vk.com/wall-{group_id}_{post_id}")


if __name__ == "__main__":
    main()
