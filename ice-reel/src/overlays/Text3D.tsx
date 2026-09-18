import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../brand";
import { fontFamily, serifFontFamily } from "../fonts";
import { Word } from "../timeline";

export const extrude = (depth: number, color = "rgba(3,7,12,0.92)") =>
  Array.from(
    { length: depth },
    (_, i) => `${(i + 1) * 1.05}px ${(i + 1) * 1.05}px 0 ${color}`,
  ).join(", ");

const GRADIENT_ICE = `linear-gradient(180deg, ${theme.frost} 0%, ${theme.ice} 52%, ${theme.iceDeep} 100%)`;
const GRADIENT_GOLD = `linear-gradient(180deg, ${theme.goldLight} 0%, ${theme.gold} 50%, ${theme.goldDeep} 100%)`;

export const Title3D: React.FC<{
  text: string;
  fontSize?: number;
  delay?: number;
  tone?: "ice" | "gold";
  serif?: boolean;
}> = ({ text, fontSize = 128, delay = 0, tone = "ice", serif = false }) => {
  const frame = useCurrentFrame() - delay;

  // Cinematic push-in: oversized + motion-blurred, settling into place.
  const pop = interpolate(frame, [0, 26], [1.42, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    output: "perceptual-scale",
  });
  const rotX = interpolate(frame, [0, 26], [26, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const motionBlur = interpolate(frame, [0, 14], [18, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tracking = interpolate(frame, [0, 34], [26, serif ? 0 : -1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glow = interpolate(frame % 90, [0, 45, 90], [0.4, 0.85, 0.4], {
    easing: Easing.inOut(Easing.sin),
  });
  // Specular sweep across the letters.
  const sweep = interpolate(frame, [12, 58], [-140, 240], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const base: React.CSSProperties = {
    fontFamily: serif ? serifFontFamily : fontFamily,
    fontStyle: serif ? "italic" : "normal",
    fontWeight: 900,
    fontSize,
    lineHeight: 1.0,
    letterSpacing: tracking,
    textAlign: "center",
    whiteSpace: "pre-line",
  };

  return (
    <div
      style={{
        perspective: 1100,
        opacity,
      }}
    >
      <div
        style={{
          position: "relative",
          transform: `scale(${pop}) rotateX(${rotX}deg)`,
          transformStyle: "preserve-3d",
          filter: motionBlur > 0.4 ? `blur(${motionBlur}px)` : undefined,
        }}
      >
        <div
          style={{
            ...base,
            color: "rgba(3,7,12,0.95)",
            textShadow: extrude(20),
          }}
        >
          {text}
        </div>
        <div
          style={{
            ...base,
            position: "absolute",
            inset: 0,
            background: tone === "gold" ? GRADIENT_GOLD : GRADIENT_ICE,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: `drop-shadow(0 0 ${18 + glow * 34}px ${
              tone === "gold"
                ? `rgba(230,195,116,${0.4 + glow * 0.35})`
                : `rgba(159,220,255,${0.4 + glow * 0.35})`
            })`,
          }}
        >
          {text}
        </div>
        <div
          style={{
            ...base,
            position: "absolute",
            inset: 0,
            background: `linear-gradient(105deg, rgba(255,255,255,0) ${
              sweep - 26
            }%, rgba(255,255,255,0.95) ${sweep}%, rgba(255,255,255,0) ${
              sweep + 26
            }%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            mixBlendMode: "screen",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export const KineticCaption: React.FC<{
  words: Word[];
  top?: number;
}> = ({ words, top = 1450 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const idx = words.findIndex((w) => t >= w.s && t < w.e + 0.12);
  if (idx === -1) return null;
  const active = words[idx];

  const local = frame - Math.round(active.s * fps);
  const pop = interpolate(local, [0, 6, 11], [0.5, 1.12, 1], {
    easing: Easing.out(Easing.back(2.6)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    output: "perceptual-scale",
  });
  const tilt = idx % 2 === 0 ? -1.8 : 1.8;
  const isShort = active.t.length <= 9;

  const base: React.CSSProperties = {
    fontFamily,
    fontWeight: 900,
    fontSize: isShort ? 88 : 66,
    lineHeight: 1.02,
    textAlign: "center",
    letterSpacing: -1,
    maxWidth: 960,
  };

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 40,
      }}
    >
      <div
        style={{
          position: "relative",
          transform: `scale(${pop}) rotate(${tilt}deg)`,
        }}
      >
        <div style={{ ...base, color: "rgba(3,7,12,0.95)", textShadow: extrude(10) }}>
          {active.t}
        </div>
        <div
          style={{
            ...base,
            position: "absolute",
            inset: 0,
            background: GRADIENT_ICE,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 0 22px rgba(159,220,255,0.45))",
          }}
        >
          {active.t}
        </div>
      </div>
    </div>
  );
};
