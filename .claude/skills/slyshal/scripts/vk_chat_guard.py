#!/usr/bin/env python3
"""Sweep the community's chats for job spam and link adverts.

    vk_chat_guard.py                 # dry run: prints what it would delete
    vk_chat_guard.py --apply         # actually deletes
    vk_chat_guard.py --peer 2000000001 --window 200

Reads VK_TOKEN and expects the community to be an administrator of the
chat, which is what lets it delete somebody else's message.

The rules are deliberately narrow. A fishing chat is full of links people
post in good faith — a TikTok of somebody's catch, a weather page, a photo
of a lure — and full of words a naive job filter trips over: "в день",
"набирает", "выходишь". Deleting on a bare link would cost more good
messages than bad ones, and a deleted message cannot be brought back.

A message goes when it carries obscenity, and otherwise when it shows
intent — a link alone never deletes:

  * a messenger or shortener link (t.me, wa.me, vk.cc, bit.ly …), which in
    this chat is never an accident;
  * money-work language AND a way to make contact — the shape of every
    "удалённая подработка, пишите в личку" post;
  * a sales pitch AND a link;
  * Russian obscenity, matched by root so the usual dodges (a latin a, a
    zero, a star for the vowel) do not slip past, and bounded so that
    хребет, бляха and блесна do not.

Everything else is left alone, and everything the sweep does is written to
moderation/log.jsonl so a wrong call can be found and the rule fixed.
"""

import argparse
import datetime as dt
import json
import os
import pathlib
import re
import sys

try:
    import requests
except ImportError:
    sys.exit("python3 -m pip install requests")

API = "https://api.vk.com/method"
VERSION = "5.199"
ROOT = pathlib.Path(__file__).resolve().parents[4]
STATE = ROOT / "moderation" / "state.json"
LOG = ROOT / "moderation" / "log.jsonl"

CHATS = {2000000001: "Фермер Уелги на-связи", 2000000002: "Эксперты Уелги рыбалка"}

# A link to a messenger or a shortener. Nobody in a fishing chat shortens a
# URL to share a photograph of a perch.
HARD_LINK = re.compile(
    r"(t\.me/|telegram\.me/|wa\.me/|whatsapp\.com/|vk\.cc/|bit\.ly/|clck\.ru/|"
    r"cutt\.ly/|tinyurl\.com/|is\.gd/|goo\.gl/)", re.I)

ANY_LINK = re.compile(r"(https?://|\bwww\.[a-z0-9-]+\.[a-z]{2,})", re.I)

# Money-for-work language. Each alternative has to carry the money or the
# job on its own — "работа" by itself is a word fishermen use about work.
WORK = re.compile(
    r"(подработ|удал[еёо]нн\w*\s+(работ|заработ)|ваканси|"
    r"заработок|зараб\w*\s+от\s*\d|доход\w*\s+от\s*\d|"
    r"от\s*\d{3,}\s*(руб|₽|р\b)|\d{3,}\s*(руб|₽)\s*в\s*(день|час|сутки)|"
    r"\bз/?п\b|набираю\s+(людей|команду)|ищу\s+(людей|партн[её]р))", re.I)

# An invitation to take it private — the other half of a job-spam post.
CONTACT = re.compile(
    r"(пиш\w*\s+в\s+(лс|личк|л\.?с\.?)|в\s+личн\w*\s+сообщ|"
    r"@[a-zA-Z][a-zA-Z0-9_]{4,}|подробност\w*\s+в\s+лс|"
    r"кому\s+интересно|\+7\s*\(?\d{3})", re.I)

# Obscenity, by root rather than by word: the roots are few and every
# insult is built from them, while a list of words never ends. The
# character classes absorb the usual dodges — a latin "a" for "а", a zero
# for "о", a star for the vowel.
_A = "[аa@4*]"
_O = "[оo0*]"
_E = "[еeё3*]"
_I = "[иu1*]"
_U = "[уy*]"
MAT = re.compile(
    rf"х{_U}[йjяию]|х{_U}[её]в|"                 # хуй, хуя, хуёво; не «хребет»
    rf"п{_I}зд|"                                  # пизда, пиздец
    rf"[еe]б{_A}[тлнк]|[еe]б{_U}ч|вы{_E}б{_A}|"   # ебать, ебал, выебать
    rf"з{_A}[еe]б{_A}[лнт]|[оo]х{_U}{_E}|"
    rf"(?<![оo])бл{_I}?[яa](?![хш])|бл[*]д|"               # бля, блядь; не «бляха»
    rf"м{_U}д{_A}[кч]|"                           # мудак
    rf"п{_I}д{_O}?р|г{_A}ндон|з{_A}л{_U}п",       # пидор, гандон
    re.I)

