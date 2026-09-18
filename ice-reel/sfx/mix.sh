#!/bin/bash
# Layers the generated sound-design kit onto a rendered cut.
# Usage: sfx/mix.sh out/ice-reel.mp4 out/ice-reel-sfx.mp4
set -e
IN="${1:-out/ice-reel.mp4}"
OUT="${2:-out/ice-reel-sfx.mp4}"
S="public/sfx"

# time_seconds file volume
CUES=(
  "0.00  impact.wav     0.55"
  "0.00  boom.wav       0.38"
  "1.35  whoosh.wav     0.40"
  "1.45  impact.wav     0.40"
  "1.62  pop.wav        0.30"
  "2.50  whoosh.wav     0.34"
  "5.62  pop.wav        0.26"
  "8.90  whoosh.wav     0.28"
  "9.15  pop.wav        0.26"
  "12.20 whoosh.wav     0.32"
  "15.45 whoosh.wav     0.34"
  "15.60 ticks.wav      0.15"
  "17.25 riser.wav      0.30"
  "19.05 boom.wav       0.50"
  "19.05 ice_crack.wav  0.30"
  "19.22 impact.wav     0.45"
  "19.30 shimmer.wav    0.24"
  "20.05 pop.wav        0.32"
  "23.20 whoosh.wav     0.30"
  "26.85 whoosh_rev.wav 0.35"
  "26.95 impact.wav     0.40"
  "27.05 shimmer.wav    0.22"
)

INPUTS=()
FILTER=""
MIX="[0:a]"
i=1
for cue in "${CUES[@]}"; do
  read -r time file vol <<<"$cue"
  ms=$(python3 -c "print(int(float('$time')*1000))")
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
