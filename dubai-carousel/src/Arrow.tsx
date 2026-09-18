import { theme } from "./brand";
import { fontFamily } from "./fonts";

export const SwipeArrow: React.FC<{ label?: string }> = ({
  label = "ЛИСТАЙ",
}) => {
  return (
    <div
      style={{
        position: "absolute",
        right: 56,
        bottom: 56,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        zIndex: 20,
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize: 24,
          fontWeight: 800,
          color: theme.gold,
          letterSpacing: 2,
          textShadow: "0 0 14px rgba(230,195,116,0.6)",
        }}
      >
        {label}
      </div>
      <svg width="118" height="96" viewBox="0 0 118 96" fill="none">
        <defs>
          <linearGradient id="arrowGold" x1="0" y1="0" x2="118" y2="96">
            <stop offset="0%" stopColor={theme.accentLight} />
            <stop offset="55%" stopColor={theme.gold} />
            <stop offset="100%" stopColor={theme.goldDeep} />
          </linearGradient>
        </defs>
        <path
          d="M10 16 C 14 56, 48 80, 96 74"
          stroke="url(#arrowGold)"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M74 56 L 104 76 L 76 90"
          stroke="url(#arrowGold)"
          strokeWidth="7"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};
