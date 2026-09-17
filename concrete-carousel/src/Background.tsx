import { AbsoluteFill } from "remotion";

export const ConcreteBackground: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(155deg, #4a4d52 0%, #3a3d42 38%, #2c2e32 75%, #221f1c 100%)",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 1.5px, transparent 1.5px)",
          backgroundSize: "26px 26px",
          opacity: 0.7,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(115deg, transparent 0%, transparent 46%, rgba(255,212,0,0.10) 48%, rgba(255,212,0,0.10) 52%, transparent 54%, transparent 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 15% 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
