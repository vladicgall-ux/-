import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { CityPhoto, Credit } from "../Photo";
import { Accent, Body, Eyebrow, Headline, Lower, PageDots, Slate } from "../ui";

export const Slide6: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <CityPhoto src="embankment.jpg" focus="50% 50%" scale={1.3} />
    <Slate index={6} total={7} label="река" />
    <Lower>
      <Eyebrow>то, ради чего сюда пришли</Eyebrow>
      <Headline size={80}>
        ВСЁ ЕЩЁ
        <br />
        НА <Accent>МИАССЕ</Accent>
      </Headline>
      <Body size={30}>
        290 лет назад реку выбрали из-за воды и брода. Сегодня по тому же
        берегу идёт набережная.
      </Body>
    </Lower>
    <PageDots total={7} active={5} />
    <SwipeArrow />
    <Credit>фото: Vyacheslav Bukharov / CC BY-SA 4.0</Credit>
  </AbsoluteFill>
);
