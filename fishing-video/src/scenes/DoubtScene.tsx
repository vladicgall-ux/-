import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "../fonts";
import { SunsetBackground } from "./Background";

export const DoubtScene: React.FC = () => {
  const frame = useCurrentFrame();

  const thinkScale = interpolate(frame % 40, [0, 20, 40], [1, 1.12, 1], {
    easing: Easing.inOut(Easing.sin),
  });

  const arrowY = interpolate(frame % 36, [0, 18, 36], [0, 16, 0], {
    easing: Easing.inOut(Easing.sin),
  });

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <SunsetBackground />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 90,
          paddingRight: 90,
        }}
      >
        <Interactive.Div
          name="This is no joke badge"
          style={{
            backgroundColor: "#ffd400",
            color: "#0b0b0b",
            fontSize: 96,
            fontWeight: 900,
            padding: "14px 46px",
            borderRadius: 16,
            textAlign: "center",
            rotate: "-2deg",
            scale: interpolate(frame, [0, 16], [0, 1], {
              easing: Easing.spring({ damping: 10 }),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              output: "perceptual-scale",
            }),
          }}
        >
          ЭТО НЕ ШУТКА
        </Interactive.Div>

        <div
          style={{
            marginTop: 46,
            fontSize: 150,
            transform: `scale(${thinkScale})`,
            opacity: interpolate(frame, [10, 26], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          🤔
        </div>

        <Interactive.Div
          name="Keep reading"
          style={{
            marginTop: 50,
            fontSize: 68,
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            textShadow: "0 6px 20px rgba(0,0,0,0.5)",
            opacity: interpolate(frame, [30, 48], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          ЧИТАЙ ДАЛЬШЕ
        </Interactive.Div>

        <div
          style={{
            marginTop: 24,
            fontSize: 90,
            transform: `translateY(${arrowY}px)`,
            opacity: interpolate(frame, [40, 55], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          👇
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
