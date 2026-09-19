import { AbsoluteFill } from "remotion";
import { theme } from "../brand";
import { fontFamily, serifFontFamily } from "../fonts";
import { CityPhoto, Credit } from "../Photo";

/**
 * Story frames are the same piece in another shape: one photograph, one
 * number, one line telling people where the rest of it is. Everything
 * lives inside the safe area — the top 250px and bottom 320px of a story
 * are covered by Instagram's own chrome.
 */
export const StoryFrame: React.FC<{
  src: string;
  focus?: string;
  scale?: number;
  archive?: boolean;
  kicker: string;
  big: string;
  line: React.ReactNode;
  foot: string;
  credit: string;
}> = ({ src, focus, scale, archive, kicker, big, line, foot, credit }) => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <CityPhoto src={src} focus={focus} scale={scale} archive={archive} />

    {/* the block sits above the reply bar, inside the safe area */}
    <div
      style={{
        position: "absolute",
        left: 72,
        right: 72,
        bottom: 360,
        display: "flex",
        flexDirection: "column",
        gap: 26,
        zIndex: 15,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 54, height: 3, background: theme.accent }} />
        <div
          style={{
            fontFamily,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 9,
            textTransform: "uppercase",
            color: theme.accentLight,
            textShadow: "0 2px 14px rgba(0,0,0,0.95)",
          }}
        >
          {kicker}
        </div>
      </div>

      <div
        style={{
          fontFamily: serifFontFamily,
          fontStyle: "italic",
          fontWeight: 900,
          fontSize: 240,
          lineHeight: 0.88,
          color: theme.text,
          textShadow: `0 0 80px ${theme.accent}55, 0 16px 44px rgba(0,0,0,0.9)`,
        }}
      >
        {big}
      </div>

      <div
        style={{
          fontFamily,
          fontSize: 62,
          fontWeight: 900,
          lineHeight: 0.98,
          letterSpacing: -1,
          textTransform: "uppercase",
          color: theme.text,
          textShadow: "0 6px 34px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.85)",
        }}
      >
        {line}
      </div>

      <div
        style={{
          marginTop: 10,
          alignSelf: "flex-start",
          padding: "20px 34px",
          borderRadius: 4,
          background: "rgba(226,102,60,0.18)",
          border: `1px solid ${theme.accent}99`,
          backdropFilter: "blur(10px)",
          fontFamily,
          fontSize: 34,
          fontWeight: 900,
          letterSpacing: 2,
          color: theme.accentLight,
        }}
      >
        {foot}
      </div>
    </div>

    <Credit>{credit}</Credit>
  </AbsoluteFill>
);

export const Story1: React.FC = () => (
  <StoryFrame
    src="aerial.jpg"
    focus="50% 40%"
    scale={1.16}
    kicker="Челябинск"
    big="290"
    line={
      <>
        ЛЕТ ГОРОДУ,
        <br />
        КОТОРЫЙ НАЧАЛСЯ
        <br />
        С <span style={{ color: theme.accent }}>КРЕПОСТИ</span>
      </>
    }
    foot="7 ФАКТОВ — В ЛЕНТЕ"
    credit="фото: Bastiat74 / CC BY-SA 3.0"
  />
);

export const Story2: React.FC = () => (
  <StoryFrame
    src="tankmen.jpg"
    focus="50% 30%"
    scale={1.06}
    kicker="1736 → 2026"
    big="1,17"
    line={
      <>
        МЛН ЖИТЕЛЕЙ —
        <br />
        ВОСЬМОЙ ГОРОД{" "}
        <span style={{ color: theme.accent }}>СТРАНЫ</span>
      </>
    }
    foot="ЛИСТАЙ ПОСТ В ПРОФИЛЕ"
    credit="фото: памятник «Добровольцам-танкистам», Vsatinet / CC0"
  />
);
