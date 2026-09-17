import { AbsoluteFill } from "remotion";
import { HookBackground } from "../Background";
import { ComicArrow, PageDots } from "../ComicArrow";
import { fontFamily } from "../fonts";
import { MarkerBadge, PillTag, PunchText } from "../MarkerBadge";
import { Starburst } from "../Starburst";

export const Slide1: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily }}>
      <HookBackground />
      <PageDots total={4} active={0} />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Starburst size={1000} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 70,
          paddingRight: 70,
        }}
      >
        <div style={{ transform: "rotate(-2deg)" }}>
          <PillTag>🔥 ЗАРАБОТОК НА БЕТОНЕ</PillTag>
        </div>

        <div style={{ marginTop: 40 }}>
          <PunchText fontSize={74}>КАК ЛЮДИ ДЕЛАЮТ</PunchText>
        </div>

        <div style={{ marginTop: 26 }}>
          <MarkerBadge fontSize={80} rotate={-3}>
            200 000 ₽/МЕС
          </MarkerBadge>
        </div>

        <div style={{ marginTop: 26 }}>
          <PunchText fontSize={74}>НА ОБЫЧНОМ БЕТОНЕ?</PunchText>
        </div>

        <div
          style={{
            marginTop: 40,
            maxWidth: 640,
            fontSize: 36,
            fontWeight: 700,
            color: "#ffe000",
            textAlign: "center",
            WebkitTextStroke: "1.5px #0b0b0b",
          }}
        >
          Разбираю схему по шагам 👇
        </div>
      </AbsoluteFill>

      <ComicArrow />
    </AbsoluteFill>
  );
};
