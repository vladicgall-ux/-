import { fontFamily } from "./fonts";

export const ComicArrow: React.FC<{ label?: string }> = ({
  label = "ЛИСТАЙ",
}) => {
  return (
    <div
      style={{
        position: "absolute",
        right: 60,
        bottom: 70,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize: 30,
          fontWeight: 900,
          color: "#ffd400",
          letterSpacing: 2,
          textShadow: "0 3px 0 #0b0b0b",
        }}
      >
        {label}
      </div>
      <svg width="150" height="120" viewBox="0 0 150 120" fill="none">
        <path
          d="M14 20 C 18 70, 60 96, 118 90"
          stroke="#0b0b0b"
          strokeWidth="15"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M14 20 C 18 70, 60 96, 118 90"
          stroke="#ffd400"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M92 68 L 128 92 L 96 108"
          stroke="#0b0b0b"
          strokeWidth="15"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M92 68 L 128 92 L 96 108"
          stroke="#ffd400"
          strokeWidth="7"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

export const PageDots: React.FC<{ total: number; active: number }> = ({
  total,
  active,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 56,
        right: 56,
        display: "flex",
        gap: 12,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === active ? 34 : 16,
            height: 16,
            borderRadius: 999,
            backgroundColor: i === active ? "#ffd400" : "rgba(255,255,255,0.35)",
          }}
        />
      ))}
    </div>
  );
};
