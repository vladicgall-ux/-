import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { theme } from "./brand";
import { FlashCut, Grain, Vignette } from "./effects/Atmosphere";
import { fontFamily } from "./fonts";
import { TopProgressBar } from "./overlays/Hud";
import { ShotOverlays } from "./ShotOverlays";
import { ShotVideo } from "./ShotVideo";
import { SHOTS, shotDuration, shotStart, TOTAL_DURATION } from "./timeline";

const FLASH_ON = new Set([
  "hook_wide",
  "intro",
  "question",
  "drill",
  "reveal",
  "outro",
]);

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: theme.deep, fontFamily }}>
      {SHOTS.map((shot, i) => (
        <Sequence
          key={shot.id}
          from={shotStart(i)}
          durationInFrames={shotDuration(shot)}
          layout="none"
        >
          <ShotVideo shot={shot} />
          <ShotOverlays shot={shot} />
          {FLASH_ON.has(shot.id) ? <FlashCut length={6} /> : null}
        </Sequence>
      ))}

      <Vignette strength={0.6} />
      <Grain opacity={0.13} />
      <TopProgressBar progress={frame / TOTAL_DURATION} />
    </AbsoluteFill>
  );
};
