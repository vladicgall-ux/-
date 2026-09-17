import { AbsoluteFill } from "remotion";
import { ConcreteBackground } from "../Background";
import { ComicArrow, PageDots } from "../ComicArrow";
import { fontFamily } from "../fonts";
import { PillTag } from "../MarkerBadge";

const steps = [
  { n: "1", title: "Формы + бетон", sub: "Минимальный набор оборудования" },
  { n: "2", title: "Заливка и сушка", sub: "Сутки на застывание плитки" },
  { n: "3", title: "Продажа и укладка", sub: "Клиенты сами находят мастеров" },
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
          paddingLeft: 80,
          paddingRight: 80,
        }}
      >
        <PillTag>СХЕМА ЗАРАБОТКА</PillTag>

        <div style={{ marginTop: 50, display: "flex", flexDirection: "column", gap: 26 }}>
          {steps.map((s) => (
            <div
              key={s.n}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 28,
                backgroundColor: "rgba(11,11,11,0.55)",
                border: "2px solid rgba(255,212,0,0.55)",
                borderRadius: 22,
                padding: "24px 34px",
                width: 860,
              }}
            >
              <div
                style={{
                  fontSize: 50,
                  fontWeight: 900,
                  color: "#0b0b0b",
                  backgroundColor: "#ffd400",
                  width: 84,
                  height: 84,
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
                <div style={{ fontSize: 28, fontWeight: 600, color: "#d8d8d8", marginTop: 4 }}>
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
