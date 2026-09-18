import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { CinematicPhoto } from "../Photo";
import { Accent, Body, Headline, Lower, PageDots, Slate } from "../ui";

export const Slide1: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <CinematicPhoto src="tunnel-wide.jpg" focus="50% 42%" scale={1.08} />
    <Slate index={1} total={5} label="Челябинск" />
    <Lower>
      <Headline size={104}>
        <Accent>ЗАПУСТИЛИ</Accent>
        <br />
        МЕТРО
      </Headline>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 6, height: 54, background: theme.accent }} />
        <Body size={34}>
          ...точнее — <Accent>проходческие щиты</Accent>
        </Body>
      </div>
      <Body>34 года стройки. Поезда — только в 2027-м.</Body>
    </Lower>
    <PageDots total={5} active={0} />
    <SwipeArrow />
  </AbsoluteFill>
);
