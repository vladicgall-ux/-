import { AbsoluteFill } from "remotion";
import { ArtBurst } from "../Art";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { Sky } from "../Sky";
import { Accent, Body, Eyebrow, Headline, Lower, PageDots, Slate, Source } from "../ui";

export const Slide4: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <Sky glow={1.5} />
    <ArtBurst />
    <Slate index={4} total={7} label="взрыв" />
    <Lower>
      <Eyebrow>высота 23 километра</Eyebrow>
      <Headline size={80}>
        ОН ЛОПНУЛ
        <br />
        <Accent>В ВОЗДУХЕ</Accent>
      </Headline>
      <Body size={30}>
        Энергия вспышки — около 440 килотонн. Это десятки Хиросим, но высоко
        над головой. Именно высота спасла город.
      </Body>
      <Source>оценка NASA · РАН даёт 100–200 кт</Source>
    </Lower>
    <PageDots total={7} active={3} />
    <SwipeArrow />
  </AbsoluteFill>
);
