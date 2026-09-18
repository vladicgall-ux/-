import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../brand";
import { fontFamily, serifFontFamily } from "../fonts";
import { Word } from "../timeline";

const GRADIENT_ICE = `linear-gradient(176deg, #ffffff 0%, ${theme.frost} 38%, ${theme.ice} 78%, ${theme.iceDeep} 100%)`;
const GRADIENT_GOLD = `linear-gradient(176deg, #fff3d8 0%, ${theme.goldLight} 40%, ${theme.gold} 76%, ${theme.goldDeep} 100%)`;

export const extrude = (depth: number, color = "rgba(3,7,12,0.9)") =>
  Array.from(
    { length: depth },
    (_, i) => `${(i + 1) * 0.9}px ${(i + 1) * 0.9}px 0 ${color}`,
  ).join(", ");

/**
 * Campaign-style title: a wide-tracked kicker, a weighted headline that
 * dollies in under motion blur, a specular sweep and a rule that wipes out
 * from the centre.
 */
export const Title3D: React.FC<{
  text: string;
  kicker?: string;
  fontSize?: number;
  delay?: number;
  tone?: "ice" | "gold";
  serif?: boolean;
  rule?: boolean;
}> = ({
  text,
  kicker,
  fontSize = 112,
  delay = 0,
  tone = "ice",
  serif = false,
  rule = true,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame() - delay;
  const s = (sec: number) => sec * fps;

  const scale = interpolate(frame, [0, s(0.62)], [1.34, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    output: "perceptual-scale",
  });
  const blur = interpolate(frame, [0, s(0.3)], [16, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tracking = interpolate(frame, [0, s(0.75)], [22, serif ? 0 : -1.5], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, s(0.16)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lift = interpolate(frame, [0, s(0.62)], [16, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sweep = interpolate(frame, [s(0.25), s(1.15)], [-150, 250], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glow = interpolate(frame % s(3), [0, s(1.5), s(3)], [0.45, 0.9, 0.45], {
    easing: Easing.inOut(Easing.sin),
  });
  const ruleW = interpolate(frame, [s(0.3), s(1.0)], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const accent = tone === "gold" ? theme.gold : theme.ice;
  const base: React.CSSProperties = {
    fontFamily: serif ? serifFontFamily : fontFamily,
    fontStyle: serif ? "italic" : "normal",
    fontWeight: 900,
    fontSize,
    lineHeight: 1.02,
    letterSpacing: tracking,
    textAlign: "center",
    whiteSpace: "pre-line",
  };

  return (
    <div
      style={{
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        transform: `translateY(${lift}px)`,
      }}
    >
      {kicker ? (
        <div
          style={{
            fontFamily,
            fontSize: Math.max(20, fontSize * 0.2),
            fontWeight: 700,
            letterSpacing: 10,
            color: accent,
            opacity: interpolate(frame, [s(0.2), s(0.6)], [0, 0.95], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            textShadow: "0 2px 12px rgba(0,0,0,0.75)",
          }}
        >
          {kicker}
        </div>
      ) : null}

      <div
        style={{
          position: "relative",
          transform: `scale(${scale})`,
          filter: blur > 0.4 ? `blur(${blur}px)` : undefined,
        }}
      >
        <div
          style={{
            ...base,
            color: "rgba(2,6,10,0.92)",
            textShadow: `${extrude(6)}, 0 18px 40px rgba(0,0,0,0.75)`,
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
            filter: `drop-shadow(0 0 ${16 + glow * 30}px ${accent}${Math.round(
              90 + glow * 60,
            ).toString(16)})`,
          }}
        >
          {text}
        </div>
        <div
          style={{
            ...base,
            position: "absolute",
            inset: 0,
            background: `linear-gradient(102deg, rgba(255,255,255,0) ${
              sweep - 22
            }%, rgba(255,255,255,0.9) ${sweep}%, rgba(255,255,255,0) ${
              sweep + 22
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

      {rule ? (
        <div
          style={{
            width: 260 * ruleW,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            opacity: 0.85,
          }}
        />
      ) : null}
    </div>
  );
};

/** Understated broadcast caption: one line, tight, with a thin accent rule. */
export const KineticCaption: React.FC<{
  words: Word[];
  top?: number;
  tone?: "ice" | "gold";
}> = ({ words, top = 1470, tone = "ice" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const active = words.find((w) => t >= w.s && t < w.e + 0.14);
  if (!active) return null;

  const local = frame - Math.round(active.s * fps);
  const pop = interpolate(local, [0, fps * 0.14], [0.86, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    output: "perceptual-scale",
  });
  const fade = interpolate(local, [0, fps * 0.09], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const accent = tone === "gold" ? theme.gold : theme.ice;
  const long = active.t.length > 15;

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
          transform: `scale(${pop})`,
          opacity: fade,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: long ? 58 : 70,
            letterSpacing: -0.5,
            lineHeight: 1.05,
            textAlign: "center",
            maxWidth: 940,
            color: theme.frost,
            textShadow:
              "0 3px 0 rgba(2,6,10,0.85), 0 14px 34px rgba(0,0,0,0.8), 0 0 28px rgba(159,220,255,0.25)",
          }}
        >
          {active.t}
        </div>
        <div
          style={{
            width: 120,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            opacity: 0.7,
          }}
        />
      </div>
    </div>
  );
};
