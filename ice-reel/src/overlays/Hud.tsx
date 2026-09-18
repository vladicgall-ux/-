import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../brand";
import { fontFamily, serifFontFamily } from "../fonts";

const toneColor = (tone: "ice" | "gold" | "danger") =>
  tone === "gold" ? theme.gold : tone === "danger" ? theme.danger : theme.ice;

/** Wide-tracked label. Thin rule, no fill — reads as broadcast, not sticker. */
export const Chip: React.FC<{
  children: React.ReactNode;
  tone?: "ice" | "gold" | "danger";
  delay?: number;
  fontSize?: number;
}> = ({ children, tone = "ice", delay = 0, fontSize = 28 }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame() - delay;
  const color = toneColor(tone);

  const reveal = interpolate(frame, [0, fps * 0.4], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const slide = interpolate(frame, [0, fps * 0.4], [14, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        opacity: reveal,
        transform: `translateY(${slide}px)`,
        padding: "10px 22px",
        borderRadius: 3,
        backgroundColor: "rgba(6,11,17,0.42)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div style={{ width: 26 * reveal, height: 2, backgroundColor: color }} />
      <div
        style={{
          fontFamily,
          fontSize,
          fontWeight: 800,
          letterSpacing: 5,
          color,
          textShadow: "0 3px 14px rgba(0,0,0,0.85)",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </div>
      <div style={{ width: 26 * reveal, height: 2, backgroundColor: color }} />
    </div>
  );
};

/** Data panel that hinges in on its own axis. */
export const StatCard3D: React.FC<{
  value: string;
  label: string;
  delay?: number;
  tone?: "ice" | "gold" | "danger";
  align?: "left" | "center";
}> = ({ value, label, delay = 0, tone = "ice", align = "center" }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame() - delay;
  const color = toneColor(tone);

  const entry = interpolate(frame, [0, fps * 0.45], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rotY = interpolate(frame, [0, fps * 0.6], [-58, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const drift = interpolate(frame % (fps * 5), [0, fps * 2.5, fps * 5], [0, -7, 0], {
    easing: Easing.inOut(Easing.sin),
  });
  const wipe = interpolate(frame, [fps * 0.25, fps * 0.85], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ perspective: 1400, opacity: entry }}>
      <div
        style={{
          transform: `translateY(${drift}px) rotateY(${rotY}deg)`,
          transformStyle: "preserve-3d",
          transformOrigin: "left center",
          display: "flex",
          flexDirection: "column",
          alignItems: align === "left" ? "flex-start" : "center",
          gap: 10,
          padding: "26px 40px",
          borderRadius: 4,
          backgroundColor: "rgba(6,11,17,0.62)",
          borderLeft: `3px solid ${color}`,
          boxShadow: "0 30px 70px rgba(0,0,0,0.6)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <div
          style={{
            fontFamily: serifFontFamily,
            fontStyle: "italic",
            fontSize: 96,
            fontWeight: 900,
            color: theme.frost,
            lineHeight: 0.98,
            textShadow: `0 0 34px ${color}55, 0 10px 26px rgba(0,0,0,0.7)`,
          }}
        >
          {value}
        </div>
        <div
          style={{
            width: 210 * wipe,
            height: 1.5,
            background: `linear-gradient(90deg, ${color}, transparent)`,
          }}
        />
        <div
          style={{
            fontFamily,
            fontSize: 24,
            fontWeight: 700,
            color: theme.muted,
            letterSpacing: 6,
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

/** Thin arc gauge for the drilling beat. */
export const ProgressRing: React.FC<{ duration: number; label: string }> = ({
  duration,
  label,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [fps * 0.2, duration - fps * 0.25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const R = 84;
  const C = 2 * Math.PI * R;
  const appear = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        opacity: appear,
      }}
    >
      <div style={{ position: "relative", width: 200, height: 200 }}>
        <svg width="200" height="200" style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx="100"
            cy="100"
            r={R}
            stroke="rgba(234,246,255,0.14)"
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r={R}
            stroke={theme.ice}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress)}
            style={{ filter: `drop-shadow(0 0 10px ${theme.ice})` }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: serifFontFamily,
            fontStyle: "italic",
            fontSize: 54,
            fontWeight: 900,
            color: theme.frost,
            textShadow: "0 8px 22px rgba(0,0,0,0.7)",
          }}
        >
          {Math.round(progress * 100)}%
        </div>
      </div>
      <Chip tone="ice" fontSize={24}>
        {label}
      </Chip>
    </div>
  );
};

export const TopProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 4,
      backgroundColor: "rgba(255,255,255,0.10)",
      zIndex: 60,
    }}
  >
    <div
      style={{
        width: `${Math.min(100, progress * 100)}%`,
        height: "100%",
        background: `linear-gradient(90deg, ${theme.ice} 0%, ${theme.gold} 100%)`,
        boxShadow: `0 0 12px ${theme.ice}`,
      }}
    />
  </div>
);
