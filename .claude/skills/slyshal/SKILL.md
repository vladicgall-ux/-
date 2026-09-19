---
name: slyshal
description: "Publishing pipeline for the @slyshal74 Instagram and VK accounts (Чебаркуль/Челябинск news): build an N-slide carousel or story frames as Remotion stills, source freely-licensed photos from Wikimedia Commons, render at 2x, host them on raw.githubusercontent, and publish to Instagram via Composio or to VK via its API. VK posts go to «Фермер Уелги Рыбалка» (id 200569417), which is also where the daily fishing feed lives. Use for any request to make a post, carousel, stories, or to publish/schedule something for slyshal74 or the fishing feed."
---

# slyshal — posting pipeline for @slyshal74

The account is **«Слышал?74 — Новости Челябинска без прикрас»**. Posts go to
Instagram `@slyshal74` unless told otherwise.

**VK is a different community.** The `VK_TOKEN` in this environment belongs
to **«Фермер Уелги Рыбалка»** — `id 200569417`, `@fermeryelgi`, which is
what `VK_GROUP_ID` is set to. That is the home of the fishing feed
(`fishing/`), not of the Чебаркуль/Челябинск news. Check whose token it is
before publishing anything:

```bash
curl -sS -X POST "https://api.vk.com/method/groups.getById" \
  -d "access_token=$VK_TOKEN" -d "v=5.199"
```

If it comes back as **«Dr.Fermer Товары для животных»** (`id 212674044`),
stop and ask the owner — that is a different community and a post there
cannot be taken back (see the deletion limit below).

Read this whole file before building a post. The parts that look like fussy
detail — the Commons download quirks, the scrim, the credit line — are each
there because the obvious approach failed once.

## Standing rules from the owner

- **Answer briefly. Ask before doing something substantial.** The owner
  prefers one clarifying question over a large wrong deliverable.
- **Font colour follows the piece.** Take caption and title colour from the
  photographs or the subject itself, never a default accent. One coherent
  line beats two accents competing in a frame.
- **Verify before asserting.** A claim on a slide is published in the
  owner's name. Two posts were nearly shipped with wrong facts (the metro
  had not opened; a city's area was smaller than the comparison claimed).
  Check figures, and print the source on the slide when they are contested.
- **Never commit third-party photos or tokens.** Source photos are
  gitignored; only rendered slides ship. Tokens live in environment
  variables, never in the repo.

## Existing projects to copy from

Each is a Remotion Stills project, already working. Clone the nearest one
rather than starting from scratch.

| Project | What it is |
| --- | --- |
| `city-carousel/` | **Best starting point.** 7 photo slides + 2 story frames, warm brick palette, full credit handling |
| `meteor-carousel/` | 7 drawn (SVG) slides, no photos — copy when the subject has no usable photography |
| `metro-carousel/` | The original 5-slide photo set |

Scaffold a new one:

```bash
cd /home/user/-
NEW=my-carousel
mkdir -p $NEW/src/slides $NEW/public
cp city-carousel/{package.json,tsconfig.json,remotion.config.ts,eslint.config.mjs,.gitignore} $NEW/
cp -r city-carousel/public/fonts $NEW/public/
cp city-carousel/src/{index.ts,index.css,fonts.ts,ui.tsx,Arrow.tsx,Photo.tsx,brand.ts} $NEW/src/
ln -sfn ../city-carousel/node_modules $NEW/node_modules   # npm install is slow; the deps are identical
sed -i "s/\"name\": \"city-carousel\"/\"name\": \"$NEW\"/" $NEW/package.json
```

The symlinked `node_modules` is deliberate: a fresh container has none, and
installing per project wastes minutes. If `city-carousel/node_modules` is
also missing, run `npm install` there once and every project gets it.

## The design system

`src/brand.ts` holds the palette, `src/ui.tsx` the type kit
(`Slate`, `Lower`, `Eyebrow`, `Headline`, `Accent`, `Body`, `Stat`,
`HotPlate`, `PageDots`, `Source`), `src/Arrow.tsx` the swipe cues,
`src/Photo.tsx` the photographic plate and the credit line.

Rules that hold across every set built so far:

- **1080×1080** compositions, rendered at `--scale=2` for delivery.
- **Art lives in the top half, type in the bottom.** In the drawn sets a
  scrim inside the `Canvas` wrapper enforces it; in the photo sets the
  gradient inside `CityPhoto` does. Without it, headlines land on top of
  the busiest part of the picture and nothing is readable.
- **One grade over every plate.** Archive black-and-white and last
  summer's phone photos only read as one set when colour is pulled most of
  the way out and a single tone pushed back in. `CityPhoto` takes an
  `archive` prop that adds grain and a heavier cast for old scans.
- **Slide count follows the platform.** A VK post carries **three** photos
  — hook, substance, ask — because that is the owner's rule; an Instagram
  carousel runs to seven. Slide 1 is always the hook and the last always
  asks something. On Instagram the closing plate is
  `ПОДРОБНОСТИ В ШАПКЕ ПРОФИЛЯ` with the up arrow; VK has no bio link, so
  there it asks for a comment and a follow. Every middle slide gets the
  swipe arrow.
- **Two lines of headline, maximum.** Three lines overrun the plate; the
  fix is shorter copy, not a smaller size.

## Photographs — Wikimedia Commons

Only freely-licensed material. Public Domain and CC0 need no credit;
CC BY-SA needs the author named, which is what the `Credit` component and
the caption's credit block are for. Both must be present.

Search, check the licence, then download:

```bash
# search
curl -sS --cacert /root/.ccr/ca-bundle.crt -A "slyshal74/1.0 (vladicgall@gmail.com)" \
  "https://commons.wikimedia.org/w/api.php" \
  --data-urlencode action=query --data-urlencode format=json \
  --data-urlencode list=search --data-urlencode srnamespace=6 \
  --data-urlencode srlimit=10 --data-urlencode "srsearch=Chelyabinsk Kirovka street"

# licence + size + author (same endpoint, prop=imageinfo, iiprop=url|extmetadata|size)
```

Three failures worth knowing, all hit during the 290-летие build:

1. **Use POST-style `--data-urlencode`, not a query string.** A long URL
   with Cyrillic titles comes back as a non-JSON error.
2. **`upload.wikimedia.org` refuses these requests; `thumb.wikimedia.org`
   serves them.** Asking `iiurlwidth` *larger* than the original returns
   the upload URL and the download lands an HTML error page. Either ask
   for a width below the original, or fetch by name, which always works:
   `https://commons.wikimedia.org/wiki/Special:FilePath/<File name, URL-encoded>`
3. **HTTP 429 is normal** when pulling several files. Retry with backoff;
   the third attempt usually succeeds. Always verify afterwards — a
   "downloaded" file may be an HTML error page:
   `python3 -c "from PIL import Image; print(Image.open('x.jpg').size)"`

Archive scans from the 1900s are 1400–1700px and **cannot be 4K**. Say so
rather than implying otherwise; resample 2× with a light unsharp
(`scale=iw*2:ih*2:flags=lanczos,unsharp=5:5:0.45:5:5:0.0`) so the browser
is not left to do it, and let the grain treatment carry them.

## Render and export

```bash
cd <project>
npx tsc --noEmit                                  # catches missing theme tokens early
for i in 1 2 3 4 5 6 7; do
  npx remotion still src/index.ts Slide$i out/hi$i.png --scale=2 --log=error
done
for i in 1 2 3 4 5 6 7; do
  ffmpeg -y -loglevel error -i out/hi$i.png -q:v 1 publish/ig$i.jpg
done
```

**Always look at the rendered slides with the Read tool before publishing.**
Every layout problem so far — collisions, headlines over faces, a credit
line under the swipe arrow — was invisible in the code and obvious in the
image.

Instagram accepts JPEG up to 8 MB, aspect 4:5 to 1.91:1, and downscales
anything above 1440px. Rendering at 2160 still helps: it downscales rather
than upscales.

Stories are **1080×1920**, same treatment. Keep everything readable inside
the safe area — Instagram covers the top ~250px and bottom ~320px.
The API cannot attach a link or "see post" sticker, so say "пост в ленте"
in the artwork and mention the limit to the owner.

## Hosting the images

Instagram and VK both fetch by URL, so the rendered JPEGs are committed and
served from GitHub raw:

```
https://raw.githubusercontent.com/vladicgall-ux/-/claude/remotion-dev-skills-93dhj9/<project>/publish/ig1.jpg
```