# A sales pitch. Only bites when a link comes with it.
SELL = re.compile(
    r"(продаю|продам|предлага\w+\s+вам|заказ\w*\s+(тут|здесь|по\s+ссылк)|"
    r"скидк|акци\w*\s+до|цена\s*[:—-]?\s*\d|в\s+наличии|под\s+заказ)", re.I)


def call(method, token, **params):
    params.update(access_token=token, v=VERSION)
    r = requests.post(f"{API}/{method}", data=params, timeout=60)
    r.raise_for_status()
    body = r.json()
    if "error" in body:
        e = body["error"]
        sys.exit(f"VK error {e['error_code']}: {e['error_msg']}")
    return body["response"]


def verdict(text, mat=True):
    """Return a reason to delete, or None to leave the message alone."""
    if not text:
        return None
    if mat and MAT.search(text):
        return "мат"
    if HARD_LINK.search(text):
        return "мессенджер/сокращатель ссылок"
    if WORK.search(text) and CONTACT.search(text):
        return "предложение работы с выходом в личку"
    if SELL.search(text) and ANY_LINK.search(text):
        return "реклама со ссылкой"
    return None


def load_state():
    if STATE.exists():
        return json.loads(STATE.read_text())
    return {}


def save_state(state):
    STATE.parent.mkdir(parents=True, exist_ok=True)
    STATE.write_text(json.dumps(state, ensure_ascii=False, indent=2) + "\n")


def record(entries):
    if not entries:
        return
    LOG.parent.mkdir(parents=True, exist_ok=True)
    with LOG.open("a") as fh:
        for e in entries:
            fh.write(json.dumps(e, ensure_ascii=False) + "\n")


def sweep(peer_id, token, window, apply_, state):
    """Look at the recent messages of one chat and act on the spam."""
    history = call("messages.getHistory", token, peer_id=peer_id, count=window)
    seen = state.get(str(peer_id), {}).get("last_cmid", 0)
    highest = seen

    # Admins are never swept: they post the announcements and the links.
    members = call("messages.getConversationMembers", token, peer_id=peer_id)
    admins = {m["member_id"] for m in members["items"] if m.get("is_admin")}

    hits = []
    for m in history["items"]:
        cmid = m.get("conversation_message_id", 0)
        highest = max(highest, cmid)
        if cmid <= seen or m["from_id"] in admins:
            continue
        why = verdict(m.get("text") or "")
        if why:
            hits.append({
                "peer_id": peer_id,
                "chat": CHATS.get(peer_id, str(peer_id)),
                "cmid": cmid,
                "from_id": m["from_id"],
                "date": dt.datetime.fromtimestamp(m["date"], dt.UTC).isoformat(),
                "reason": why,
                "text": (m.get("text") or "")[:300],
            })

    if apply_ and hits:
        # One call carries every id, so a sweep costs one request whatever
        # it found; delete_for_all is what removes it for the chat, not
        # just for the community's own copy.
        call("messages.delete", token, peer_id=peer_id, delete_for_all=1,
             cmids=",".join(str(h["cmid"]) for h in hits))

    for h in hits:
        h["deleted"] = bool(apply_)
    # Only a real sweep moves the mark. A dry run that advanced it would
    # hide from the next real one exactly the messages it just found.
    if apply_:
        state.setdefault(str(peer_id), {})["last_cmid"] = highest
    return hits


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--apply", action="store_true",
                    help="delete for real; without it nothing is touched")
    ap.add_argument("--peer", type=int, action="append",
                    help="limit to one chat (repeatable)")
    ap.add_argument("--window", type=int, default=200,
                    help="how many recent messages to look at (default 200)")
    args = ap.parse_args()

    token = os.environ.get("VK_TOKEN")
    if not token:
        sys.exit("VK_TOKEN is not set")

    state = load_state()
    peers = args.peer or list(CHATS)
    total = []
    for peer_id in peers:
        hits = sweep(peer_id, token, args.window, args.apply, state)
        total += hits
        name = CHATS.get(peer_id, peer_id)
        print(f"{name}: найдено {len(hits)}"
              f"{' — удалено' if args.apply and hits else ''}", file=sys.stderr)
        for h in hits:
            print(f"  [{h['reason']}] from {h['from_id']}: {h['text'][:110]}",
                  file=sys.stderr)

    save_state(state)
    record(total)
    if not args.apply:
        print("(пробный прогон — ничего не удалено, запусти с --apply)",
              file=sys.stderr)


if __name__ == "__main__":
    main()
