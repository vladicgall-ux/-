import { theme } from "./brand";
import { fontFamily, serifFontFamily } from "./fonts";

/** Slide counter as a row of paving marks. */
export const PageDots: React.FC<{ total: number; active: number }> = ({
  total,
  active,
}) => (
  <div
    style={{
      position: "absolute",
      left: 56,
      bottom: 74,
      display: "flex",
      alignItems: "center",
      gap: 10,
      zIndex: 20,
    }}
  >
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        style={{
          width: i === active ? 44 : 12,
          height: 6,
          borderRadius: 3,
          background: i === active ? theme.accent : "rgba(247,242,236,0.24)",
          boxShadow: i === active ? `0 0 16px ${theme.accent}` : "none",
        }}
      />
    ))}
  </div>
);

/** Slide index, set like a film slate. */
export const Slate: React.FC<{
  index: number;
  total: number;
  label: string;
}> = ({ index, total, label }) => (
  <div
    style={{
      position: "absolute",
      top: 58,
      left: 56,
      right: 56,
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      zIndex: 20,
    }}
  >
    <div
      style={{
        fontFamily,
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: 10,
        color: theme.accent,
        textTransform: "uppercase",
        textShadow: "0 2px 14px rgba(0,0,0,0.95)",
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontFamily: serifFontFamily,
        fontStyle: "italic",
        fontWeight: 900,
        fontSize: 34,
        color: "rgba(247,242,236,0.72)",
        textShadow: "0 2px 14px rgba(0,0,0,0.95)",
      }}
    >
      0{index}
      <span style={{ fontSize: 20, opacity: 0.6 }}> / 0{total}</span>
    </div>
  </div>
);

/** Bottom-anchored editorial block. */
export const Lower: React.FC<{
  children: React.ReactNode;
  bottom?: number;
}> = ({ children, bottom = 138 }) => (
  <div
    style={{
      position: "absolute",
      left: 56,
      right: 56,
      bottom,
      display: "flex",
      flexDirection: "column",
      gap: 18,
      zIndex: 15,
    }}
  >
    {children}
  </div>
);

export const Eyebrow: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
    <div style={{ width: 46, height: 2, background: theme.accent }} />
    <div
      style={{
        fontFamily,
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: 8,
        color: theme.accentLight,
        textTransform: "uppercase",
        textShadow: "0 2px 14px rgba(0,0,0,0.95)",
      }}
    >
      {children}
    </div>
  </div>
);

export const Headline: React.FC<{
  children: React.ReactNode;
  size?: number;
}> = ({ children, size = 98 }) => (
  <div
    style={{
      fontFamily,
      fontSize: size,
      fontWeight: 900,
      lineHeight: 0.95,
      letterSpacing: -1.5,
      color: theme.text,
      textTransform: "uppercase",
      textShadow:
        "0 6px 34px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.85), 0 0 60px rgba(226,102,60,0.18)",
    }}
  >
    {children}
  </div>
);

export const Accent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <span style={{ color: theme.accent }}>{children}</span>;

export const Body: React.FC<{
  children: React.ReactNode;
  size?: number;
}> = ({ children, size = 31 }) => (
  <div
    style={{
      fontFamily,
      fontSize: size,
      fontWeight: 700,
      lineHeight: 1.32,
      color: "rgba(244,236,228,0.86)",
      maxWidth: 700,
      textShadow: "0 2px 14px rgba(0,0,0,0.95)",
    }}
  >
    {children}
  </div>
);

/** The one number that carries a slide. */
export const BigNumber: React.FC<{
  value: string;
  unit?: string;
  size?: number;
}> = ({ value, unit, size = 186 }) => (
  <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
    <div
      style={{
        fontFamily: serifFontFamily,
        fontStyle: "italic",
        fontWeight: 900,
        fontSize: size,
        lineHeight: 1.0,
        color: theme.text,
        textShadow: `0 0 70px ${theme.accent}55, 0 14px 40px rgba(0,0,0,0.9)`,
      }}
    >
      {value}
    </div>
    {unit ? (
      <div
        style={{
          fontFamily,
          fontSize: 52,
          fontWeight: 900,
          color: theme.accent,
          letterSpacing: 2,
        }}
      >
        {unit}
      </div>
    ) : null}
  </div>
);

/** A labelled figure in a row of figures. */
export const Stat: React.FC<{
  value: string;
  unit?: string;
  label: string;
}> = ({ value, unit, label }) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      padding: "22px 24px",
      borderRadius: 4,
      background: "rgba(16,12,10,0.68)",
      border: `1px solid ${theme.border}`,
      borderTop: `2px solid ${theme.accent}`,
      backdropFilter: "blur(8px)",
    }}
  >
    <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
      <div
        style={{
          fontFamily,
          fontSize: 58,
          fontWeight: 900,
          lineHeight: 1,
          color: theme.text,
        }}
      >
        {value}
      </div>
      {unit ? (
        <div
          style={{
            fontFamily,
            fontSize: 26,
            fontWeight: 900,
            color: theme.accent,
          }}
        >
          {unit}
        </div>
      ) : null}
    </div>
    <div
      style={{
        marginTop: 10,
        fontFamily,
        fontSize: 19,
        fontWeight: 700,
        letterSpacing: 4,
        textTransform: "uppercase",
        color: theme.muted,
      }}
    >
      {label}
    </div>
  </div>
);

/** Hot plate for the closing call to action. */
export const HotPlate: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      marginTop: 4,
      padding: "20px 28px",
      borderRadius: 4,
      background: "rgba(226,102,60,0.16)",
      border: `1px solid ${theme.accent}88`,
      backdropFilter: "blur(10px)",
      fontFamily,
      fontSize: 31,
      fontWeight: 900,
      color: theme.accentLight,
      letterSpacing: 2,
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

/** Source credit, small, so the numbers are checkable. */
export const Source: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      fontFamily,
      fontSize: 17,
      fontWeight: 700,
      letterSpacing: 3,
      textTransform: "uppercase",
      color: "rgba(178,160,148,0.75)",
    }}
  >
    {children}
  </div>
);
