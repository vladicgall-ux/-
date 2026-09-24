import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { CityPhoto, Credit } from "../Photo";
import { Accent, Body, Eyebrow, Headline, Lower, PageDots, Slate } from "../ui";

export const Slide6: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <CityPhoto src="steppe.jpg" focus="68% 90%" scale={2.6} />
    <Slate index={6} total={7} label="сегодня" />
    <Lower>
      <Eyebrow>наука закончилась — легенды продолжаются</Eyebrow>
      <Headline size={72}>
        СЮДА ЕДУТ
        <br />
        ЗА <Accent>«ЭНЕРГИЕЙ»</Accent>
      </Headline>
      <Body size={29}>
        Соседний холм зовут Горой желаний. В день летнего солнцестояния
        на Аркаим съезжаются тысячи — часть за наукой, часть за мистикой.
        Что из этого правда, каждый решает сам.
      </Body>
    </Lower>
    <PageDots total={7} active={5} />
    <SwipeArrow />
    <Credit>фото: Alice_In(W) / CC BY-SA 4.0</Credit>
  </AbsoluteFill>
);
