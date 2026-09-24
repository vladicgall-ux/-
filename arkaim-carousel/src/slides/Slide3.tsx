import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { CityPhoto, Credit } from "../Photo";
import { Accent, Body, Eyebrow, Headline, Lower, PageDots, Slate, Stat } from "../ui";

export const Slide3: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <CityPhoto src="dwelling.jpg" focus="50% 42%" scale={1.08} />
    <Slate index={3} total={7} label="устройство" />
    <Lower bottom={132}>
      <Eyebrow>как был устроен город</Eyebrow>
      <Headline size={70}>
        ДО ДВУХ ТЫСЯЧ
        <br />
        ЖИТЕЛЕЙ <Accent>ЗА СТЕНОЙ</Accent>
      </Headline>
      <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
        <Stat value="66" label="жилищ по кругу" />
        <Stat value="170" unit="м" label="диаметр вала" />
      </div>
      <Body size={27}>Два кольца стен, ров и площадь для собраний в центре.</Body>
    </Lower>
    <PageDots total={7} active={2} />
    <SwipeArrow />
    <Credit>фото: Леготина Лидия / CC BY-SA 4.0</Credit>
  </AbsoluteFill>
);
