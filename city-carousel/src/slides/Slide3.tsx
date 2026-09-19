import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { CityPhoto, Credit } from "../Photo";
import { Accent, Body, Eyebrow, Headline, Lower, PageDots, Slate } from "../ui";

export const Slide3: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <CityPhoto src="station-1910.jpg" focus="50% 46%" scale={1.08} archive />
    <Slate index={3} total={7} label="1892" />
    <Lower>
      <Eyebrow>что сделало город городом</Eyebrow>
      <Headline size={78}>
        ОТСЮДА НАЧАЛСЯ
        <br />
        <Accent>ТРАНССИБ</Accent>
      </Headline>
      <Body size={30}>
        В 1892-м в Челябинск пришла железная дорога — и уездный городок за
        десять лет стал воротами в Сибирь.
      </Body>
    </Lower>
    <PageDots total={7} active={2} />
    <SwipeArrow />
    <Credit>фото: вокзал Челябинска, 1910-е / Public Domain</Credit>
  </AbsoluteFill>
);
