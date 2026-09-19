import { AbsoluteFill, staticFile } from "remotion";
import { theme } from "./brand";
import { fontFamily } from "./fonts";

/**
 * One grade for every plate. Two of these photographs are black and white
 * and from the 1900s, the rest were shot last summer; pulling the colour
 * most of the way out and pushing a warm brick tone back in is what makes
 * them read as one set instead of a folder.
 */
export const CityPhoto: React.FC<{
  src: string;
  focus?: string;
  scale?: number;
  /** archive plates take more grain and a heavier warm cast */
  archive?: boolean;
}> = ({ src, focus = "50% 40%", scale = 1.05, archive = false }) => (
  <AbsoluteFill style={{ background: theme.bg, overflow: "hidden" }}>
    <img
      src={staticFile(`photos/${src}`)}
      alt=""
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: focus,
        transform: `scale(${scale})`,
        filter: archive
          ? "grayscale(1) contrast(1.16) brightness(1.02)"
          : "saturate(0.42) contrast(1.14) brightness(1.0)",
      }}
    />

    {/* warm brick cast, the one thing every plate shares */}
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, rgba(226,102,60,${archive ? 0.5 : 0.34}) 0%, rgba(140,51,18,0.2) 48%, rgba(12,10,9,0.5) 100%)`,
        mixBlendMode: "color",
      }}
    />
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 760px 540px at 52% 30%, rgba(255,180,137,0.22) 0%, rgba(0,0,0,0) 70%)",
        mixBlendMode: "soft-light",
      }}
    />

    {/* the plate the type sits on */}
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(10,8,7,0.7) 0%, rgba(10,8,7,0.08) 22%, rgba(10,8,7,0.06) 38%, rgba(10,8,7,0.82) 68%, rgba(6,5,4,0.97) 100%)",
      }}
    />
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(0,0,0,0) 44%, rgba(0,0,0,0.62) 100%)",
      }}
    />

    {/* film grain */}
    <AbsoluteFill
      style={{
        opacity: archive ? 0.26 : 0.14,
        mixBlendMode: "overlay",
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        backgroundRepeat: "repeat",
      }}
    />

    {/* hairline under the slate — the only chrome that repeats */}
    <div
      style={{
        position: "absolute",
        left: 56,
        right: 56,
        top: 124,
        height: 1,
        background: `linear-gradient(90deg, ${theme.accent}cc, transparent 62%)`,
      }}
    />
  </AbsoluteFill>
);

/** Photo credit, small but present — these are CC BY-SA plates. */
export const Credit: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      position: "absolute",
      left: 56,
      bottom: 26,
      fontFamily,
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: 1.6,
      color: "rgba(247,242,236,0.42)",
      textShadow: "0 2px 10px rgba(0,0,0,0.95)",
      zIndex: 24,
    }}
  >
    {children}
  </div>
);
