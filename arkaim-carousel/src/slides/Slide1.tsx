import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { CityPhoto, Credit } from "../Photo";
import { Accent, Body, Headline, Lower, PageDots, Slate } from "../ui";

export const Slide1: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <CityPhoto src="dawn.jpg" focus="50% 38%" scale={1.1} />
    <Slate index={1} total={7} label="Челябинская область" />
    <Lower>
      <Headline size={78}>
        ОН СТАРШЕ,
        <br />
        ЧЕМ <Accent>ЕГИПЕТСКИЕ ПИРАМИДЫ</Accent>
      </Headline>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 6, height: 58, background: theme.accent }} />
        <Body size={32}>
          В степи под Челябинском стоит город, которому <Accent>около 4000 лет</Accent>.
        </Body>
      </div>
      <Body size={28}>Его нашли случайно — и чуть не затопили.</Body>
    </Lower>
    <PageDots total={7} active={0} />
    <SwipeArrow />
    <Credit>фото: Коваленко Ольга Львовна / CC BY-SA 4.0</Credit>
  </AbsoluteFill>
);
