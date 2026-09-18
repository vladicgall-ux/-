import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { MetroBackground } from "../Background";
import { theme } from "../brand";
import { Accent, BigNumber, Frame, HookTitle, PageDots, PhotoBand, PillTag, SubText } from "../ui";

export const Slide4: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <MetroBackground />
    <Frame>
      <div>
        <PillTag tone="danger">цена вопроса</PillTag>
      </div>
      <BigNumber value="72" unit="МЛРД ₽" />
      <HookTitle size={62}>
        СТОЛЬКО СТОИТ
        <br />
        <Accent>ПОДЗЕМКА</Accent>
      </HookTitle>
      <PhotoBand height={360} caption="32 НИЗКОПОЛЬНЫХ ТРАМВАЯ" />
      <SubText size={32}>
        Плюс 32 трамвая для линии.
      </SubText>
    </Frame>
    <PageDots total={5} active={3} />
    <SwipeArrow />
  </AbsoluteFill>
);
