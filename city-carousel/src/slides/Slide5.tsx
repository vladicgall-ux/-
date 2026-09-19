import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { CityPhoto, Credit } from "../Photo";
import { Accent, Body, Eyebrow, Headline, Lower, PageDots, Slate, Stat } from "../ui";

export const Slide5: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <CityPhoto src="kirovka.jpg" focus="50% 36%" scale={1.08} />
    <Slate index={5} total={7} label="сегодня" />
    <Lower bottom={132}>
      <Eyebrow>цифры, которые редко называют</Eyebrow>
      <Headline size={74}>
        ВОСЬМОЙ ГОРОД
        <br />
        <Accent>СТРАНЫ</Accent>
      </Headline>
      <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
        <Stat value="1,17" unit="млн" label="жителей" />
        <Stat value="501" unit="км²" label="площадь города" />
      </div>
      <Body size={27}>Это в полтора раза больше, чем вся Мальта.</Body>
    </Lower>
    <PageDots total={7} active={4} />
    <SwipeArrow />
    <Credit>фото: Vyacheslav Bukharov / CC BY-SA 4.0</Credit>
  </AbsoluteFill>
);
