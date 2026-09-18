"""Synthesises the reel's sound-design kit (no samples, no licensing)."""

import os
import wave

import numpy as np

SR = 48000
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "sfx")


def write(name, data):
    os.makedirs(OUT, exist_ok=True)
    peak = np.max(np.abs(data)) or 1.0
    pcm = np.int16(np.clip(data / peak * 0.92, -1, 1) * 32767)
    with wave.open(os.path.join(OUT, name), "w") as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(SR)
        f.writeframes(pcm.tobytes())
    print(name, round(len(data) / SR, 2), "s")


def t(seconds):
    return np.linspace(0, seconds, int(SR * seconds), endpoint=False)


def impact(dur=0.85, f_start=150, f_end=32):
    x = t(dur)
    sweep = np.exp(np.linspace(np.log(f_start), np.log(f_end), len(x)))
    phase = np.cumsum(2 * np.pi * sweep / SR)
    body = np.sin(phase) * np.exp(-x * 5.5)
    click = np.random.default_rng(1).normal(0, 1, len(x)) * np.exp(-x * 220)
    return body * 0.95 + click * 0.22


def boom(dur=1.5):
    x = t(dur)
    sub = np.sin(2 * np.pi * 46 * x) * np.exp(-x * 2.4)
    low = np.sin(2 * np.pi * 88 * x) * np.exp(-x * 4.2) * 0.5
    click = np.random.default_rng(2).normal(0, 1, len(x)) * np.exp(-x * 160) * 0.3
    return sub + low + click


def whoosh(dur=0.5, rev=False):
    x = t(dur)
    rng = np.random.default_rng(3)
    noise = rng.normal(0, 1, len(x))
    # one-pole bandpass sweep, emulated by amplitude-shaped filtered noise
    env = np.sin(np.pi * x / dur) ** 2
    sweep = np.linspace(1, 0, len(x)) if rev else np.linspace(0, 1, len(x))
    filtered = np.zeros_like(noise)
    state = 0.0
    for i, s in enumerate(sweep):
        a = 0.02 + 0.55 * s
        state += a * (noise[i] - state)
        filtered[i] = noise[i] - state  # high-passed
    return filtered * env * 0.8


def pop(dur=0.16, f0=1100, f1=380):
    x = t(dur)
    sweep = np.exp(np.linspace(np.log(f0), np.log(f1), len(x)))
    phase = np.cumsum(2 * np.pi * sweep / SR)
    return np.sin(phase) * np.exp(-x * 26)


def riser(dur=1.8):
    x = t(dur)
    rng = np.random.default_rng(5)
    noise = rng.normal(0, 1, len(x))
    state = 0.0
    filtered = np.zeros_like(noise)
    for i in range(len(noise)):
        a = 0.004 + 0.25 * (i / len(noise)) ** 2
        state += a * (noise[i] - state)
        filtered[i] = state
    tone_f = np.exp(np.linspace(np.log(220), np.log(2400), len(x)))
    tone = np.sin(np.cumsum(2 * np.pi * tone_f / SR)) * 0.35
    env = (x / dur) ** 2.2
    return (filtered * 2.4 + tone) * env


def shimmer(dur=1.4):
    x = t(dur)
    out = np.zeros_like(x)
    for i, f in enumerate([1860, 2480, 3320, 4180]):
        out += np.sin(2 * np.pi * f * x) * np.exp(-x * (3.2 + i * 0.8)) / (i + 1.4)
    return out


def ticks(dur=4.0, rate=9.0):
    x = t(dur)
    out = np.zeros_like(x)
    step = int(SR / rate)
    click_len = int(SR * 0.02)
    cx = t(0.02)
    click = np.sin(2 * np.pi * 2200 * cx) * np.exp(-cx * 300)
    for start in range(0, len(x) - click_len, step):
        out[start : start + click_len] += click
    return out


def ice_crack(dur=1.1):
    x = t(dur)
    rng = np.random.default_rng(7)
    out = np.zeros_like(x)
    for offset, decay, freq in [(0.0, 90, 1400), (0.09, 70, 900), (0.23, 55, 2100)]:
        i0 = int(offset * SR)
        seg = x[: len(x) - i0]
        burst = rng.normal(0, 1, len(seg)) * np.exp(-seg * decay)
        tone = np.sin(2 * np.pi * freq * seg) * np.exp(-seg * decay * 0.8) * 0.4
        out[i0:] += burst + tone
    return out


if __name__ == "__main__":
    write("impact.wav", impact())
    write("boom.wav", boom())
    write("whoosh.wav", whoosh())
    write("whoosh_rev.wav", whoosh(0.7, rev=True))
    write("pop.wav", pop())
    write("riser.wav", riser())
    write("shimmer.wav", shimmer())
    write("ticks.wav", ticks())
    write("ice_crack.wav", ice_crack())
