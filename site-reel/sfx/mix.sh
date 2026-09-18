#!/bin/bash
# Layers the dopamine sound kit onto a rendered cut.
# Every cue lines up with a beat authored in index.html.
# Usage: sfx/mix.sh <rendered.mp4> <out.mp4>
set -e
IN="${1:?input video}"
OUT="${2:?output video}"
S="$(dirname "$0")/wav"

# master trim for the whole kit — these cues are background texture, not events
MASTER="${MASTER:-0.05}"

# time_seconds file volume
CUES=(
  # opening: title slams, browser hinges in, the page builds block by block
  "0.15  whoosh.wav     0.34"
  "0.40  impact.wav     0.42"
  "0.40  sub.wav        0.30"
  "0.90  swipe.wav      0.34"
  "1.10  pop.wav        0.24"
  "1.45  click.wav      0.30"
  "1.68  click.wav      0.30"
  "1.90  pop.wav        0.26"
  "2.16  click.wav      0.28"
  "2.40  click.wav      0.26"
  "2.56  click.wav      0.26"
  "2.72  click.wav      0.26"
  "2.86  ding.wav       0.20"

  # the tool: the icon turns in, the prompt types, the greeting lands
  "3.65  whoosh.wav     0.32"
  "3.75  swipe.wav      0.38"
  "3.95  impact.wav     0.30"
  "4.35  key.wav        0.34"
  "4.43  key.wav        0.32"
  "4.51  key.wav        0.34"
  "4.59  key.wav        0.32"
  "4.67  key.wav        0.34"
  "4.75  key.wav        0.32"
  "4.95  ding.wav       0.26"
  "5.10  pop.wav        0.28"

  # the checklist flies in on three planes
  "6.45  whoosh.wav     0.32"
  "6.82  swipe.wav      0.30"
  "7.06  swipe.wav      0.30"
  "7.30  swipe.wav      0.30"
  "7.40  shimmer.wav    0.16"

  # step 01: login, button press, account confirmed
  "9.35  whoosh.wav     0.32"
  "9.42  impact.wav     0.28"
  "9.70  pop.wav        0.28"
  "9.92  click.wav      0.28"
  "10.16 click.wav      0.28"
  "10.72 click.wav      0.40"
  "11.02 ding.wav       0.34"

  # step 02: the plan card flips, the sweep passes, the rows tick in
  "12.15 whoosh.wav     0.32"
  "12.22 swipe.wav      0.40"
  "12.70 pop.wav        0.30"
  "12.85 shimmer.wav    0.20"
  "13.30 click.wav      0.26"
  "13.50 click.wav      0.26"
  "13.75 ding.wav       0.26"

  # step 03: the prompt types, the build reports, the site ships
  "15.45 whoosh.wav     0.32"
  "15.50 impact.wav     0.28"
  "15.85 key.wav        0.30"
  "15.95 key.wav        0.28"
  "16.05 key.wav        0.30"
  "16.15 key.wav        0.28"
  "16.25 key.wav        0.30"
  "16.35 key.wav        0.28"
  "16.45 key.wav        0.30"
  "16.55 key.wav        0.28"
  "16.78 click.wav      0.30"
  "17.02 click.wav      0.30"
  "17.26 click.wav      0.32"
  "17.40 riser.wav      0.26"
  "17.52 whoosh_rev.wav 0.34"
  "17.56 impact.wav     0.34"
  "17.60 success.wav    0.38"
)

INPUTS=()
FILTER=""
MIX="[0:a]"
i=1
for cue in "${CUES[@]}"; do
  read -r time file vol <<<"$cue"
  ms=$(python3 -c "print(int(float('$time')*1000))")
  vol=$(python3 -c "print(round(float('$vol')*float('$MASTER'), 4))")
  INPUTS+=(-i "$S/$file")
  FILTER+="[$i]adelay=${ms}|${ms},volume=${vol}[a$i];"
  MIX+="[a$i]"
  i=$((i + 1))
done

FILTER+="${MIX}amix=inputs=${i}:normalize=0:dropout_transition=0,alimiter=limit=0.94[aout]"

ffmpeg -y -i "$IN" "${INPUTS[@]}" \
  -filter_complex "$FILTER" \
  -map 0:v -map "[aout]" \
  -c:v copy -c:a aac -b:a 224k -ar 48000 \
  "$OUT"

echo "wrote $OUT"
