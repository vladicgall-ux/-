import { Easing, interpolate, useCurrentFrame } from "remotion";
import { theme, uiFont } from "../brand";
import { fontFamily } from "../fonts";
import { extrude } from "./Text3D";

export const Chip: React.FC<{
  children: React.ReactNode;
  tone?: "ice" | "gold" | "danger";
  delay?: number;
  fontSize?: number;
}> = ({ children, tone = "ice", delay = 0, fontSize = 30 }) => {
  const frame = useCurrentFrame() - delay;
  const pop = interpolate(frame, [0, 12], [0, 1], {
    easing: Easing.out(Easing.back(2)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    output: "perceptual-scale",
  });
  const color =
    tone === "gold" ? theme.gold : tone === "danger" ? theme.danger : theme.ice;

  return (
    <div
      style={{
        fontFamily,
        fontSize,
        fontWeight: 800,
        letterSpacing: 2,
        color,
        backgroundColor: "rgba(5,9,14,0.72)",
        border: `1.5px solid ${color}`,
        borderRadius: 999,
        padding: "11px 30px",
        boxShadow: `0 0 26px ${color}44`,
        scale: pop,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
};

export const StatCard3D: React.FC<{
  value: string;
  label: string;
  icon: string;
  delay?: number;
  tone?: "ice" | "gold" | "danger";
}> = ({ value, label, icon, delay = 0, tone = "ice" }) => {
  const frame = useCurrentFrame() - delay;
  const color =
    tone === "gold" ? theme.gold : tone === "danger" ? theme.danger : theme.ice;

  const entry = interpolate(frame, [0, 20], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rotY = interpolate(frame, [0, 24], [72, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const float = interpolate(frame % 150, [0, 75, 150], [0, -10, 0], {
    easing: Easing.inOut(Easing.sin),
  });
  const idle = interpolate(frame % 190, [0, 95, 190], [-5, 5, -5], {
    easing: Easing.inOut(Easing.sin),
  });

  return (
    <div style={{ perspective: 1200, opacity: entry }}>
      <div
        style={{
          transform: `translateY(${float}px) rotateY(${
            frame < 24 ? -rotY : idle
          }deg)`,
          transformStyle: "preserve-3d",
          display: "flex",
          alignItems: "center",
          gap: 26,
          padding: "26px 40px",
          borderRadius: 26,
          backgroundColor: "rgba(8,14,20,0.82)",
          border: `1.5px solid ${color}66`,
          boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 44px ${color}33`,
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 24,
            background: `linear-gradient(135deg, ${color} 0%, rgba(8,14,20,0.2) 130%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 50,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div
            style={{
              fontFamily,
              fontSize: 72,
              fontWeight: 900,
              color: theme.frost,
              lineHeight: 1,
              textShadow: extrude(7),
            }}
          >
            {value}
          </div>
          <div
            style={{
              fontFamily: uiFont,
              fontSize: 28,
              fontWeight: 700,
              color,
              letterSpacing: 2,
            }}
          >
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProgressRing: React.FC<{
  duration: number;
  label: string;
}> = ({ duration, label }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [10, duration - 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const R = 78;
  const C = 2 * Math.PI * R;
  const appear = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        opacity: appear,
      }}
    >
      <div style={{ position: "relative", width: 190, height: 190 }}>
        <svg width="190" height="190" style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx="95"
            cy="95"
            r={R}
            stroke="rgba(159,220,255,0.18)"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="95"
            cy="95"
            r={R}
            stroke={theme.ice}
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress)}
            style={{ filter: `drop-shadow(0 0 12px ${theme.ice})` }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily,
            fontSize: 46,
            fontWeight: 900,
            color: theme.frost,
            textShadow: extrude(5),
          }}
        >
          {Math.round(progress * 100)}%
        </div>
      </div>
      <Chip tone="ice" fontSize={28}>
        {label}
      </Chip>
    </div>
  );
};

export const TopProgressBar: React.FC<{ progress: number }> = ({
  progress,
}) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 7,
      backgroundColor: "rgba(255,255,255,0.12)",
      zIndex: 60,
    }}
  >
    <div
      style={{
        width: `${Math.min(100, progress * 100)}%`,
        height: "100%",
        background: `linear-gradient(90deg, ${theme.ice} 0%, ${theme.gold} 100%)`,
        boxShadow: `0 0 16px ${theme.ice}`,
      }}
    />
  </div>
);
