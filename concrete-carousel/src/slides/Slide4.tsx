import { AbsoluteFill } from "remotion";
import { ConcreteBackground } from "../Background";
import { PageDots } from "../ComicArrow";
import { fontFamily } from "../fonts";
import { MarkerBadge } from "../MarkerBadge";

export const Slide4: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily }}>
      <ConcreteBackground />
      <PageDots total={4} active={3} />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 90,
          paddingRight: 90,
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: 900,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.1,
            textShadow: "0 6px 20px rgba(0,0,0,0.5)",
          }}
        >
          ХОЧЕШЬ ТАК ЖЕ?
        </div>

        <div style={{ marginTop: 54 }}>
          <MarkerBadge fontSize={58} rotate={-3}>
            ПИШИ В ЛС 🔥
          </MarkerBadge>
        </div>

        <div
          style={{
            marginTop: 60,
            fontSize: 38,
            fontWeight: 700,
            color: "#ffd400",
            textAlign: "center",
          }}
        >
          Сохрани пост, чтобы не потерять 📌
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 70,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 30,
            fontWeight: 800,
            color: "rgba(255,212,0,0.85)",
            letterSpacing: 3,
          }}
        >
          ЗАРАБОТОК НА БЕТОНЕ
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
