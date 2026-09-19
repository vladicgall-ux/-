#!/usr/bin/env python3
"""Exchange a VK ID authorization code for a user access token.

VK closed the old implicit flow (`response_type=token`) to the application
types dev.vk.ru still offers, so a personal token now comes from VK ID's
OAuth 2.1 with PKCE: the browser hands back a short-lived `code`, and this
script trades it for the token.

    vk_id_token.py --client-id 1234567 \\
        --code '<code from the address bar>' \\
        --device-id '<device_id from the address bar>' \\
        --verifier '<the code_verifier the URL was built with>' \\
        --redirect-uri https://oauth.vk.ru/blank.html

It prints the token and nothing else, so it can be piped. The token is a
credential for the whole account: put it in the VK_USER_TOKEN environment
variable, never in a chat message, a commit, or a screenshot.
"""

import argparse
import json
import sys
import urllib.parse
import urllib.request

AUTH = "https://id.vk.ru/oauth2/auth"


def build_url(client_id, challenge, state, redirect_uri, scope):
    """The address the owner opens in a browser to approve the token."""
    return "https://id.vk.ru/authorize?" + urllib.parse.urlencode({
        "response_type": "code",
        "client_id": client_id,
        "code_challenge": challenge,
        "code_challenge_method": "S256",
        "redirect_uri": redirect_uri,
        "state": state,
        "scope": scope,
    })


def exchange(args):
    body = urllib.parse.urlencode({
        "grant_type": "authorization_code",
        "client_id": args.client_id,
        "code": args.code,
        "code_verifier": args.verifier,
        "device_id": args.device_id,
        "redirect_uri": args.redirect_uri,
    }).encode()

    req = urllib.request.Request(
        AUTH, data=body,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    with urllib.request.urlopen(req, timeout=60) as r:
        payload = json.load(r)

    # VK answers some failures with HTTP 200 and an error object, so the
    # absence of a token is what has to be checked, not the status code.
    if "access_token" not in payload:
        sys.exit("VK ID refused the exchange: " + json.dumps(payload, ensure_ascii=False))
    return payload


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--client-id", required=True)
    ap.add_argument("--code", required=True)
    ap.add_argument("--device-id", required=True)
    ap.add_argument("--verifier", required=True)
    ap.add_argument("--redirect-uri", default="https://oauth.vk.ru/blank.html")
    args = ap.parse_args()

    payload = exchange(args)
    print(payload["access_token"])
    if payload.get("expires_in"):
        print(f"expires in {payload['expires_in']}s — ask for the offline "
              f"scope if you want one that does not", file=sys.stderr)


if __name__ == "__main__":
    main()
