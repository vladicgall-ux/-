import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { CityPhoto, Credit } from "../Photo";
import { Accent, Body, Headline, Lower, PageDots, Slate } from "../ui";

export const Slide1: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <CityPhoto src="aerial.jpg" focus="50% 34%" scale={1.08} />
    <Slate index={1} total={7} label="Челябинск" />
    <Lower>
      <Headline size={96}>
        ГОРОДУ
        <br />
        <Accent>290 ЛЕТ</Accent>
      </Headline>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 6, height: 58, background: theme.accent }} />
        <Body size={33}>
          13 сентября <Accent>1736-го</Accent> тут поставили крепость на берегу
          Миасса.
        </Body>
      </div>
      <Body size={29}>Сегодня здесь живёт 1 176 770 человек.</Body>
    </Lower>
    <PageDots total={7} active={0} />
    <SwipeArrow />
    <Credit>фото: Bastiat74 / CC BY-SA 3.0</Credit>
  </AbsoluteFill>
);
