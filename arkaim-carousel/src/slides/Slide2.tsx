import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { CityPhoto, Credit } from "../Photo";
import { Accent, Body, Eyebrow, Headline, Lower, PageDots, Slate } from "../ui";

export const Slide2: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <CityPhoto src="aerial.jpg" focus="50% 45%" scale={1.06} />
    <Slate index={2} total={7} label="что это" />
    <Lower>
      <Eyebrow>это не легенда, это раскопки</Eyebrow>
      <Headline size={82}>
        АРКАИМ
      </Headline>
      <Body size={30}>
        Укреплённое поселение эпохи бронзы, <Accent>II тыс. до н. э.</Accent> —
        та же эпоха, что у Стоунхенджа. Два кольца валов, ров и площадь
        в центре.
      </Body>
    </Lower>
    <PageDots total={7} active={1} />
    <SwipeArrow />
    <Credit>фото: ZolanPro / CC BY 4.0</Credit>
  </AbsoluteFill>
);
