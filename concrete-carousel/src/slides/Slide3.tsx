import { AbsoluteFill } from "remotion";
import { ConcreteBackground } from "../Background";
import { ComicArrow, PageDots } from "../ComicArrow";
import { fontFamily } from "../fonts";
import { PillTag } from "../MarkerBadge";

const steps = [
  { n: "1", title: "Формы + бетон", sub: "Минимальный набор оборудования", accent: "#ffe000" },
  { n: "2", title: "Заливка и сушка", sub: "Сутки на застывание плитки", accent: "#ff4d33" },
  { n: "3", title: "Продажа и укладка", sub: "Клиенты сами находят мастеров", accent: "#31d67a" },
];

export const Slide3: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily }}>
      <ConcreteBackground />
      <PageDots total={4} active={2} />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 70,
          paddingRight: 70,
        }}
      >
        <div style={{ transform: "rotate(-2deg)" }}>
          <PillTag>СХЕМА ЗАРАБОТКА</PillTag>
        </div>

        <div style={{ marginTop: 54, display: "flex", flexDirection: "column", gap: 30 }}>
          {steps.map((s, i) => (
            <div
              key={s.n}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                backgroundColor: "#161616",
                border: "4px solid #0b0b0b",
                borderRadius: 18,
                padding: "26px 36px",
                width: 810,
                boxShadow: "8px 10px 0 rgba(0,0,0,0.65)",
                transform: `rotate(${i % 2 === 0 ? -0.6 : 0.6}deg)`,
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  fontFamily,
                  color: "#0b0b0b",
                  backgroundColor: s.accent,
                  border: "4px solid #0b0b0b",
                  width: 92,
                  height: 92,
                  borderRadius: 999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {s.n}
              </div>
              <div>
                <div style={{ fontSize: 42, fontWeight: 900, color: "#ffffff" }}>
                  {s.title}
                </div>
                <div style={{ fontSize: 26, fontWeight: 600, color: "#bdbdbd", marginTop: 6 }}>
                  {s.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>

      <ComicArrow />
    </AbsoluteFill>
  );
};
