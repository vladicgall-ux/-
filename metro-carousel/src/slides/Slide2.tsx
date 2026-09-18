import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { MetroBackground } from "../Background";
import { theme } from "../brand";
import { Accent, Frame, HookTitle, PageDots, PhotoBand, PillTag, SubText } from "../ui";

export const Slide2: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <MetroBackground />
    <Frame>
      <div>
        <PillTag>что под землёй</PillTag>
      </div>
      <HookTitle size={92}>
        ТОННЕЛИ ГРЫЗУТ
        <br />
        <Accent>«ПОЛИНА»</Accent> И <Accent>«МАРИЯ»</Accent>
      </HookTitle>
      <PhotoBand height={420} caption="ПРОХОДЧЕСКИЕ ЩИТЫ · 2026" />
      <SubText>
        Два проходческих комплекса запустили в 2026-м.
        <br />
        Метро переделали в метротрам — трамвай ныряет под центр.
      </SubText>
    </Frame>
    <PageDots total={5} active={1} />
    <SwipeArrow />
  </AbsoluteFill>
);
