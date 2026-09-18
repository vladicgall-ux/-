import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { MetroBackground } from "../Background";
import { theme } from "../brand";
import { fontFamily } from "../fonts";
import { Accent, Frame, HookTitle, PageDots, PhotoBand, PillTag } from "../ui";

export const Slide1: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <MetroBackground />
    <Frame>
      <div>
        <PillTag>Челябинск</PillTag>
      </div>
      <HookTitle size={110}>
        <Accent>ЗАПУСТИЛИ</Accent>
        <br />
        МЕТРО
      </HookTitle>
      {/* the correction sits right under the claim, so the hook lands
          without the slide ever saying something untrue */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginTop: -10,
        }}
      >
        <div style={{ width: 8, height: 62, background: theme.accent }} />
        <div
          style={{
            fontFamily,
            fontSize: 38,
            fontWeight: 900,
            lineHeight: 1.12,
            color: theme.text,
          }}
        >
          ...точнее — <Accent>проходческие щиты</Accent>
        </div>
      </div>
      <PhotoBand height={366} caption="КОПАЮТ С 1992 ГОДА" />
      <div
        style={{
          fontFamily,
          fontSize: 34,
          fontWeight: 700,
          lineHeight: 1.26,
          color: theme.muted,
          maxWidth: 700,
        }}
      >
        34 года стройки.
        <br />
        Поезда — только в 2027-м.
      </div>
    </Frame>
    <PageDots total={5} active={0} />
    <SwipeArrow />
  </AbsoluteFill>
);
