import { Easing, interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "../fonts";

export const MoneyCounter: React.FC = () => {
  const frame = useCurrentFrame();

  const count = Math.round(
    interpolate(frame, [0, 60], [0, 200000], {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  const bounce = interpolate(frame % 24, [0, 12, 24], [0, -10, 0], {
    easing: Easing.inOut(Easing.sin),
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          fontSize: 110,
          transform: `translateY(${bounce}px)`,
        }}
      >
        💵
      </div>
      <div
        style={{
          fontFamily,
          fontSize: 68,
          fontWeight: 900,
          color: "#31d67a",
          textShadow: "0 8px 24px rgba(0,0,0,0.5)",
        }}
      >
        +{count.toLocaleString("ru-RU")} ₽
      </div>
    </div>
  );
};
