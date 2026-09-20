import { SLOTS, theme, type SlotId } from "./brand";
import { fontFamily, serifFontFamily } from "./fonts";

/** Splits "щука на {жерлицу}" into plain text and gold. */
export const Gold: React.FC<{ text: string; accent?: string }> = ({
  text,
  accent,
}) => {
  if (!accent || !text.includes(accent)) return <>{text}</>;
  const [before, after] = text.split(accent);
  return (
    <>
      {before}
      <span style={{ color: theme.accent }}>{accent}</span>
      {after}
    </>
  );
};

/** Slide index and the slot's own word, set like a film slate. */
export const Slate: React.FC<{
  index: number;
  total: number;
  slot: SlotId;
}> = ({ index, total, slot }) => (
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
      {SLOTS[slot].label}
    </div>
    {/* A single-slide post has nothing to count, so the slate drops the
        numbering rather than reading "01 / 01". */}
    {total > 1 ? (
      <div
        style={{
          fontFamily: serifFontFamily,
          fontStyle: "italic",
          fontWeight: 900,
          fontSize: 34,
          color: "rgba(243,248,248,0.72)",
          textShadow: "0 2px 14px rgba(0,0,0,0.95)",
        }}
      >
        0{index}
        <span style={{ fontSize: 20, opacity: 0.6 }}> / 0{total}</span>
      </div>
    ) : null}
  </div>
);

export const Lower: React.FC<{
  children: React.ReactNode;
  bottom?: number;
}> = ({ children, bottom = 132 }) => (
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

/** Size steps down as the headline grows, so three lines still fit. */
export const Headline: React.FC<{ children: React.ReactNode; text: string }> = ({
  children,
  text,
}) => {
  const size = text.length > 46 ? 62 : text.length > 30 ? 74 : 92;
  return (
    <div
      style={{
        fontFamily,
        fontSize: size,
        fontWeight: 900,
        lineHeight: 0.95,
        letterSpacing: -1.4,
        color: theme.text,
        textTransform: "uppercase",
        textShadow:
          "0 6px 34px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.85), 0 0 60px rgba(240,178,60,0.16)",
      }}
    >
      {children}
    </div>
  );
};

export const Body: React.FC<{ children: React.ReactNode; size?: number }> = ({
  children,
  size = 30,
}) => (
  <div
    style={{
      fontFamily,
      fontSize: size,
      fontWeight: 700,
      lineHeight: 1.32,
      color: "rgba(238,246,247,0.86)",
      maxWidth: 720,
      textShadow: "0 2px 14px rgba(0,0,0,0.95)",
    }}
  >
    {children}
  </div>
);

export const Stat: React.FC<{
  value: string;
  unit?: string;
  label: string;
}> = ({ value, unit, label }) => (
  <div
    style={{
      flex: 1,
      padding: "22px 24px",
      borderRadius: 4,
      background: "rgba(10,26,32,0.7)",
      border: `1px solid ${theme.border}`,
      borderTop: `2px solid ${theme.accent}`,
      backdropFilter: "blur(8px)",
    }}
  >
    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
      <div
        style={{
          fontFamily,
          fontSize: 54,
          fontWeight: 900,
          lineHeight: 1,
          color: theme.text,
        }}
      >
        {value}
      </div>
      {unit ? (
        <div
          style={{ fontFamily, fontSize: 25, fontWeight: 900, color: theme.accent }}
        >
          {unit}
        </div>
      ) : null}
    </div>
    <div
      style={{
        marginTop: 10,
        fontFamily,
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: 3.5,
        textTransform: "uppercase",
        color: theme.muted,
      }}
    >
      {label}
    </div>
  </div>
);

/** A numbered step. The number is the only gold on the line. */
export const Step: React.FC<{ n: number; children: React.ReactNode }> = ({
  n,
  children,
}) => (
  <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
    <div
      style={{
        fontFamily: serifFontFamily,
        fontStyle: "italic",
        fontWeight: 900,
        fontSize: 52,
        lineHeight: 0.9,
        color: theme.accent,
        minWidth: 52,
        textShadow: "0 2px 14px rgba(0,0,0,0.95)",
      }}
    >
      {n}
    </div>
    <div
      style={{
        fontFamily,
        fontSize: 29,
        fontWeight: 700,
        lineHeight: 1.26,
        paddingTop: 6,
        maxWidth: 780,
        color: "rgba(238,246,247,0.9)",
        textShadow: "0 2px 14px rgba(0,0,0,0.95)",
      }}
    >
      {children}
    </div>
  </div>
);

export const Plate: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      marginTop: 4,
      padding: "20px 28px",
      borderRadius: 4,
      background: "rgba(240,178,60,0.16)",
      border: `1px solid ${theme.accent}88`,
      backdropFilter: "blur(10px)",
      fontFamily,
      fontSize: 30,
      fontWeight: 900,
      color: theme.accentLight,
      letterSpacing: 1.5,
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

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
      color: "rgba(159,182,188,0.75)",
    }}
  >
    {children}
  </div>
);

/** Nothing to page through on a single-slide post, so it draws nothing. */
export const PageDots: React.FC<{ total: number; active: number }> = ({
  total,
  active,
}) =>
  total < 2 ? null : (
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
          background: i === active ? theme.accent : "rgba(243,248,248,0.24)",
          boxShadow: i === active ? `0 0 16px ${theme.accent}` : "none",
        }}
      />
    ))}
  </div>
);
