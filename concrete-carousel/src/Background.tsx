import { AbsoluteFill } from "remotion";
import { Grain } from "./Grain";

export const ConcreteBackground: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(160deg, #55585d 0%, #35373b 30%, #1c1d20 68%, #0e0e10 100%)",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.07) 1.6px, transparent 1.6px)",
          backgroundSize: "24px 24px",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(115deg, transparent 0%, transparent 42%, rgba(255,199,0,0.22) 47%, rgba(255,199,0,0.22) 50%, transparent 55%, transparent 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 900px 700px at 12% -6%, rgba(255,199,0,0.16) 0%, rgba(0,0,0,0) 60%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <Grain opacity={0.16} />
    </AbsoluteFill>
  );
};

export const HookBackground: React.FC = () => {
  const stripe =
    "repeating-linear-gradient(45deg, #ffcc00 0px, #ffcc00 70px, #151515 70px, #151515 140px)";
  return (
    <AbsoluteFill style={{ background: "#111" }}>
      <AbsoluteFill style={{ background: stripe, opacity: 0.9 }} />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 1100px 1100px at 50% 38%, rgba(230,30,20,0.94) 0%, rgba(150,10,10,0.96) 46%, rgba(15,15,15,0.98) 78%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 700px 700px at 50% 30%, rgba(255,140,0,0.55) 0%, rgba(255,140,0,0) 70%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 26%, rgba(0,0,0,0) 78%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      <Grain opacity={0.14} />
    </AbsoluteFill>
  );
};
