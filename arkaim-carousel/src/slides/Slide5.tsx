import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { CityPhoto, Credit } from "../Photo";
import { Accent, Body, Eyebrow, Headline, Lower, PageDots, Slate } from "../ui";

export const Slide5: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <CityPhoto src="steppe.jpg" focus="30% 92%" scale={2.9} />
    <Slate index={5} total={7} label="страна городов" />
    <Lower>
      <Eyebrow>он такой не один</Eyebrow>
      <Headline size={74}>
        ВОКРУГ НАШЛИ
        <br />
        ЕЩЁ <Accent>20+ ГОРОДИЩ</Accent>
      </Headline>
      <Body size={29}>
        Их называют «Страной городов» — цепочкой укреплённых поселений одной
        культуры вдоль восточного склона Урала. С 1991 года долина —
        заповедная территория.
      </Body>
    </Lower>
    <PageDots total={7} active={4} />
    <SwipeArrow />
    <Credit>фото: Alice_In(W) / CC BY-SA 4.0</Credit>
  </AbsoluteFill>
);
