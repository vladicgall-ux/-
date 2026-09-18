import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { MetroBackground } from "../Background";
import { theme } from "../brand";
import { Accent, Frame, HookTitle, PageDots, PhotoBand, PillTag, SubText } from "../ui";

export const Slide1: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <MetroBackground />
    <Frame>
      <div>
        <PillTag>Челябинск</PillTag>
      </div>
      <HookTitle size={116}>
        34 ГОДА
        <br />
        <Accent>КОПАЮТ</Accent> МЕТРО
      </HookTitle>
      <PhotoBand height={392} caption="СТРОЙКА ИДЁТ С 1992 ГОДА" />
      <SubText>
        Стройку начали в 1992-м.
        <br />
        Поезда до сих пор не ходят.
      </SubText>
    </Frame>
    <PageDots total={5} active={0} />
    <SwipeArrow />
  </AbsoluteFill>
);
