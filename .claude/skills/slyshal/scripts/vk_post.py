#!/usr/bin/env python3
"""Post a photo entry to the VK community wall.

    vk_post.py "текст поста" slide1.jpg slide2.jpg ...
    vk_post.py --at "2026-09-20 15:00" "текст" slide*.jpg

--at takes local Chelyabinsk time (UTC+5) and schedules the post instead of
publishing it now.

Reads VK_TOKEN (community token with wall+photos+docs) and VK_GROUP_ID
(numeric, no minus sign) from the environment. The token is only ever sent
in a POST body, never printed — including in error messages, which are
reported from VK's own JSON.
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
MAX_ATTACHMENTS = 10


def call(method, token, **params):
    """Call a VK method, raising on an API error.

    VK answers errors with HTTP 200 and an "error" object, so a response
    that is not checked here would flow on as if it were a result.
    """
    params.update(access_token=token, v=VERSION)
    r = requests.post(f"{API}/{method}", data=params, timeout=60)
    r.raise_for_status()
    body = r.json()
    if "error" in body:
        err = body["error"]
        sys.exit(f"VK error {err['error_code']}: {err['error_msg']}")
    return body["response"]


def upload_photo(path, token, group_id):
    """Upload one photo to the wall and return its attachment string."""
    # Each photo needs its own upload server; the URL is single-use.
    upload_url = call("photos.getWallUploadServer", token, group_id=group_id)["upload_url"]

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

    token = os.environ.get("VK_TOKEN")
    group_id = os.environ.get("VK_GROUP_ID")
    if not token:
        sys.exit("VK_TOKEN is not set — add it to the cloud environment's variables")
    if not group_id:
        sys.exit("VK_GROUP_ID is not set (numeric id, no minus sign)")

    if len(args.photos) > MAX_ATTACHMENTS:
        sys.exit(f"VK allows at most {MAX_ATTACHMENTS} attachments, got {len(args.photos)}")
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
