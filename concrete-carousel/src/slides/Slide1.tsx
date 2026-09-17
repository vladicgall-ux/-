import { AbsoluteFill } from "remotion";
import { ConcreteBackground } from "../Background";
import { ComicArrow, PageDots } from "../ComicArrow";
import { fontFamily } from "../fonts";
import { MarkerBadge, PillTag } from "../MarkerBadge";

export const Slide1: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily }}>
      <ConcreteBackground />
      <PageDots total={4} active={0} />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 90,
          paddingRight: 90,
        }}
      >
        <PillTag>ЗАРАБОТОК НА БЕТОНЕ</PillTag>

        <div
          style={{
            marginTop: 46,
            fontSize: 78,
            fontWeight: 900,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.12,
            textShadow: "0 6px 20px rgba(0,0,0,0.5)",
          }}
        >
          КАК ЛЮДИ ДЕЛАЮТ
        </div>

        <div style={{ marginTop: 18 }}>
          <MarkerBadge fontSize={92} rotate={-2}>
            200 000 ₽/МЕС
          </MarkerBadge>
        </div>

        <div
          style={{
            marginTop: 30,
            fontSize: 78,
            fontWeight: 900,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.12,
            textShadow: "0 6px 20px rgba(0,0,0,0.5)",
          }}
        >
          НА ОБЫЧНОМ БЕТОНЕ?
        </div>

        <div
          style={{
            marginTop: 44,
            fontSize: 42,
            fontWeight: 700,
            color: "#ffd400",
            textAlign: "center",
          }}
        >
          Разбираю схему по шагам 👇
        </div>
      </AbsoluteFill>

      <ComicArrow />
    </AbsoluteFill>
  );
};
