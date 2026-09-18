import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { fontFamily } from "../fonts";
import { CinematicPhoto } from "../Photo";
import { Accent, Eyebrow, Headline, Lower, PageDots, Slate } from "../ui";

const STATIONS = [
  "Комсомольская площадь",
  "Площадь Революции",
  "Торговый центр",
  "Проспект Победы",
];

export const Slide3: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <CinematicPhoto src="station-box.webp" focus="50% 40%" scale={1.06} />
    <Slate index={3} total={5} label="первая линия" />
    <Lower>
      <Eyebrow>станции</Eyebrow>
      <Headline size={104}>
        ВСЕГО <Accent>ЧЕТЫРЕ</Accent>
      </Headline>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {STATIONS.map((name, i) => (
          <div
            key={name}
            style={{ display: "flex", alignItems: "center", gap: 16 }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                border: `4px solid ${theme.accent}`,
                boxShadow: `0 0 14px ${theme.accent}`,
              }}
            />
            <div
              style={{
                fontFamily,
                fontSize: 36,
                fontWeight: 900,
                color: theme.text,
                textShadow: "0 2px 14px rgba(0,0,0,0.95)",
              }}
            >
              {name}
            </div>
          </div>
        ))}
      </div>
    </Lower>
    <PageDots total={5} active={2} />
    <SwipeArrow />
  </AbsoluteFill>
);
