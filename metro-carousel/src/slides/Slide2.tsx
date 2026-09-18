import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { CinematicPhoto } from "../Photo";
import { Accent, Body, Eyebrow, Headline, Lower, PageDots, Slate } from "../ui";

export const Slide2: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <CinematicPhoto src="tbm-tunnel.webp" focus="52% 46%" scale={1.06} />
    <Slate index={2} total={5} label="под землёй" />
    <Lower>
      <Eyebrow>2026 год</Eyebrow>
      <Headline size={86}>
        ТОННЕЛИ ГРЫЗУТ
        <br />
        <Accent>«ПОЛИНА»</Accent> И <Accent>«МАРИЯ»</Accent>
      </Headline>
      <Body>
        Метро переделали в метротрам: трамвай ныряет под центр города и
        выходит обратно на поверхность.
      </Body>
    </Lower>
    <PageDots total={5} active={1} />
    <SwipeArrow />
  </AbsoluteFill>
);
