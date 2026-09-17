import { Easing, interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "../fonts";

const blocks = [
  { x: 8, y: 8, w: 84, h: 18, color: "#ffe000" },
  { x: 8, y: 30, w: 40, h: 40, color: "#4fd1ff" },
  { x: 52, y: 30, w: 40, h: 18, color: "#ff5b3d" },
  { x: 52, y: 52, w: 40, h: 18, color: "#31d67a" },
  { x: 8, y: 74, w: 84, h: 14, color: "#ffffff" },
];

export const WebsiteBuilder: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 560,
          height: 380,
          backgroundColor: "#161616",
          border: "4px solid #ffffff",
          borderRadius: 20,
          boxShadow: "10px 12px 0 rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 34,
            backgroundColor: "#0b0b0b",
            display: "flex",
            alignItems: "center",
            gap: 8,
            paddingLeft: 16,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: "#ff5b3d" }} />
          <div style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: "#ffe000" }} />
          <div style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: "#31d67a" }} />
        </div>

        <div style={{ position: "relative", width: "100%", height: 346, padding: "0" }}>
          {blocks.map((b, i) => {
            const start = i * 12;
            const pop = interpolate(frame, [start, start + 16], [0, 1], {
              easing: Easing.out(Easing.back(1.6)),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              output: "perceptual-scale",
            });
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  width: `${b.w}%`,
                  height: `${b.h}%`,
                  backgroundColor: b.color,
                  borderRadius: 8,
                  scale: pop,
                  transformOrigin: "center",
                }}
              />
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 28,
          bottom: 26,
          fontFamily,
          fontSize: 34,
          fontWeight: 900,
          color: "#ffffff",
          opacity: interpolate(frame, [55, 68], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        САЙТЫ ЛЮБОЙ СЛОЖНОСТИ 💻
      </div>
    </div>
  );
};
