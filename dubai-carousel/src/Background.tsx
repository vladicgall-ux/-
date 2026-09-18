import { AbsoluteFill } from "remotion";
import { theme } from "./brand";

export const GoldBackground: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #201d17 0%, ${theme.bg} 45%, #0a0908 100%)`,
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

export const PhotoBackground: React.FC<{ src: string }> = ({ src }) => {
  return (
    <AbsoluteFill>
      <img
        src={src}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(10,9,8,0.75) 0%, rgba(10,9,8,0.15) 32%, rgba(10,9,8,0.2) 60%, rgba(10,9,8,0.88) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 900px 900px at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
