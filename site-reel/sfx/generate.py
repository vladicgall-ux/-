"""Synthesises the reel's dopamine sound kit — no samples, no licensing.

Every cue is generated from deterministic maths so a re-run produces the
identical files, which keeps the mix reproducible alongside the render.
"""

import os
import wave

import numpy as np

SR = 48000
OUT = os.path.join(os.path.dirname(__file__), "wav")


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


def tone(freq, dur, decay, kind="sine"):
    x = t(dur)
    if kind == "tri":
        w = 2 / np.pi * np.arcsin(np.sin(2 * np.pi * freq * x))
    else:
        w = np.sin(2 * np.pi * freq * x)
    return w * np.exp(-x * decay)


# --- impacts ---------------------------------------------------------------
def impact(dur=0.7, f_start=160, f_end=34):
    x = t(dur)
    sweep = np.exp(np.linspace(np.log(f_start), np.log(f_end), len(x)))
    phase = np.cumsum(2 * np.pi * sweep / SR)
    body = np.sin(phase) * np.exp(-x * 6.0)
    click = np.random.default_rng(1).normal(0, 1, len(x)) * np.exp(-x * 240)
    return body * 0.95 + click * 0.2


def sub_drop(dur=1.2):
    x = t(dur)
    sweep = np.exp(np.linspace(np.log(90), np.log(30), len(x)))
    phase = np.cumsum(2 * np.pi * sweep / SR)
    return np.sin(phase) * np.exp(-x * 2.6)


# --- UI blips --------------------------------------------------------------
def pop(dur=0.14, f0=1250, f1=430):
    x = t(dur)
    sweep = np.exp(np.linspace(np.log(f0), np.log(f1), len(x)))
    phase = np.cumsum(2 * np.pi * sweep / SR)
    return np.sin(phase) * np.exp(-x * 26)


def click(dur=0.055):
    """Short, dry UI tick — the workhorse under card and block reveals."""
    x = t(dur)
    rng = np.random.default_rng(7)
    noise = rng.normal(0, 1, len(x)) * np.exp(-x * 400)
    body = np.sin(2 * np.pi * 2400 * x) * np.exp(-x * 190)
    return noise * 0.5 + body * 0.6


def key(dur=0.045):
    """Mechanical keystroke for the typing beats."""
    x = t(dur)
    rng = np.random.default_rng(13)
    noise = rng.normal(0, 1, len(x)) * np.exp(-x * 520)
    thock = np.sin(2 * np.pi * 620 * x) * np.exp(-x * 300)
    return noise * 0.45 + thock * 0.7


def ding(dur=1.1, root=1320):
    """Bright confirmation bell — the dopamine hit on a completed step."""
    out = np.zeros(int(SR * dur))
    for mult, amp, dec in ((1.0, 1.0, 4.2), (2.0, 0.42, 5.4), (3.01, 0.2, 7.0)):
        out += tone(root * mult, dur, dec) * amp
    return out


def success(dur=1.5):
    """Three rising notes — a major triad that lands on the octave."""
    out = np.zeros(int(SR * dur))
    steps = ((880, 0.0), (1108, 0.09), (1318, 0.18), (1760, 0.28))
    for freq, offset in steps:
        seg = tone(freq, dur - offset, 3.4) + tone(freq * 2, dur - offset, 5.0) * 0.3
        start = int(offset * SR)
        out[start : start + len(seg)] += seg
    return out


def whoosh(dur=0.45, rev=False):
    x = t(dur)
    rng = np.random.default_rng(3)
    noise = rng.normal(0, 1, len(x))
    env = np.exp(-((x - dur * 0.62) ** 2) / (2 * (dur * 0.18) ** 2))
    cut = np.linspace(0.02, 0.5, len(x))
    if rev:
        env = env[::-1]
        cut = cut[::-1]
    # one-pole lowpass whose cutoff rides the sweep
    y = np.zeros(len(x))
    acc = 0.0
    for i in range(len(x)):
        acc += cut[i] * (noise[i] - acc)
        y[i] = acc
    return y * env


def riser(dur=1.6):
    x = t(dur)
    sweep = np.exp(np.linspace(np.log(180), np.log(2100), len(x)))
    phase = np.cumsum(2 * np.pi * sweep / SR)
    body = np.sin(phase) * np.linspace(0.05, 1.0, len(x)) ** 2
    rng = np.random.default_rng(5)
    air = rng.normal(0, 1, len(x)) * np.linspace(0, 0.35, len(x)) ** 2
    return body * 0.8 + air


def shimmer(dur=1.3):
    out = np.zeros(int(SR * dur))
    for i, freq in enumerate((2100, 2800, 3520, 4400)):
        out += tone(freq, dur, 3.0 + i * 0.7) * (0.5 ** i)
    return out


def swipe(dur=0.3):
    """Tight transition swish for the 3D card turns."""
    x = t(dur)
    rng = np.random.default_rng(11)
    noise = rng.normal(0, 1, len(x))
    env = np.sin(np.pi * np.clip(x / dur, 0, 1)) ** 2
    hp = np.diff(np.concatenate(([0.0], noise)))
    return hp * env


if __name__ == "__main__":
    write("impact.wav", impact())
    write("sub.wav", sub_drop())
    write("pop.wav", pop())
    write("click.wav", click())
    write("key.wav", key())
    write("ding.wav", ding())
    write("success.wav", success())
    write("whoosh.wav", whoosh())
    write("whoosh_rev.wav", whoosh(rev=True))
    write("riser.wav", riser())
    write("shimmer.wav", shimmer())
    write("swipe.wav", swipe())
