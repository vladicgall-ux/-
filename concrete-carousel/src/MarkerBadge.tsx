import { fontFamily } from "./fonts";

const strokeShadow = (color: string, width: number) => {
  const steps = 16;
  const shadows: string[] = [];
  for (let i = 0; i < steps; i++) {
    const angle = (Math.PI * 2 * i) / steps;
    const x = Math.cos(angle) * width;
    const y = Math.sin(angle) * width;
    shadows.push(`${x.toFixed(2)}px ${y.toFixed(2)}px 0 ${color}`);
  }
  return shadows.join(", ");
};

export const MarkerBadge: React.FC<{
  children: React.ReactNode;
  fontSize?: number;
  rotate?: number;
  inverted?: boolean;
}> = ({ children, fontSize = 90, rotate = -2, inverted = false }) => {
  return (
    <div
      style={{
        display: "inline-block",
        fontFamily,
        fontSize,
        fontWeight: 900,
        color: inverted ? "#ffffff" : "#0b0b0b",
        backgroundColor: inverted ? "#0b0b0b" : "#ffe000",
        padding: "10px 38px",
        borderRadius: 12,
        transform: `rotate(${rotate}deg)`,
        lineHeight: 1.05,
        border: "5px solid #0b0b0b",
        boxShadow: "10px 12px 0 rgba(0,0,0,0.85)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
};

export const PunchText: React.FC<{
  children: React.ReactNode;
  fontSize?: number;
  color?: string;
}> = ({ children, fontSize = 78, color = "#ffffff" }) => {
  return (
    <div
      style={{
        fontFamily,
        fontSize,
        fontWeight: 900,
        color,
        textAlign: "center",
        lineHeight: 1.06,
        textShadow: `${strokeShadow("#0b0b0b", 4)}, 0 14px 26px rgba(0,0,0,0.55)`,
      }}
    >
      {children}
    </div>
  );
};

export const PillTag: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      style={{
        fontFamily,
        fontSize: 30,
        fontWeight: 700,
        color: "#151515",
        backgroundColor: "#ffe000",
        border: "3px solid #0b0b0b",
        borderRadius: 999,
        padding: "12px 32px",
        letterSpacing: 1,
        boxShadow: "5px 6px 0 rgba(0,0,0,0.85)",
      }}
    >
      {children}
    </div>
  );
};