Commit and push to `claude/remotion-dev-skills-93dhj9`, then verify every
URL returns 200 before creating any container:

```bash
for i in 1 2 3 4 5 6 7; do
  curl -sS -o /dev/null -w "$i %{http_code}\n" --cacert /root/.ccr/ca-bundle.crt \
    "https://raw.githubusercontent.com/vladicgall-ux/-/claude/remotion-dev-skills-93dhj9/<project>/publish/ig$i.jpg"
done
```

## Publishing to Instagram (Composio)

Account `slyshal74-ig`, `ig_user_id` **28535336799484344**. Load the tools
with `ToolSearch` for `mcp__Composio__COMPOSIO_MULTI_EXECUTE_TOOL`, then:

- **Carousel**: `INSTAGRAM_CREATE_CAROUSEL_CONTAINER` with
  `child_image_urls` (2–10, order = slide order) and `caption`, then
  `INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH` with the returned `creation_id`.
- **Story**: `INSTAGRAM_POST_IG_USER_MEDIA` with `media_type: "STORIES"`
  and `image_url`, then the same publish call. One at a time.

Containers expire in under 24 hours, so create them at publish time, not in
advance. Publishing the same `creation_id` twice returns 409 — make a fresh
container instead.

## Publishing to VK

**A carousel cannot be published through the API at all.** This was worked
end to end on 19 Sep 2026 and every route is closed. Do not spend another
evening rediscovering it.

The community token posts text and nothing else. `groups.getTokenPermissions`
lists `photos`, `wall`, `docs`, `manage`, `stories` and `market`, and the
whole `photos` namespace still answers error 27, *"method is unavailable
with group auth"* — `getWallUploadServer` (with and without `group_id`, on
5.199, 5.131, 5.103 and 5.81 alike), `getUploadServer`,
`getMarketUploadServer`, `get`, `getAlbums`, `createAlbum`. The community's
sections are not the cause: Посты, Фото and Файлы are all switched on, and
turning Файлы on did change `docs.getWallUploadServer` from error 15 to a
working upload server, which proves the settings reach the API and that
`photos` is refused on top of them. `photos.getMessagesUploadServer` hands
over a URL and then returns an empty `photo`. `stories.getPhotoUploadServer`
works, which no wall post can use. Documents upload and attach, but a JPEG
saved that way is a doc (`type: 4`, `ext: jpg`) with a thumbnail — a file on
the post, not a carousel.

A personal token does not rescue it either. VK closed the implicit flow to
the application types dev.vk.ru now offers (`response_type=token` answers
`Security Error`), so the only way in is VK ID's OAuth 2.1 with PKCE, which
`scripts/vk_id_token.py` performs. It works — and VK ID grants
`vkid.personal_info offline` and silently drops `photos`, `wall` and
`groups`, because a scope is only granted when the application is allowed
to hold it, and VK ID does not offer the photo scopes to these apps at all.
`photos.getWallUploadServer` then answers error 15/1133, *"cannot be called
with current scopes"*.

So until VK changes something: the wall text is automatable, the carousel
is not. Build and render the slides here, and let the owner post them
through the community's own **Отложенные записи**. `vk_post.py` still
prefers `VK_USER_TOKEN` if one ever becomes usable, and warns when it is
missing.

**Error 9, "Flood control", on a user token is the account, not you.**
It was hit on 19 Sep 2026 after a run of VK ID token issues, and it
answered *every* method — `users.get` as readily as the upload server —
so it is not about pace and slowing down does not lift it. Nor does
anything about where the request comes from: the same token, the same
method, from this datacenter and from the owner's own phone at home,
got the same refusal. A fresh token gets it too. So a Russian VPS is
not worth buying for it, and neither is an hour of shell-piping from a
phone; the only thing that clears it is time. Meanwhile the community
token is untouched — covers, description and chat moderation all keep
working — so anything that does not need a personal token still runs.

Two more things that bite. A community token cannot delete what it creates
— `wall.delete`, `wall.edit` and `docs.delete` are all error 27 — so a test
post or an uploaded file has to be removed by hand in the VK interface. And
`id.vk.ru` is blocked by this environment's proxy while `id.vk.com` is not,
so the token exchange must use the `.com` host, and `redirect_uri` must
match the application's trusted URL exactly, `.com` for `.com`.

