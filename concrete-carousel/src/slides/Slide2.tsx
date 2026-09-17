import { AbsoluteFill } from "remotion";
import { ConcreteBackground } from "../Background";
import { ComicArrow, PageDots } from "../ComicArrow";
import { fontFamily } from "../fonts";
import { PillTag } from "../MarkerBadge";

const points = [
  { icon: "🧱", text: "Плитка нужна всем: дворы, дорожки, парковки" },
  { icon: "🏗️", text: "Стройка и ремонт не останавливаются" },
  { icon: "💰", text: "Наценка на готовое изделие — до 300%" },
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
          paddingLeft: 80,
          paddingRight: 80,
        }}
      >
        <PillTag>ПОЧЕМУ ЭТО РАБОТАЕТ</PillTag>

        <div style={{ marginTop: 50, display: "flex", flexDirection: "column", gap: 26 }}>
          {points.map((p) => (
            <div
              key={p.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 26,
                backgroundColor: "rgba(11,11,11,0.55)",
                border: "2px solid rgba(255,212,0,0.55)",
                borderRadius: 22,
                padding: "26px 34px",
                width: 860,
              }}
            >
              <div style={{ fontSize: 58 }}>{p.icon}</div>
              <div style={{ fontSize: 40, fontWeight: 800, color: "#ffffff", lineHeight: 1.2 }}>
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
