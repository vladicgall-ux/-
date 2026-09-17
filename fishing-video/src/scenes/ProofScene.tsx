import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "../fonts";
import { SunsetBackground } from "./Background";

const items = [
  { icon: "📍", text: "Точное место" },
  { icon: "🪱", text: "Рабочая прикормка" },
  { icon: "🎣", text: "20 лет опыта гида" },
];

export const ProofScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <SunsetBackground />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 80,
          paddingRight: 80,
        }}
      >
        <Interactive.Div
          name="Secret is simple title"
          style={{
            fontSize: 74,
            fontWeight: 900,
            color: "#ffffff",
            textAlign: "center",
            marginBottom: 70,
            textShadow: "0 6px 20px rgba(0,0,0,0.5)",
            opacity: interpolate(frame, [0, 16], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          СЕКРЕТ ПРОСТ:
        </Interactive.Div>

        {items.map((item, i) => {
          const start = 16 + i * 22;
          return (
            <div
              key={item.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 28,
                backgroundColor: "rgba(11,11,11,0.55)",
                border: "2px solid rgba(255,212,0,0.6)",
                borderRadius: 22,
                padding: "26px 40px",
                marginBottom: 26,
                width: 860,
                opacity: interpolate(frame, [start, start + 18], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                transform: `translateX(${interpolate(
                  frame,
                  [start, start + 18],
                  [-260, 0],
                  {
                    easing: Easing.out(Easing.cubic),
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  },
                )}px)`,
              }}
            >
              <div style={{ fontSize: 64 }}>{item.icon}</div>
              <div style={{ fontSize: 50, fontWeight: 800, color: "#ffffff" }}>
                {item.text}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
