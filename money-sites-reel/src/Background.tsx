import { AbsoluteFill } from "remotion";
import { claude } from "./claudeBrand";

export const AppBackground: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #201d17 0%, ${claude.bg} 45%, #0a0908 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(115deg, transparent 0%, transparent 44%, rgba(230,195,116,0.07) 49%, rgba(230,195,116,0.07) 51%, transparent 56%, transparent 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(230,195,116,0.10) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 950px 700px at 50% 0%, rgba(230,195,116,0.16) 0%, rgba(0,0,0,0) 65%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
