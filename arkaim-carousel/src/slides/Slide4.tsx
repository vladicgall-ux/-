import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { CityPhoto, Credit } from "../Photo";
import { Accent, Body, Eyebrow, Headline, Lower, PageDots, Slate } from "../ui";

export const Slide4: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <CityPhoto src="aerial.jpg" focus="70% 60%" scale={1.35} />
    <Slate index={4} total={7} label="1987" />
    <Lower>
      <Eyebrow>его чуть не залило водохранилище</Eyebrow>
      <Headline size={72}>
        НАШЛИ ЗА ГОД
        <br />
        ДО <Accent>ЗАТОПЛЕНИЯ</Accent>
      </Headline>
      <Body size={29}>
        Городище открыли в 1987-м, во время разведки перед строительством
        плотины. Значимость находки доказали — и стройку остановили.
      </Body>
    </Lower>
    <PageDots total={7} active={3} />
    <SwipeArrow />
    <Credit>фото: ZolanPro / CC BY 4.0</Credit>
  </AbsoluteFill>
);
