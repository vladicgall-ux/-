import { AbsoluteFill } from "remotion";
import { theme } from "./brand";

/**
 * Deterministic star field. A fixed seed keeps every slide's sky identical
 * where it needs to be, and Remotion stills stay reproducible.
 */
const stars = (() => {
  let s = 20130215;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  return Array.from({ length: 150 }).map(() => ({
    x: rnd() * 100,
    y: rnd() * 72,
    r: 0.6 + rnd() * 1.9,
    o: 0.12 + rnd() * 0.6,
  }));
})();

/**
 * The shared backdrop: a winter sky before sunrise, with the horizon glow
 * of a city that has not woken up yet.
 */
export const Sky: React.FC<{ glow?: number }> = ({ glow = 1 }) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(178deg, #060a16 0%, ${theme.sky} 46%, #05080f 78%, #020409 100%)`,
    }}
  >
    <svg
      viewBox="0 0 1080 1080"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      {stars.map((st, i) => (
        <circle
          key={i}
          cx={(st.x / 100) * 1080}
          cy={(st.y / 100) * 1080}
          r={st.r}
          fill="#dce9ff"
          opacity={st.o}
        />
      ))}
    </svg>

    {/* the fireball's own light, spilling in from the upper right */}
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 820px 560px at 76% 12%, rgba(255,143,46,${0.26 * glow}) 0%, rgba(255,143,46,0) 64%)`,
      }}
    />
    {/* cold city haze at the horizon */}
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(0deg, rgba(79,127,191,0.16) 0%, rgba(79,127,191,0) 34%)",
      }}
    />
    {/* snow grain */}
    <AbsoluteFill
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        opacity: 0.8,
      }}
    />
    {/* vignette */}
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 760px 760px at 50% 44%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.72) 100%)",
      }}
    />
    {/* the one repeating graphic: a hot rule across the top of every slide */}
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: 8,
        background: `linear-gradient(90deg, ${theme.deep} 0%, ${theme.accent} 38%, ${theme.hot} 62%, ${theme.accent} 82%, rgba(255,143,46,0) 100%)`,
      }}
    />
  </AbsoluteFill>
);
