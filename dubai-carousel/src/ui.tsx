import { theme, uiFont } from "./brand";
import { fontFamily, serifFontFamily } from "./fonts";

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
        zIndex: 20,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === active ? 34 : 14,
            height: 14,
            borderRadius: 999,
            backgroundColor:
              i === active ? theme.gold : "rgba(255,255,255,0.32)",
            boxShadow: i === active ? "0 0 10px rgba(230,195,116,0.6)" : "none",
          }}
        />
      ))}
    </div>
  );
};

export const PillTag: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      fontFamily,
      fontSize: 26,
      fontWeight: 800,
      color: theme.gold,
      backgroundColor: "rgba(10,9,8,0.65)",
      border: `1.5px solid ${theme.gold}`,
      borderRadius: 999,
      padding: "10px 30px",
      letterSpacing: 2,
      boxShadow: "0 0 20px rgba(230,195,116,0.22)",
    }}
  >
    {children}
  </div>
);

export const HookTitle: React.FC<{
  children: React.ReactNode;
  fontSize?: number;
}> = ({ children, fontSize = 74 }) => (
  <div
    style={{
      fontFamily: serifFontFamily,
      fontStyle: "italic",
      fontWeight: 900,
      fontSize,
      color: "#ffffff",
      textAlign: "center",
      lineHeight: 1.08,
      textShadow:
        "0 0 26px rgba(230,195,116,0.35), 0 6px 18px rgba(0,0,0,0.6)",
    }}
  >
    {children}
  </div>
);

export const SubText: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      fontFamily: uiFont,
      fontSize: 32,
      fontWeight: 600,
      color: theme.accentLight,
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

export const GoldCard: React.FC<{
  children: React.ReactNode;
  width?: number;
}> = ({ children, width = 900 }) => (
  <div
    style={{
      width,
      backgroundColor: theme.panel,
      border: `1px solid rgba(230,195,116,0.35)`,
      boxShadow: "0 0 30px rgba(230,195,116,0.12), 0 30px 60px rgba(0,0,0,0.5)",
      borderRadius: 28,
      padding: "40px 44px",
    }}
  >
    {children}
  </div>
);

export const IconBadge: React.FC<{ icon: string; size?: number }> = ({
  icon,
  size = 96,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: 999,
      background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldDeep} 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.52,
      boxShadow: "0 12px 26px rgba(0,0,0,0.5), 0 0 30px rgba(230,195,116,0.3)",
    }}
  >
    {icon}
  </div>
);
