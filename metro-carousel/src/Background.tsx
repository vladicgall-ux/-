import { AbsoluteFill } from "remotion";
import { theme } from "./brand";

/** Tunnel wall: cold concrete lit by a single warm service lamp overhead. */
export const MetroBackground: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(168deg, #171c23 0%, ${theme.bg} 52%, #06080a 100%)`,
      }}
    >
      {/* tunnel rings receding into the dark */}
      <AbsoluteFill
        style={{
          background:
            "repeating-linear-gradient(180deg, rgba(255,176,32,0.05) 0px, rgba(255,176,32,0.05) 2px, transparent 2px, transparent 86px)",
          maskImage:
            "radial-gradient(ellipse 760px 620px at 50% 12%, #000 0%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 760px 620px at 50% 12%, #000 0%, transparent 72%)",
        }}
      />
      {/* concrete speckle */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      {/* service lamp */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 900px 620px at 50% -4%, rgba(255,176,32,0.20) 0%, rgba(0,0,0,0) 66%)",
        }}
      />
      {/* floor falloff */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 54%, rgba(0,0,0,0.62) 100%)",
        }}
      />
      {/* hazard stripe, the one graphic that repeats on every slide */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 10,
          background:
            "repeating-linear-gradient(115deg, #ffb020 0px, #ffb020 26px, #0b0d10 26px, #0b0d10 52px)",
          opacity: 0.9,
        }}
      />
    </AbsoluteFill>
  );
};
