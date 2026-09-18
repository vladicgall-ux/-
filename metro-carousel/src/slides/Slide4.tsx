import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { serifFontFamily, fontFamily } from "../fonts";
import { CinematicPhoto } from "../Photo";
import { Body, Eyebrow, Headline, Lower, PageDots, Slate } from "../ui";

export const Slide4: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <CinematicPhoto src="vault.webp" focus="50% 44%" scale={1.06} />
    <Slate index={4} total={5} label="цена вопроса" />
    <Lower>
      <Eyebrow>бюджет проекта</Eyebrow>
      <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
        <div
          style={{
            fontFamily: serifFontFamily,
            fontStyle: "italic",
            fontWeight: 900,
            fontSize: 196,
            lineHeight: 1.0,
            color: theme.text,
            textShadow: `0 0 70px ${theme.accent}44, 0 10px 40px rgba(0,0,0,0.95)`,
          }}
        >
          72
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 52,
            fontWeight: 900,
            color: theme.accent,
            letterSpacing: 1,
            textShadow: "0 2px 14px rgba(0,0,0,0.95)",
          }}
        >
          МЛРД ₽
        </div>
      </div>
      <Headline size={52}>И 32 ТРАМВАЯ ДЛЯ ЛИНИИ</Headline>
      <Body size={29}>Дороже годового бюджета иного города.</Body>
    </Lower>
    <PageDots total={5} active={3} />
    <SwipeArrow />
  </AbsoluteFill>
);
