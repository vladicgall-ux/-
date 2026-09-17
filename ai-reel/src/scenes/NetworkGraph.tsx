import { Easing, interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "../fonts";

const nodes = [
  { x: 18, y: 30, r: 10, color: "#ffe000" },
  { x: 32, y: 62, r: 7, color: "#4fd1ff" },
  { x: 50, y: 20, r: 13, color: "#ff5b3d" },
  { x: 50, y: 50, r: 9, color: "#ffe000" },
  { x: 68, y: 68, r: 8, color: "#4fd1ff" },
  { x: 82, y: 34, r: 11, color: "#31d67a" },
  { x: 66, y: 22, r: 6, color: "#ffe000" },
  { x: 36, y: 40, r: 6, color: "#ff5b3d" },
];

const edges: [number, number][] = [
  [0, 3],
  [1, 3],
  [2, 3],
  [3, 4],
  [3, 5],
  [4, 5],
  [2, 6],
  [1, 7],
  [7, 3],
];

export const NetworkGraph: React.FC = () => {
  const frame = useCurrentFrame();

  const draw = interpolate(frame, [0, 30], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {edges.map(([a, b], i) => {
          const na = nodes[a];
          const nb = nodes[b];
          const segDraw = interpolate(draw, [i * 0.06, i * 0.06 + 0.3], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <line
              key={i}
              x1={na.x}
              y1={na.y}
              x2={na.x + (nb.x - na.x) * segDraw}
              y2={na.y + (nb.y - na.y) * segDraw}
              stroke="rgba(255,255,255,0.55)"
              strokeWidth={0.5}
            />
          );
        })}
        {nodes.map((n, i) => {
          const pop = interpolate(frame, [i * 3, i * 3 + 12], [0, 1], {
            easing: Easing.out(Easing.back(2)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const pulse = interpolate(
            frame % 60,
            [0, 30, 60],
            [1, 1.25, 1],
            { easing: Easing.inOut(Easing.sin) },
          );
          return (
            <circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={n.r * 0.16 * pop * pulse}
              fill={n.color}
              opacity={0.95}
            />
          );
        })}
      </svg>

      <div
        style={{
          position: "absolute",
          left: 28,
          bottom: 26,
          fontFamily,
          fontSize: 34,
          fontWeight: 900,
          color: "#ffffff",
          letterSpacing: 1,
          opacity: interpolate(frame, [10, 24], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        НЕЙРОСЕТИ 🧠
      </div>
    </div>
  );
};
