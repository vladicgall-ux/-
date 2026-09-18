import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { MetroBackground } from "../Background";
import { theme } from "../brand";
import { Accent, Frame, HookTitle, PageDots, PillTag, StationRow } from "../ui";

const STATIONS = [
  "Комсомольская площадь",
  "Площадь Революции",
  "Торговый центр",
  "Проспект Победы",
];

export const Slide3: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <MetroBackground />
    <Frame>
      <div>
        <PillTag>первая линия</PillTag>
      </div>
      <HookTitle size={104}>
        ВСЕГО <Accent>4</Accent>
        <br />
        СТАНЦИИ
      </HookTitle>
      <div style={{ marginTop: 8 }}>
        {STATIONS.map((name, i) => (
          <StationRow
            key={name}
            index={i + 1}
            name={name}
            last={i === STATIONS.length - 1}
          />
        ))}
      </div>
    </Frame>
    <PageDots total={5} active={2} />
    <SwipeArrow />
  </AbsoluteFill>
);
