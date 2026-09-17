import { Easing, interpolate, useCurrentFrame } from "remotion";

export const Tilt3D: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();
  const local = frame - delay;

  const entrance = interpolate(local, [0, 20], [0, 1], {
    easing: Easing.out(Easing.back(1.4)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    output: "perceptual-scale",
  });

  const floatY = interpolate(local % 90, [0, 45, 90], [0, -14, 0], {
    easing: Easing.inOut(Easing.sin),
  });

  const rotY = interpolate(local % 150, [0, 75, 150], [-9, 9, -9], {
    easing: Easing.inOut(Easing.sin),
  });

  const rotX = interpolate(local % 110, [0, 55, 110], [6, -4, 6], {
    easing: Easing.inOut(Easing.sin),
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: 1400,
      }}
    >
      <div
        style={{
          transform: `scale(${entrance}) translateY(${floatY}px) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
          transformStyle: "preserve-3d",
          filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.55))",
        }}
      >
        {children}
      </div>
    </div>
  );
};
