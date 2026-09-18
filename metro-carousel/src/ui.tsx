import { staticFile } from "remotion";
import { theme } from "./brand";
import { fontFamily, serifFontFamily } from "./fonts";

/** Slide counter as a station-board strip. */
export const PageDots: React.FC<{ total: number; active: number }> = ({
  total,
  active,
}) => (
  <div
    style={{
      position: "absolute",
      left: 56,
      bottom: 62,
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
          width: i === active ? 44 : 14,
          height: 6,
          borderRadius: 3,
          background: i === active ? theme.accent : "rgba(242,246,250,0.26)",
          boxShadow: i === active ? `0 0 14px ${theme.accent}` : "none",
        }}
      />
    ))}
  </div>
);

/** Wide-tracked label on a dark plate. */
export const PillTag: React.FC<{
  children: React.ReactNode;
  tone?: "accent" | "danger";
}> = ({ children, tone = "accent" }) => {
  const color = tone === "danger" ? theme.danger : theme.accent;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        padding: "12px 24px",
        borderRadius: 4,
        background: "rgba(8,10,13,0.78)",
        border: `1px solid ${color}55`,
        fontFamily,
        fontSize: 26,
        fontWeight: 700,
        letterSpacing: 7,
        color,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      <div style={{ width: 28, height: 2, background: color }} />
      {children}
      <div style={{ width: 28, height: 2, background: color }} />
    </div>
  );
};

/** The headline: heavy, extruded, one accent word. */
export const HookTitle: React.FC<{
  children: React.ReactNode;
  size?: number;
  align?: "left" | "center";
}> = ({ children, size = 104, align = "left" }) => (
  <div
    style={{
      fontFamily,
      fontSize: size,
      fontWeight: 900,
      lineHeight: 0.94,
      letterSpacing: -1,
      color: theme.text,
      textTransform: "uppercase",
      textAlign: align,
      textShadow:
        "0 3px 0 rgba(6,10,14,0.95), 0 7px 0 rgba(5,8,12,0.8), 0 12px 0 rgba(4,6,10,0.6), 0 22px 46px rgba(0,0,0,0.9)",
    }}
  >
    {children}
  </div>
);

export const Accent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <span style={{ color: theme.accent }}>{children}</span>;

export const SubText: React.FC<{
  children: React.ReactNode;
  size?: number;
}> = ({ children, size = 34 }) => (
  <div
    style={{
      fontFamily,
      fontSize: size,
      fontWeight: 700,
      lineHeight: 1.34,
      color: theme.muted,
      letterSpacing: 0.2,
    }}
  >
    {children}
  </div>
);

/** The one number that carries a slide. */
export const BigNumber: React.FC<{
  value: string;
  unit?: string;
}> = ({ value, unit }) => (
  <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 10 }}>
    <div
      style={{
        fontFamily: serifFontFamily,
        fontStyle: "italic",
        fontWeight: 900,
        fontSize: 204,
        lineHeight: 1.0,
        color: theme.text,
        textShadow: `0 0 60px ${theme.accent}55, 0 18px 40px rgba(0,0,0,0.85)`,
      }}
    >
      {value}
    </div>
    {unit ? (
      <div
        style={{
          fontFamily,
          fontSize: 54,
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

/**
 * Photo band. Every picture gets the same duotone treatment, which is what
 * keeps five different shots looking like one set. Renders a labelled
 * placeholder until the file is dropped into public/photos/.
 */
export const PhotoBand: React.FC<{
  src?: string;
  height?: number;
  caption?: string;
}> = ({ src, height = 430, caption }) => (
  <div
    style={{
      position: "relative",
      width: "100%",
      height,
      borderRadius: 6,
      overflow: "hidden",
      border: `1px solid ${theme.border}`,
      boxShadow: "0 30px 70px rgba(0,0,0,0.6)",
      background: theme.panel,
    }}
  >
    {src ? (
      <>
        <img
          src={staticFile(`photos/${src}`)}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(1) contrast(1.12) brightness(0.92)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(150deg, ${theme.accent}40 0%, #0b0d10cc 78%)`,
            mixBlendMode: "color",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 46%, rgba(6,8,11,0.86) 100%)",
          }}
        />
      </>
    ) : (
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "repeating-linear-gradient(135deg, #14181e 0px, #14181e 22px, #191f27 22px, #191f27 44px)",
          fontFamily,
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: 6,
          color: theme.border,
        }}
      >
        ФОТО
      </div>
    )}
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 4,
        background: `linear-gradient(90deg, ${theme.accent}, transparent)`,
      }}
    />
    {caption ? (
      <div
        style={{
          position: "absolute",
          left: 22,
          bottom: 20,
          fontFamily,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 4,
          color: theme.accentLight,
          textShadow: "0 2px 12px rgba(0,0,0,0.9)",
        }}
      >
        {caption}
      </div>
    ) : null}
  </div>
);

/** Station row for the line diagram. */
export const StationRow: React.FC<{
  index: number;
  name: string;
  last?: boolean;
}> = ({ index, name, last }) => (
  <div style={{ display: "flex", gap: 24, alignItems: "stretch" }}>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 34,
      }}
    >
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          border: `5px solid ${theme.accent}`,
          background: theme.bg,
          boxShadow: `0 0 18px ${theme.accent}99`,
        }}
      />
      {last ? null : (
        <div style={{ flex: 1, width: 5, background: `${theme.accent}66` }} />
      )}
    </div>
    <div style={{ paddingBottom: last ? 0 : 26 }}>
      <div
        style={{
          fontFamily,
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: 5,
          color: theme.muted,
        }}
      >
        0{index}
      </div>
      <div
        style={{
          fontFamily,
          fontSize: 44,
          fontWeight: 900,
          color: theme.text,
          lineHeight: 1.06,
        }}
      >
        {name}
      </div>
    </div>
  </div>
);

export const Frame: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      padding: "76px 56px 128px",
      display: "flex",
      flexDirection: "column",
      gap: 30,
      zIndex: 10,
    }}
  >
    {children}
  </div>
);
