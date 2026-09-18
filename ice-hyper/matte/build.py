"""Cuts the fisherman out of the two shots where he is on camera, so captions
can pass behind him. Writes a VP9 WebM with an alpha channel, which Chromium
composites directly during the HyperFrames render."""

import subprocess
import sys

import numpy as np
from PIL import Image
from rembg import new_session, remove

SRC = "/home/user/-/ice-hyper/my-video/assets/source.mp4"
OUT = "/home/user/-/ice-hyper/my-video/assets/person-matte.webm"
START, DUR, FPS = 29.4, 7.85, 30
W, H = 1080, 1920

session = new_session("u2net_human_seg")

reader = subprocess.Popen(
    ["ffmpeg", "-v", "error", "-ss", str(START), "-t", str(DUR), "-i", SRC,
     "-vf", f"fps={FPS},scale={W}:{H}", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
    stdout=subprocess.PIPE,
)
writer = subprocess.Popen(
    ["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgba",
     "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
     "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "0", "-crf", "14",
     "-auto-alt-ref", "0", OUT],
    stdin=subprocess.PIPE,
)

frame_bytes = W * H * 3
n = 0
while True:
    raw = reader.stdout.read(frame_bytes)
    if len(raw) < frame_bytes:
        break
    im = Image.frombytes("RGB", (W, H), raw)
    cut = remove(im, session=session, post_process_mask=True)
    writer.stdin.write(np.asarray(cut.convert("RGBA"), dtype=np.uint8).tobytes())
    n += 1
    if n % 20 == 0:
        print(f"{n} frames", flush=True)

writer.stdin.close()
writer.wait()
reader.wait()
print(f"DONE {n} frames -> {OUT}", flush=True)
