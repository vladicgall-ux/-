import { AbsoluteFill } from "remotion";
import { ConcreteBackground } from "../Background";
import { ComicArrow, PageDots } from "../ComicArrow";
import { fontFamily } from "../fonts";
import { PillTag } from "../MarkerBadge";

const points = [
  { icon: "🧱", text: "Плитка нужна всем: дворы, дорожки, парковки", accent: "#ffe000" },
  { icon: "🏗️", text: "Стройка и ремонт не останавливаются", accent: "#ff4d33" },
  { icon: "💰", text: "Наценка на готовое изделие — до 300%", accent: "#31d67a" },
];

export const Slide2: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily }}>
      <ConcreteBackground />
      <PageDots total={4} active={1} />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 70,
          paddingRight: 70,
        }}
      >
        <div style={{ transform: "rotate(-2deg)" }}>
          <PillTag>ПОЧЕМУ ЭТО РАБОТАЕТ</PillTag>
        </div>

        <div style={{ marginTop: 54, display: "flex", flexDirection: "column", gap: 30 }}>
          {points.map((p, i) => (
            <div
              key={p.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 28,
                backgroundColor: "#161616",
                border: "4px solid #0b0b0b",
                borderLeft: `12px solid ${p.accent}`,
                borderRadius: 18,
                padding: "28px 36px",
                width: 810,
                boxShadow: "8px 10px 0 rgba(0,0,0,0.65)",
                transform: `rotate(${i % 2 === 0 ? -0.6 : 0.6}deg)`,
              }}
            >
              <div
                style={{
                  fontSize: 50,
                  width: 92,
                  height: 92,
                  borderRadius: 999,
                  backgroundColor: p.accent,
                  border: "4px solid #0b0b0b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {p.icon}
              </div>
              <div style={{ fontSize: 40, fontWeight: 900, color: "#ffffff", lineHeight: 1.2 }}>
                {p.text}
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>

      <ComicArrow />
    </AbsoluteFill>
  );
};
