import { theme } from "./brand";
import { fontFamily } from "./fonts";

/** Hand-drawn swipe cue — the one repeated mark across the set. */
export const SwipeArrow: React.FC<{ label?: string }> = ({
  label = "ЛИСТАЙ",
}) => (
  <div
    style={{
      position: "absolute",
      right: 52,
      bottom: 48,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
      zIndex: 20,
    }}
  >
    <div
      style={{
        fontFamily,
        fontSize: 26,
        fontWeight: 900,
        color: theme.accent,
        letterSpacing: 4,
        textShadow: `0 0 18px ${theme.accent}aa`,
      }}
    >
      {label}
    </div>
    <svg width="124" height="100" viewBox="0 0 124 100" fill="none">
      <defs>
        <linearGradient id="arrHot" x1="0" y1="0" x2="124" y2="100">
          <stop offset="0%" stopColor={theme.hot} />
          <stop offset="55%" stopColor={theme.accent} />
          <stop offset="100%" stopColor={theme.deep} />
        </linearGradient>
      </defs>
      <path
        d="M12 18 C 16 60, 52 84, 102 76"
        stroke="url(#arrHot)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M78 56 L 110 78 L 80 93"
        stroke="url(#arrHot)"
        strokeWidth="8"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  </div>
);

/** Arrow pointing up at the bio link on the closing slide. */
export const UpArrow: React.FC<{ label?: string }> = ({
  label = "ССЫЛКА ТУТ",
}) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      top: 40,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
      zIndex: 25,
    }}
  >
    <svg width="120" height="104" viewBox="0 0 120 104" fill="none">
      <defs>
        <linearGradient id="arrUp" x1="0" y1="104" x2="120" y2="0">
          <stop offset="0%" stopColor={theme.deep} />
          <stop offset="45%" stopColor={theme.accent} />
          <stop offset="100%" stopColor={theme.hot} />
        </linearGradient>
      </defs>
      <path
        d="M60 98 C 50 62, 54 34, 60 12"
        stroke="url(#arrUp)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M38 34 L 60 8 L 84 32"
        stroke="url(#arrUp)"
        strokeWidth="8"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
    <div
      style={{
        fontFamily,
        fontSize: 26,
        fontWeight: 900,
        color: theme.accent,
        letterSpacing: 4,
        textShadow: `0 0 18px ${theme.accent}aa`,
      }}
    >
      {label}
    </div>
  </div>
);
