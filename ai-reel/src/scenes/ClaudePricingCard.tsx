import { Easing, interpolate, useCurrentFrame } from "remotion";
import { claude, uiFont } from "../claudeBrand";
import { ClaudeMark } from "./WindowChrome";

const features = ["Заказы каждый день", "Оплата на карту", "Работа из дома"];

export const ClaudePricingCard: React.FC = () => {
  const frame = useCurrentFrame();

  const count = Math.round(
    interpolate(frame, [10, 60], [0, 200000], {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <div
      style={{
        width: 560,
        backgroundColor: claude.panel,
        border: `1px solid ${claude.border}`,
        borderRadius: 24,
        padding: "34px 38px",
        fontFamily: uiFont,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <ClaudeMark size={28} />
        <div style={{ fontSize: 24, fontWeight: 700, color: claude.text }}>
          Твой доход
        </div>
      </div>

      <div style={{ fontSize: 20, color: claude.muted, marginBottom: 4 }}>
        В месяц на заказах
      </div>
      <div
        style={{
          fontSize: 68,
          fontWeight: 800,
          color: claude.accentLight,
          marginBottom: 22,
        }}
      >
        +{count.toLocaleString("ru-RU")} ₽
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {features.map((f, i) => {
          const opacity = interpolate(
            frame,
            [40 + i * 10, 40 + i * 10 + 10],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          return (
            <div
              key={f}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                opacity,
                fontSize: 22,
                color: claude.text,
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 999,
                  backgroundColor: claude.green,
                  color: "#0b0b0b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                ✓
              </div>
              {f}
            </div>
          );
        })}
      </div>
    </div>
  );
};
