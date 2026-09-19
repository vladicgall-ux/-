import { AbsoluteFill } from "remotion";
import { ArtCity } from "../Art";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { Sky } from "../Sky";
import { Accent, Body, Eyebrow, Headline, Lower, PageDots, Slate, Stat } from "../ui";

export const Slide5: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <Sky glow={0.6} />
    <ArtCity />
    <Slate index={5} total={7} label="что осталось внизу" />
    <Lower bottom={132}>
      <Eyebrow>первыми пришли не осколки, а звук</Eyebrow>
      <Headline size={74}>
        СТЁКЛА ВЫНЕСЛО
        <br />
        ПО <Accent>ВСЕМУ ГОРОДУ</Accent>
      </Headline>
      <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
        <Stat value="~1600" label="обратились к врачам" />
        <Stat value="7000" unit="+" label="зданий с выбитыми окнами" />
      </div>
      <Body size={27}>
        Почти все травмы — от стекла. Погибших нет ни одного.
      </Body>
    </Lower>
    <PageDots total={7} active={4} />
    <SwipeArrow />
  </AbsoluteFill>
);
