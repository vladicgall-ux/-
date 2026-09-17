import { fontFamily } from "./fonts";

export const ComicArrow: React.FC<{ label?: string }> = ({
  label = "ЛИСТАЙ",
}) => {
  return (
    <div
      style={{
        position: "absolute",
        right: 56,
        bottom: 64,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize: 26,
          fontWeight: 900,
          color: "#ffe000",
          letterSpacing: 1,
          WebkitTextStroke: "2px #0b0b0b",
        }}
      >
        {label}
      </div>
      <svg width="140" height="112" viewBox="0 0 150 120" fill="none">
        <path
          d="M14 20 C 18 70, 60 96, 118 90"
          stroke="#0b0b0b"
          strokeWidth="19"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M14 20 C 18 70, 60 96, 118 90"
          stroke="#ffe000"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M92 68 L 128 92 L 96 108"
          stroke="#0b0b0b"
          strokeWidth="19"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M92 68 L 128 92 L 96 108"
          stroke="#ffe000"
          strokeWidth="9"
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
        top: 50,
        right: 50,
        display: "flex",
        gap: 12,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === active ? 36 : 16,
            height: 16,
            borderRadius: 999,
            backgroundColor: i === active ? "#ffe000" : "rgba(255,255,255,0.4)",
            border: i === active ? "2px solid #0b0b0b" : "none",
          }}
        />
      ))}
    </div>
  );
};
