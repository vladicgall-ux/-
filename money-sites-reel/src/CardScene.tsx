import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { AppBackground } from "./Background";
import { Captions } from "./Captions";
import { fontFamily } from "./fonts";
import { SegmentId } from "./timeline";

export const CardScene: React.FC<{
  segmentId: SegmentId;
  zoom: number;
  children: React.ReactNode;
}> = ({ segmentId, zoom, children }) => {
  const frame = useCurrentFrame();

  const reveal = interpolate(frame, [0, 18], [0.08, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    output: "perceptual-scale",
  });

  const flip = interpolate(frame, [0, 18], [78, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const idleRotY = interpolate(frame % 140, [0, 70, 140], [-3, 3, -3], {
    easing: Easing.inOut(Easing.sin),
  });
  const idleFloat = interpolate(frame % 100, [0, 50, 100], [0, -10, 0], {
    easing: Easing.inOut(Easing.sin),
  });

  const settledRotY = frame < 18 ? -flip : idleRotY;

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <AppBackground />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          perspective: 1600,
        }}
      >
        <div
          style={{
            transform: `scale(${zoom * reveal}) translateY(${idleFloat}px) rotateY(${settledRotY}deg)`,
            transformStyle: "preserve-3d",
            filter: "drop-shadow(0 40px 50px rgba(0,0,0,0.6))",
          }}
        >
          {children}
        </div>
      </AbsoluteFill>

      <Captions segmentId={segmentId} top={1560} />
    </AbsoluteFill>
  );
};
