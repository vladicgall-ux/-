import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { theme } from "./brand";
import { Grain } from "./effects/Atmosphere";
import { FilmBurn, WhipIn } from "./effects/FilmGrade";
import { fontFamily } from "./fonts";
import { TopProgressBar } from "./overlays/Hud";
import { ShotOverlays } from "./ShotOverlays";
import { ShotVideo } from "./ShotVideo";
import { SHOTS, shotDuration, shotStart, TOTAL_DURATION } from "./timeline";

// Design canvas — the composition renders this at 2x for a 4K master.
export const DESIGN_W = 1080;
export const DESIGN_H = 1920;

const BURN_ON = new Set(["hook_drill", "reveal"]);
const WHIP_ON = new Set(["hook_wide", "intro", "question", "drill", "outro"]);

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: theme.deep }}>
      <div
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: "scale(2)",
          transformOrigin: "top left",
          position: "relative",
          overflow: "hidden",
          fontFamily,
        }}
      >
        {SHOTS.map((shot, i) => (
          <Sequence
            key={shot.id}
            from={shotStart(i)}
            durationInFrames={shotDuration(shot)}
            layout="none"
          >
            <ShotVideo shot={shot} />
            <ShotOverlays shot={shot} />
            {BURN_ON.has(shot.id) ? <FilmBurn length={5} /> : null}
            {WHIP_ON.has(shot.id) ? <WhipIn frames={5} /> : null}
          </Sequence>
        ))}

        <Grain opacity={0.1} />
        <TopProgressBar progress={frame / TOTAL_DURATION} />
      </div>
    </AbsoluteFill>
  );
};
