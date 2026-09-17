import { AbsoluteFill } from "remotion";
import { HookBackground } from "../Background";
import { PageDots } from "../ComicArrow";
import { fontFamily } from "../fonts";
import { MarkerBadge, PunchText } from "../MarkerBadge";
import { Starburst } from "../Starburst";

export const Slide4: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily }}>
      <HookBackground />
      <PageDots total={4} active={3} />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Starburst size={1000} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 80,
          paddingRight: 80,
        }}
      >
        <PunchText fontSize={82}>ХОЧЕШЬ ТАК ЖЕ?</PunchText>

        <div style={{ marginTop: 56 }}>
          <MarkerBadge fontSize={54} rotate={-3}>
            ПИШИ В ЛС 🔥
          </MarkerBadge>
        </div>

        <div
          style={{
            marginTop: 56,
            fontSize: 36,
            fontWeight: 700,
            color: "#ffe000",
            textAlign: "center",
            WebkitTextStroke: "1.5px #0b0b0b",
          }}
        >
          Сохрани пост, чтобы не потерять 📌
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 64,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 28,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: 2,
            WebkitTextStroke: "1px #0b0b0b",
          }}
        >
          ЗАРАБОТОК НА БЕТОНЕ
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
