import { interpolate, useCurrentFrame } from "remotion";
import { claude, monoFont } from "../claudeBrand";
import { ClaudeMark, WindowChrome } from "./WindowChrome";

const lines = [
  { t: 0, text: "❯ claude code", color: claude.text },
  { t: 12, text: "✻ Пишу код клиенту...", color: claude.accentLight },
  { t: 30, text: "  создаю компоненты", color: claude.muted },
  { t: 44, text: "  запускаю тесты", color: claude.muted },
  { t: 58, text: "✓ Готово за 2 минуты", color: claude.green },
];

const Cursor: React.FC = () => {
  const frame = useCurrentFrame();
  const on = Math.floor(frame / 15) % 2 === 0;
  return (
    <span
      style={{
        display: "inline-block",
        width: 11,
        height: 22,
        backgroundColor: claude.accent,
        marginLeft: 4,
        opacity: on ? 1 : 0,
        verticalAlign: "middle",
      }}
    />
  );
};

export const ClaudeTerminalCard: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <WindowChrome title="claude — code" width={640} height={430}>
      <div
        style={{
          padding: "26px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          fontFamily: monoFont,
          fontSize: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <ClaudeMark size={26} />
        </div>
        {lines.map((l, i) => {
          const opacity = interpolate(frame, [l.t, l.t + 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const isLast = i === lines.length - 1;
          return (
            <div key={i} style={{ color: l.color, opacity, whiteSpace: "pre" }}>
              {l.text}
              {i === 0 && frame < 12 ? <Cursor /> : null}
              {isLast && frame >= l.t + 8 ? " 🚀" : null}
            </div>
          );
        })}
      </div>
    </WindowChrome>
  );
};
