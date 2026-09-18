import { AbsoluteFill, staticFile } from "remotion";
import { theme } from "./brand";

/**
 * Full-bleed photographic plate with one shared film grade, so five shots
 * from five different sources read as one set: crushed cool shadows, warm
 * highlights kept from the tunnel lamps, grain, vignette and a deep scrim
 * that the typography sits on.
 */
export const CinematicPhoto: React.FC<{
  src: string;
  /** object-position, to keep the subject clear of the type */
  focus?: string;
  scale?: number;
}> = ({ src, focus = "50% 45%", scale = 1.04 }) => (
  <AbsoluteFill style={{ background: "#05070a", overflow: "hidden" }}>
    <img
      src={staticFile(`photos/${src}`)}
      alt=""
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: focus,
        transform: `scale(${scale})`,
        filter: "contrast(1.12) saturate(0.86) brightness(1.02)",
      }}
    />

    {/* split tone: cool in the shadows, amber kept in the lamps */}
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(14,34,58,0.5) 0%, rgba(8,16,28,0.28) 46%, rgba(4,8,14,0.62) 100%)",
        mixBlendMode: "color",
        opacity: 0.7,
      }}
    />
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 720px 520px at 50% 34%, rgba(255,176,32,0.20) 0%, rgba(0,0,0,0) 70%)",
        mixBlendMode: "soft-light",
      }}
    />

    {/* the plate the type sits on */}
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(4,7,11,0.68) 0%, rgba(4,7,11,0.06) 24%, rgba(4,7,11,0.02) 40%, rgba(4,7,11,0.8) 70%, rgba(3,5,9,0.96) 100%)",
      }}
    />

    {/* vignette */}
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(0,0,0,0) 46%, rgba(0,0,0,0.6) 100%)",
      }}
    />

    {/* film grain */}
    <AbsoluteFill
      style={{
        opacity: 0.14,
        mixBlendMode: "overlay",
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        backgroundRepeat: "repeat",
      }}
    />

    {/* hairline, the only chrome that repeats */}
    <div
      style={{
        position: "absolute",
        left: 56,
        right: 56,
        top: 128,
        height: 1,
        background: `linear-gradient(90deg, ${theme.accent}cc, transparent 62%)`,
      }}
    />
  </AbsoluteFill>
);
