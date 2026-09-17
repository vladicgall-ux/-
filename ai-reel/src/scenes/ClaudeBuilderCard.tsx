import { Easing, interpolate, useCurrentFrame } from "remotion";
import { claude, monoFont } from "../claudeBrand";
import { WindowChrome } from "./WindowChrome";

const codeLines = [
  "export const Hero = () => (",
  "  <Section>",
  "    <Title>Ваш сайт</Title>",
  "    <Button>Заказать</Button>",
  "  </Section>",
  ");",
];

const blocks = [
  { x: 6, y: 6, w: 88, h: 22, color: claude.accent },
  { x: 6, y: 32, w: 40, h: 26, color: "#4fd1ff" },
  { x: 50, y: 32, w: 44, h: 26, color: claude.green },
  { x: 6, y: 62, w: 88, h: 32, color: claude.panelLight },
];

export const ClaudeBuilderCard: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <WindowChrome title="index.tsx — Claude Code" width={680} height={420}>
      <div style={{ display: "flex", height: "100%" }}>
        <div
          style={{
            width: "42%",
            padding: "20px 18px",
            fontFamily: monoFont,
            fontSize: 16,
            color: claude.text,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            borderRight: `1px solid ${claude.border}`,
          }}
        >
          {codeLines.map((l, i) => {
            const opacity = interpolate(frame, [i * 8, i * 8 + 10], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div key={i} style={{ opacity, color: i === 2 || i === 3 ? claude.accentLight : claude.text }}>
                {l}
              </div>
            );
          })}
        </div>
        <div style={{ width: "58%", padding: 18, position: "relative" }}>
          {blocks.map((b, i) => {
            const start = 30 + i * 10;
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
                }}
              />
            );
          })}
        </div>
      </div>
    </WindowChrome>
  );
};
