import { AbsoluteFill } from "remotion";
import { ArtRock } from "../Art";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { Sky } from "../Sky";
import { Accent, Body, Eyebrow, Headline, Lower, PageDots, Slate, Source } from "../ui";

export const Slide2: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <Sky glow={0.7} />
    <ArtRock />
    <Slate index={2} total={7} label="что это было" />
    <Lower>
      <Eyebrow>камень размером с дом</Eyebrow>
      <Headline size={82}>
        18 МЕТРОВ
        <br />
        И <Accent>11 000 ТОНН</Accent>
      </Headline>
      <Body size={30}>
        Его не видел ни один телескоп: объект шёл со стороны Солнца.
      </Body>
      <Source>оценка NASA</Source>
    </Lower>
    <PageDots total={7} active={1} />
    <SwipeArrow />
  </AbsoluteFill>
);
