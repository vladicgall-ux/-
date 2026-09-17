import { fontFamily } from "./fonts";

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
        backgroundColor: inverted ? "#0b0b0b" : "#ffd400",
        padding: "6px 30px",
        borderRadius: 10,
        transform: `rotate(${rotate}deg)`,
        lineHeight: 1.1,
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
        fontSize: 32,
        fontWeight: 800,
        color: "#ffd400",
        backgroundColor: "rgba(11,11,11,0.7)",
        border: "2px solid #ffd400",
        borderRadius: 999,
        padding: "10px 30px",
        letterSpacing: 2,
      }}
    >
      {children}
    </div>
  );
};
