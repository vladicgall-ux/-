import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const SunsetBackground: React.FC<{ intense?: boolean }> = ({
  intense,
}) => {
  const frame = useCurrentFrame();

  const glow = interpolate(frame % 90, [0, 45, 90], [0.55, 0.85, 0.55]);

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, #0a1a2b 0%, #133650 32%, #3d5a45 62%, #8a6a2a 82%, #e8a13a 100%)",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 105%, rgba(255,190,90,${
            intense ? glow + 0.15 : glow
          }) 0%, rgba(255,190,90,0) 55%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 30%)",
        }}
      />
    </AbsoluteFill>
  );
};
