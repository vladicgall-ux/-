import { AbsoluteFill } from "remotion";
import { ArtLake } from "../Art";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { Sky } from "../Sky";
import { Accent, Body, Eyebrow, Headline, Lower, PageDots, Slate } from "../ui";

export const Slide6: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <Sky glow={0.45} />
    <ArtLake />
    <Slate index={6} total={7} label="Чебаркуль" />
    <Lower>
      <Eyebrow>озеро пробило насквозь</Eyebrow>
      <Headline size={78}>
        ГЛАВНЫЙ ОСКОЛОК
        <br />
        ДОСТАЛИ <Accent>В ОКТЯБРЕ</Accent>
      </Headline>
      <Body size={30}>
        570 кг подняли со дна 16 октября 2013-го — с глубины около 11 метров.
        При подъёме он развалился и сломал весы.
      </Body>
    </Lower>
    <PageDots total={7} active={5} />
    <SwipeArrow />
  </AbsoluteFill>
);
