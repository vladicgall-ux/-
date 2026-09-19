import { AbsoluteFill, staticFile } from "remotion";
import { theme } from "./brand";
import { fontFamily } from "./fonts";
import type { Photo } from "./post";

/**
 * What a slide without a photograph gets instead of empty water: the trace
 * an echo sounder draws — surface, thermocline, a shoal of returns and the
 * bottom profile. Deterministic, so the same slide renders identically
 * every time.
 */
const Sonar: React.FC = () => {
  let seed = 74074;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const marks = Array.from({ length: 46 }).map(() => ({
    x: 120 + rnd() * 840,
    y: 250 + rnd() * 240,
    r: 2 + rnd() * 5,
    o: 0.2 + rnd() * 0.55,
  }));
  // bottom profile: one gentle slope with a rise in the middle
  const bottom =
    "M 0 600 C 150 590, 260 546, 380 556 C 470 564, 520 500, 620 496 C 740 492, 820 560, 920 572 C 990 580, 1040 586, 1080 582";

  return (
    <svg
      viewBox="0 0 1080 1080"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      {/* surface and depth grid */}
      {[196, 268, 340, 412, 484].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="1080"
          y2={y}
          stroke={theme.water}
          strokeWidth="1.5"
          strokeDasharray="3 16"
          opacity="0.3"
        />
      ))}
      <line x1="0" y1="176" x2="1080" y2="176" stroke={theme.accent} strokeWidth="2" opacity="0.5" />

      {/* the shoal */}
      {marks.map((m, i) => (
        <ellipse key={i} cx={m.x} cy={m.y} rx={m.r * 1.6} ry={m.r} fill={theme.accent} opacity={m.o} />
      ))}

      {/* bottom */}
      <path d={bottom} stroke={theme.water} strokeWidth="3" fill="none" opacity="0.75" />
      <path d={`${bottom} L 1080 1080 L 0 1080 Z`} fill={theme.water} opacity="0.1" />
    </svg>
  );
};

/**
 * One grade over every photograph in the feed. A lake at dawn, a fish on a
 * board and a pan of fried perch come from three different cameras; pulling
 * the colour down and pushing the same cold water and warm sun back in is
 * what makes a week of posts look like one account.
 *
 * With no photograph it falls back to painted water, so a slide can still
 * be built on a day when nothing suitable is free to use.
 */
export const Plate: React.FC<{ photo: Photo }> = ({ photo }) => (
  <AbsoluteFill style={{ background: theme.bg, overflow: "hidden" }}>
    {photo.src ? (
      <img
        src={staticFile(`photos/${photo.src}`)}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: photo.focus ?? "50% 42%",
          transform: `scale(${photo.scale ?? 1.06})`,
          filter: "saturate(0.5) contrast(1.12) brightness(0.98)",
        }}
      />
    ) : (
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 900px 700px at 60% 22%, ${theme.panelLight} 0%, ${theme.deep} 52%, ${theme.bg} 100%)`,
        }}
      >
        <Sonar />
      </AbsoluteFill>
    )}

    {/* cold water in the shadows */}
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(175deg, rgba(61,140,150,0.34) 0%, rgba(10,26,32,0.42) 56%, rgba(5,13,16,0.6) 100%)",
        mixBlendMode: "color",
      }}
    />
    {/* low sun on the water */}
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 780px 520px at 62% 26%, rgba(240,178,60,0.26) 0%, rgba(0,0,0,0) 68%)",
        mixBlendMode: "soft-light",
      }}
    />

    {/* the plate the type sits on: art above the waist, words below */}
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(4,10,13,0.72) 0%, rgba(4,10,13,0.1) 20%, rgba(4,10,13,0.08) 36%, rgba(4,10,13,0.84) 66%, rgba(3,7,9,0.98) 100%)",
      }}
    />
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(0,0,0,0) 44%, rgba(0,0,0,0.6) 100%)",
      }}
    />

    <AbsoluteFill
      style={{
        opacity: photo.grainy ? 0.22 : 0.12,
        mixBlendMode: "overlay",
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        backgroundRepeat: "repeat",
      }}
    />

    {/* hairline under the slate */}
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

    {photo.credit ? (
      <div
        style={{
          position: "absolute",
          left: 56,
          bottom: 26,
          fontFamily,
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: 1.6,
          color: "rgba(243,248,248,0.42)",
          textShadow: "0 2px 10px rgba(0,0,0,0.95)",
          zIndex: 24,
        }}
      >
        {photo.credit}
      </div>
    ) : null}
  </AbsoluteFill>
);
