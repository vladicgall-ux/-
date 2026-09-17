import { Easing, interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "../fonts";

const steps = [
  { icon: "🌐", label: "САЙТ" },
  { icon: "📞", label: "ЗВОНОК" },
  { icon: "💬", label: "TELEGRAM" },
  { icon: "💰", label: "ЗАКАЗ" },
];

export const OrderFlow: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: "0 40px",
      }}
    >
      {steps.map((s, i) => {
        const start = i * 20;
        const pop = interpolate(frame, [start, start + 14], [0, 1], {
          easing: Easing.out(Easing.back(2)),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          output: "perceptual-scale",
        });
        const arrowOpacity = interpolate(
          frame,
          [start + 14, start + 20],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        return (
          <div
            key={s.label}
            style={{ display: "flex", alignItems: "center", gap: 14 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                scale: pop,
              }}
            >
              <div
                style={{
                  width: 108,
                  height: 108,
                  borderRadius: 28,
                  backgroundColor: "#161616",
                  border: "3px solid #ffe000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 54,
                  boxShadow: "6px 8px 0 rgba(0,0,0,0.5)",
                }}
              >
                {s.icon}
              </div>
              <div
                style={{
                  fontFamily,
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#ffe000",
                }}
              >
                {s.label}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  fontSize: 40,
                  color: "#ffffff",
                  opacity: arrowOpacity,
                  fontWeight: 900,
                }}
              >
                →
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
