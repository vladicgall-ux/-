import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../brand";

export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.14 }) => (
  <svg
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      opacity,
      mixBlendMode: "overlay",
      pointerEvents: "none",
    }}
  >
    <filter id="iceGrain">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.9"
        numOctaves="2"
        stitchTiles="stitch"
      />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#iceGrain)" />
  </svg>
);

export const Vignette: React.FC<{ strength?: number }> = ({
  strength = 0.62,
}) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse 72% 62% at 50% 48%, rgba(0,0,0,0) 40%, rgba(0,0,0,${strength}) 100%)`,
      pointerEvents: "none",
    }}
  />
);

// Deterministic pseudo-random so every render is identical.
const rand = (i: number, salt: number) => {
  const v = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return v - Math.floor(v);
};

const ParticleLayer: React.FC<{
  count: number;
  size: number;
  speed: number;
  blur: number;
  opacity: number;
  salt: number;
}> = ({ count, size, speed, blur, opacity, salt }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ filter: `blur(${blur}px)`, pointerEvents: "none" }}>
      {Array.from({ length: count }).map((_, i) => {
        const baseX = rand(i, salt) * 1180 - 50;
        const baseY = rand(i, salt + 7) * 2100 - 90;
        const drift = Math.sin((frame / 90) * (0.6 + rand(i, salt + 3))) * 46;
        const y = (baseY + frame * speed) % 2100;
        const s = size * (0.45 + rand(i, salt + 11));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: baseX + drift,
              top: y - 90,
              width: s,
              height: s,
              borderRadius: 999,
              backgroundColor: theme.frost,
              opacity: opacity * (0.4 + rand(i, salt + 5) * 0.6),
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const IceParticles: React.FC<{ intensity?: number }> = ({
  intensity = 1,
}) => (
  <>
    <ParticleLayer
      count={26}
      size={5}
      speed={0.42}
      blur={2}
      opacity={0.35 * intensity}
      salt={1}
    />
    <ParticleLayer
      count={16}
      size={10}
      speed={0.85}
      blur={5}
      opacity={0.3 * intensity}
      salt={2}
    />
    <ParticleLayer
      count={8}
      size={20}
      speed={1.5}
      blur={11}
      opacity={0.22 * intensity}
      salt={3}
    />
  </>
);

// White ice-flash used to punctuate a hard cut.
export const FlashCut: React.FC<{ length?: number }> = ({ length = 7 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 2, length], [0.85, 0.42, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (frame > length) return null;
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.frost,
        opacity,
        mixBlendMode: "screen",
        pointerEvents: "none",
      }}
    />
  );
};

// Perspective grid that sweeps toward the horizon — adds depth under stats.
export const Grid3D: React.FC<{ opacity?: number }> = ({ opacity = 0.32 }) => {
  const frame = useCurrentFrame();
  const shift = (frame * 1.4) % 120;
  return (
    <AbsoluteFill
      style={{
        perspective: 700,
        perspectiveOrigin: "50% 0%",
        pointerEvents: "none",
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: -260,
          left: -400,
          width: 1880,
          height: 900,
          transform: "rotateX(72deg)",
          transformOrigin: "50% 100%",
          backgroundImage: `linear-gradient(${theme.ice} 1.5px, transparent 1.5px), linear-gradient(90deg, ${theme.ice} 1.5px, transparent 1.5px)`,
          backgroundSize: "120px 120px",
          backgroundPosition: `0px ${shift}px`,
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 55%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 55%, rgba(0,0,0,0) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
