import { AbsoluteFill } from "remotion";
import { claude } from "./claudeBrand";

export const AppBackground: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, #2a2926 0%, ${claude.bg} 45%, #0e0d0c 100%)` }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(217,119,87,0.10) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 900px 700px at 50% 0%, rgba(217,119,87,0.14) 0%, rgba(0,0,0,0) 65%)",
        }}
      />
    </AbsoluteFill>
  );
};
