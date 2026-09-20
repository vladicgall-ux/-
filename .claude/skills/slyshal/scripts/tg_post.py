#!/usr/bin/env python3
"""Post a slide and its text to the private Telegram channel.

    tg_post.py --text-file тексты/09-00-щука.txt morning-solo.jpg
    tg_post.py "текст поста" slide1.jpg slide2.jpg slide3.jpg
    tg_post.py --delete 412 413        удалить свои сообщения по id

The channel is a staging area: the post is assembled here exactly as it
should look on the VK wall, and the owner copies it across by hand. So the
text is never rewritten for Telegram — no Markdown, no parse_mode, nothing
that would have to be undone on the way out. What goes up is byte for byte
what sits in тексты/.

The feed posts one slide, so a post is normally a single photograph with
the text as its caption. Several files still work and go up as an album in
the order given, which Telegram keeps — that order is the post itself, so
it is never sorted or reshuffled here.

One Telegram limit shapes the output. A caption attached to media tops out
at 1024 characters, which is what the texts in solo/тексты are written to.
If one ever runs longer:

  text <= 1024   one message: the photo, or the album, carrying the caption.
  text >  1024   media with no caption, then the full text as a reply to
                 it. The channel renders that as the picture with the text
                 directly underneath — the same thing to look at, two
                 message ids instead of one.

Every id is printed either way, so --delete can take the post back.

Reads TG_BOT_TOKEN and TG_CHANNEL from the environment. TG_CHANNEL may be
"postvk74", "@postvk74" or a numeric -100... id. The token is only ever
sent in a request body or URL to api.telegram.org and never printed,
including in error messages, which are reported from Telegram's own JSON.
"""

import argparse
import json
import os
import sys
import time

try:
    import requests
except ImportError:
    sys.exit("python3 -m pip install requests")

API = "https://api.telegram.org/bot{token}/{method}"
CAPTION_LIMIT = 1024
MESSAGE_LIMIT = 4096
# Telegram allows ten per album, the owner's rule for this feed is three.
MAX_SLIDES = 3
# Albums are rate limited harder than plain messages; a second between
# posts keeps a three-post run clear of 429s.
GAP_BETWEEN_POSTS = 1.0


def env(name):
    value = os.environ.get(name, "").strip()
    if not value:
        sys.exit(f"{name} не задан в переменных окружения")
    return value


def chat_id():
    """Normalise TG_CHANNEL into something the API accepts."""
    channel = env("TG_CHANNEL")
    if channel.startswith("@") or channel.lstrip("-").isdigit():
        return channel
    return "@" + channel


def call(method, token, files=None, **params):
    """One API call. Raises with Telegram's own description on failure."""
    url = API.format(token=token, method=method)
    try:
        response = requests.post(url, data=params, files=files, timeout=120)
    except requests.RequestException as exc:
        raise SystemExit(f"{method}: сеть не отвечает — {exc}")
    try:
        body = response.json()
    except ValueError:
        raise SystemExit(f"{method}: HTTP {response.status_code}, ответ не JSON")
    if not body.get("ok"):
        raise SystemExit(
            f"{method}: ошибка {body.get('error_code')} — "
            f"{body.get('description')}"
        )
    return body["result"]


def post(text, slides, token, chat):
    """Send one post. Returns the ids of the messages it created."""
    if not slides:
        sys.exit("нужен хотя бы один слайд")
    if len(slides) > MAX_SLIDES:
        sys.exit(f"слайдов не больше {MAX_SLIDES}, передано {len(slides)}")
    if len(text) > MESSAGE_LIMIT:
        sys.exit(
            f"текст в {len(text)} символов не влезет и в отдельное "
            f"сообщение (предел {MESSAGE_LIMIT})"
        )
    for path in slides:
        if not os.path.isfile(path):
            sys.exit(f"нет файла {path}")

    inline = len(text) <= CAPTION_LIMIT
    handles = []
    try:
        if len(slides) == 1:
            # sendMediaGroup wants at least two, so a single slide is an
            # ordinary photo message rather than an album of one.
            handle = open(slides[0], "rb")
            handles.append(handle)
            params = {"chat_id": chat}
            if inline:
                params["caption"] = text
            messages = [
                call("sendPhoto", token, files={"photo": handle}, **params)
            ]
        else:
            media, files = [], {}
            for index, path in enumerate(slides):
                tag = f"slide{index}"
                handle = open(path, "rb")
                handles.append(handle)
                files[tag] = handle
                item = {"type": "photo", "media": f"attach://{tag}"}
                if index == 0 and inline:
                    item["caption"] = text
                media.append(item)
            messages = call(
                "sendMediaGroup",
                token,
                files=files,
                chat_id=chat,
                media=json.dumps(media, ensure_ascii=False),
            )
    finally:
        for handle in handles:
            handle.close()

    ids = [message["message_id"] for message in messages]

    if not inline:
        # The text hangs off the picture as a reply, so the channel keeps
        # the two together instead of letting anything slip between them.
        caption = call(
            "sendMessage",
            token,
            chat_id=chat,
            text=text,
            reply_to_message_id=ids[0],
            disable_web_page_preview=True,
        )
        ids.append(caption["message_id"])

    return ids, inline


def delete(ids, token, chat):
    for message_id in ids:
        call("deleteMessage", token, chat_id=chat, message_id=int(message_id))
        print(f"удалено сообщение {message_id}")


def main():
    parser = argparse.ArgumentParser(
        description="Выложить слайд с вэкашным текстом в канал."
    )
    parser.add_argument("text", nargs="?", help="текст поста")
    parser.add_argument(
        "slides", nargs="*", help=f"файлы слайдов по порядку (до {MAX_SLIDES})"
    )
    parser.add_argument(
        "--text-file", help="взять текст из файла вместо первого аргумента"
    )
    parser.add_argument(
        "--delete",
        nargs="+",
        metavar="ID",
        help="удалить свои сообщения по id и выйти",
    )
    args = parser.parse_args()

    token, chat = env("TG_BOT_TOKEN"), chat_id()

    if args.delete:
        delete(args.delete, token, chat)
        return

    if args.text_file:
        # A trailing newline in the file would show up as a blank line
        # under the hashtags; everything inside the text is left alone.
        with open(args.text_file, encoding="utf-8") as handle:
            text = handle.read().strip()
        slides = ([args.text] if args.text else []) + args.slides
    else:
        if not args.text:
            parser.error("нужен текст поста или --text-file")
        text, slides = args.text, args.slides

    ids, inline = post(text, slides, token, chat)
    shape = "подписью к фото" if inline else "фото + текст ответом"
    print(f"опубликовано: {shape}, id {' '.join(str(i) for i in ids)}")
    print(f"откатить: tg_post.py --delete {' '.join(str(i) for i in ids)}")
    time.sleep(GAP_BETWEEN_POSTS)


if __name__ == "__main__":
    main()
