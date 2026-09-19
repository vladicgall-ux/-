import { AbsoluteFill } from "remotion";
import { ArtEntry } from "../Art";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { Sky } from "../Sky";
import { Accent, Body, Eyebrow, Headline, Lower, PageDots, Slate } from "../ui";

export const Slide3: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <Sky glow={0.9} />
    <ArtEntry />
    <Slate index={3} total={7} label="вход" />
    <Lower>
      <Eyebrow>скорость на входе</Eyebrow>
      <Headline size={84}>
        <Accent>18,6 КМ</Accent>
        <br />
        ЗА СЕКУНДУ
      </Headline>
      <Body size={30}>
        Угол был пологий — около 18°. Поэтому он не воткнулся в землю, а прошёл
        сквозь атмосферу, как нож по касательной.
      </Body>
    </Lower>
    <PageDots total={7} active={2} />
    <SwipeArrow />
  </AbsoluteFill>
);
