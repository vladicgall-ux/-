import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { CityPhoto, Credit } from "../Photo";
import { Accent, Body, Eyebrow, Headline, Lower, PageDots, Slate } from "../ui";

export const Slide2: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <CityPhoto src="old-city.jpg" focus="50% 42%" scale={1.1} archive />
    <Slate index={2} total={7} label="1736" />
    <Lower>
      <Eyebrow>с чего всё началось</Eyebrow>
      <Headline size={80}>
        КРЕПОСТЬ
        <br />
        НА <Accent>ГРАНИЦЕ</Accent>
      </Headline>
      <Body size={30}>
        Её заложил полковник Алексей Тевкелев — на месте башкирской деревни
        Челяба. Отсюда и имя, к которому все привыкли.
      </Body>
    </Lower>
    <PageDots total={7} active={1} />
    <SwipeArrow />
    <Credit>фото: Челябинск, начало XX века / Public Domain</Credit>
  </AbsoluteFill>
);