Needs `VK_TOKEN` (community token with **wall**, **photos**, **docs**) and
`VK_GROUP_ID`, set as environment variables on the cloud environment — the
owner configures them at claude.ai/code via the cloud icon above the
message box → the environment's gear icon → **Environment variables**. A
running session does not re-read them; they apply to the next session.

`scripts/vk_post.py` in this skill directory does the whole flow: upload
each photo to its own single-use wall upload server, save it, and post the
entry with all of them attached. `api.vk.com` is reachable from this
environment, and the proxy and CA bundle are already wired into `requests`.

```bash
.claude/skills/slyshal/scripts/vk_post.py "текст поста" city-carousel/publish/ig*.jpg
.claude/skills/slyshal/scripts/vk_post.py --at "2026-09-20 15:00" "текст" publish/ig*.jpg
```

`--at` takes local Chelyabinsk time and uses VK's own scheduling, so no
session has to be awake for it — prefer it over `send_later` for VK.

**A post carries at most three photos.** VK's own limit is ten; three is
the owner's rule for this account, and `vk_post.py` enforces it. So a post
is three slides — hook, the substance, the ask — and everything that does
not fit goes into the wall text, which has room for all of it. The fishing
feed is already built this way.

The script prints the post URL.
**Never echo the token** into output or commit it.

**A published post cannot be removed through the API.** The community token
can `wall.post` and nothing else on the wall: `wall.delete`, `wall.edit`,
`wall.get`, `wall.getById` and `groups.search` all answer error 27,
*"unavailable with group auth"*. So there is no undo and no way to read
back what went out — show the owner every caption and wait for an explicit
yes before posting, scheduled posts included.

## The daily fishing feed (`fishing/`)

Three VK posts a day — **09:00 «клёв»**, **16:00 «снасть»**,
**21:00 «на кухню»** — about fishing in the Chelyabinsk region, published
to **«Фермер Уелги Рыбалка»** (`200569417`), not to the news account.
Sourcing and topics are ours; the owner does not supply material.

A day costs one data file, not new components. `src/post.ts` defines the
slide kinds (`hook`, `fact`, `steps`, `cta`), `src/Slide.tsx` renders any
of them, and `src/posts/<day>.ts` holds the three posts. `Root.tsx`
generates one Still per slide, named `<slot>-<n>`. A slide with
`photo: { src: null }` falls back to a drawn echo-sounder trace, which is
how a day survives when nothing suitable is free to use.

**Nothing repeats — this is the rule the whole thing hangs on.**
`TOPICS.md` is the topic bank with a stable key per subject; `POSTED.json`
records what has gone out. Every session, in this order:

1. Read `POSTED.json` first, before choosing anything.
2. Pick three unused keys from `TOPICS.md` that suit the season — do not
   post about jerkbaits through the ice in September.
3. Build, render, publish.
4. Append `{id, date, slot, topic, title}` to `POSTED.json` **after** the
   post succeeds, mark the row in `TOPICS.md`, and commit. An unrecorded
   post will be written again next week.

Top up `TOPICS.md` when it runs low rather than reusing a key.

**What may be claimed.** Nobody here has been to the lake this week, so
seasonal patterns are written as patterns ("осенью щука выходит
кормиться"), never as a report ("на Увильдах сейчас берёт"). Legal
specifics — нерестовый запрет, разрешённые снасти, нормы вылова — are
checked against the current rules for the Западно-Сибирский
рыбохозяйственный бассейн before they go on a slide, or left out. A photo
of a fish taken elsewhere illustrates the species, never the place, and
says whose photograph it is.

VK has no "link in bio", so the closing plate asks for a comment and a
follow instead.

## Captions

Russian, and structured: hook line with 👇 → the facts in short paragraphs
→ a question that invites a comment → save/share prompt → photo credits
when any plate is CC BY-SA → 12–18 hashtags mixing local
(`#челябинск #74регион #слышал74`) and topical ones.

## Scheduling

To publish later, use `send_later` (claude-code-remote MCP) with an RFC3339
UTC time — **Chelyabinsk is UTC+5**, so 15:00 local is `10:00:00Z`. Write
the scheduled message as a complete standalone instruction: the URLs, the
full caption, and the exact tool sequence, because the firing turn should
not have to reconstruct any of it. Publish only what the owner has actually
approved.
