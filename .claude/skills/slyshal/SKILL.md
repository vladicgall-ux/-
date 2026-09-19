---
name: slyshal
description: "Publishing pipeline for the @slyshal74 Instagram and VK accounts (Чебаркуль/Челябинск news): build an N-slide carousel or story frames as Remotion stills, source freely-licensed photos from Wikimedia Commons, render at 2x, host them on raw.githubusercontent, and publish to Instagram via Composio or to VK via its API. Use for any request to make a post, carousel, stories, or to publish/schedule something for slyshal74."
---

# slyshal — posting pipeline for @slyshal74

The account is **«Слышал?74 — Новости Челябинска без прикрас»**. Posts go to
Instagram `@slyshal74` unless told otherwise; VK goes to the group whose
token is in `VK_TOKEN`.

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
- **Slide 1 is the hook**, the last slide asks a question and carries
  `ПОДРОБНОСТИ В ШАПКЕ ПРОФИЛЯ` with the up arrow. Every middle slide gets
  the swipe arrow.
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

VK allows up to 10 attachments per post. The script prints the post URL.
**Never echo the token** into output or commit it.

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
