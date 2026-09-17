import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "../fonts";
import { SunsetBackground } from "./Background";

export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();

  const pulse = interpolate(frame % 34, [0, 17, 34], [1, 1.07, 1], {
    easing: Easing.inOut(Easing.sin),
  });

  const arrowY = interpolate(frame % 30, [0, 15, 30], [0, 14, 0], {
    easing: Easing.inOut(Easing.sin),
  });

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <SunsetBackground intense />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 80,
          paddingRight: 80,
        }}
      >
        <Interactive.Div
          name="Want the same title"
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.05,
            textShadow: "0 8px 26px rgba(0,0,0,0.55)",
            scale: interpolate(frame, [0, 16], [0, 1], {
              easing: Easing.spring({ damping: 10 }),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              output: "perceptual-scale",
            }),
          }}
        >
          ХОЧЕШЬ ТАК ЖЕ?
        </Interactive.Div>

        <div
          style={{
            marginTop: 54,
            transform: `scale(${pulse})`,
            opacity: interpolate(frame, [20, 36], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Interactive.Div
            name="CTA button"
            style={{
              backgroundColor: "#ffd400",
              color: "#0b0b0b",
              fontSize: 62,
              fontWeight: 900,
              padding: "24px 56px",
              borderRadius: 999,
            }}
          >
            ПИШИ В ЛС 🔥
          </Interactive.Div>
        </div>

        <Interactive.Div
          name="Subscribe hint"
          style={{
            marginTop: 44,
            fontSize: 48,
            fontWeight: 700,
            color: "#ffffff",
            opacity: interpolate(frame, [40, 56], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          и подписывайся, чтобы не пропустить
        </Interactive.Div>

        <div
          style={{
            marginTop: 20,
            fontSize: 70,
            transform: `translateY(${arrowY}px)`,
            opacity: interpolate(frame, [50, 66], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          ⬇️
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 90,
        }}
      >
        <Interactive.Div
          name="Brand tag"
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: "#ffd400",
            letterSpacing: 3,
            opacity: interpolate(frame, [90, 110], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          RYBAK · BOLSHOY KREMENKUL
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
