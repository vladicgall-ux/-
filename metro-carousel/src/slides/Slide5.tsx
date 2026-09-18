import { AbsoluteFill } from "remotion";
import { UpArrow } from "../Arrow";
import { theme } from "../brand";
import { fontFamily, serifFontFamily } from "../fonts";
import { CinematicPhoto } from "../Photo";
import { Accent, Body, Eyebrow, Headline, Lower, PageDots, Slate } from "../ui";

export const Slide5: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <CinematicPhoto src="ceremony.webp" focus="50% 46%" scale={1.06} />
    <UpArrow label="ПОДРОБНОСТИ ТУТ" />
    <Slate index={5} total={5} label="когда поедем" />
    <Lower>
      <Eyebrow>обещанный срок</Eyebrow>
      <div
        style={{
          fontFamily: serifFontFamily,
          fontStyle: "italic",
          fontWeight: 900,
          fontSize: 178,
          lineHeight: 1.0,
          marginBottom: 6,
          color: theme.text,
          textShadow: `0 0 70px ${theme.accent}44, 0 10px 40px rgba(0,0,0,0.95)`,
        }}
      >
        2027
      </div>
      <Headline size={52}>
        ДОСТРОИТЬ — К КОНЦУ <Accent>2026-го</Accent>
      </Headline>
      <Body size={28}>Если не перенесут в очередной раз.</Body>
      <div
        style={{
          marginTop: 6,
          padding: "20px 28px",
          borderRadius: 4,
          background: "rgba(255,176,32,0.14)",
          border: `1px solid ${theme.accent}77`,
          backdropFilter: "blur(10px)",
          fontFamily,
          fontSize: 32,
          fontWeight: 900,
          color: theme.accentLight,
          letterSpacing: 2,
          textAlign: "center",
        }}
      >
        ПОДРОБНОСТИ В ШАПКЕ ПРОФИЛЯ
      </div>
    </Lower>
    <PageDots total={5} active={4} />
  </AbsoluteFill>
);
