import { AbsoluteFill } from "remotion";
import { UpArrow } from "../Arrow";
import { MetroBackground } from "../Background";
import { theme } from "../brand";
import { fontFamily } from "../fonts";
import { Accent, BigNumber, Frame, HookTitle, PageDots, PhotoBand, PillTag, SubText } from "../ui";

export const Slide5: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <MetroBackground />
    <UpArrow label="ПОДРОБНОСТИ ТУТ" />
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "206px 56px 120px",
        display: "flex",
        flexDirection: "column",
        gap: 22,
        zIndex: 10,
      }}
    >
      <div>
        <PillTag>когда поедем</PillTag>
      </div>
      <BigNumber value="2027" />
      <HookTitle size={52}>
        ДОСТРОИТЬ ОБЕЩАЮТ
        <br />
        К КОНЦУ <Accent>2026-го</Accent>
      </HookTitle>
      <PhotoBand height={258} caption="ПУСК — 2027 ГОД" />
      <SubText size={30}>
        Если не перенесут в тридцатый раз за 34 года.
      </SubText>
      <div
        style={{
          marginTop: 4,
          padding: "22px 28px",
          borderRadius: 6,
          background: "rgba(255,176,32,0.12)",
          border: `1px solid ${theme.accent}66`,
          fontFamily,
          fontSize: 34,
          fontWeight: 900,
          color: theme.accentLight,
          letterSpacing: 1,
          textAlign: "center",
        }}
      >
        ПОДРОБНОСТИ В ШАПКЕ ПРОФИЛЯ
      </div>
    </div>
    <PageDots total={5} active={4} />
  </AbsoluteFill>
);
