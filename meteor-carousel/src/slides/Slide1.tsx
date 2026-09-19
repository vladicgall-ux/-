import { AbsoluteFill } from "remotion";
import { ArtTrail } from "../Art";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { Sky } from "../Sky";
import { Accent, Body, Headline, Lower, PageDots, Slate } from "../ui";

export const Slide1: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <Sky glow={1.35} />
    <ArtTrail />
    <Slate index={1} total={7} label="Челябинск" />
    <Lower>
      <Headline size={94}>
        НЕБО СТАЛО
        <br />
        <Accent>ЯРЧЕ СОЛНЦА</Accent>
      </Headline>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 6, height: 58, background: theme.accent }} />
        <Body size={33}>
          15 февраля 2013-го, <Accent>09:20</Accent>. Люди подошли к окнам.
        </Body>
      </div>
      <Body size={29}>Через две минуты окон не стало.</Body>
    </Lower>
    <PageDots total={7} active={0} />
    <SwipeArrow />
  </AbsoluteFill>
);
