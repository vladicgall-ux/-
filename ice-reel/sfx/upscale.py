"""AI-upscales the source clip (Real-ESRGAN, CPU) straight into an mp4.

Frames are streamed through ffmpeg pipes so nothing large hits the disk.
"""

import subprocess
import sys
import time

import numpy as np
import torch
from basicsr.archs.srvgg_arch import SRVGGNetCompact
from realesrgan import RealESRGANer

SRC = sys.argv[1]
DST = sys.argv[2]
FPS = 30
IN_W, IN_H = 480, 848
OUT_W, OUT_H = IN_W * 4, IN_H * 4

torch.set_num_threads(4)

model = SRVGGNetCompact(
    num_in_ch=3, num_out_ch=3, num_feat=64, num_conv=32, upscale=4, act_type="prelu"
)
upsampler = RealESRGANer(
    scale=4,
    model_path="/tmp/sadtalker-venv/lib/python3.11/site-packages/weights/realesr-general-x4v3.pth",
    model=model,
    tile=0,
    half=False,
    device="cpu",
)

reader = subprocess.Popen(
    ["ffmpeg", "-v", "error", "-i", SRC, "-r", str(FPS), "-f", "rawvideo",
     "-pix_fmt", "rgb24", "-"],
    stdout=subprocess.PIPE,
)
writer = subprocess.Popen(
    ["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24",
     "-s", f"{OUT_W}x{OUT_H}", "-r", str(FPS), "-i", "-",
     "-i", SRC, "-map", "0:v", "-map", "1:a",
     "-c:v", "libx264", "-preset", "medium", "-crf", "16", "-pix_fmt", "yuv420p",
     "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", DST],
    stdin=subprocess.PIPE,
)

frame_bytes = IN_W * IN_H * 3
i = 0
start = time.time()
while True:
    raw = reader.stdout.read(frame_bytes)
    if len(raw) < frame_bytes:
        break
    frame = np.frombuffer(raw, np.uint8).reshape(IN_H, IN_W, 3)
    out, _ = upsampler.enhance(frame, outscale=4)
    writer.stdin.write(out.astype(np.uint8).tobytes())
    i += 1
    if i % 10 == 0:
        el = time.time() - start
        print(f"{i} frames  {el/i:.2f}s/frame  elapsed {el/60:.1f}m", flush=True)

writer.stdin.close()
writer.wait()
reader.wait()
print("DONE", i, "frames in", round((time.time() - start) / 60, 1), "min")
