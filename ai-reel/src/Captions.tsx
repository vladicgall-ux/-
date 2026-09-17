import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { captions } from "./captions";
import { fontFamily } from "./fonts";

export const Captions: React.FC<{ top: number }> = ({ top }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const active = captions.find((c) => t >= c.start && t < c.end);
  if (!active) return null;

  const localFrame = frame - Math.round(active.start * fps);
  const scale = interpolate(localFrame, [0, 6], [0.6, 1.08], {
    easing: Easing.out(Easing.back(2)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    output: "perceptual-scale",
  });
  const settle = interpolate(localFrame, [6, 10], [1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    output: "perceptual-scale",
  });

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 20,
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize: 58,
          fontWeight: 900,
          color: "#ffffff",
          backgroundColor: "#0b0b0b",
          padding: "14px 34px",
          borderRadius: 14,
          textAlign: "center",
          maxWidth: 940,
          lineHeight: 1.05,
          scale: localFrame < 6 ? scale : settle,
          boxShadow: "0 14px 30px rgba(0,0,0,0.5)",
        }}
      >
        {active.text}
      </div>
    </div>
  );
};
