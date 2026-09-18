import { Composition } from "remotion";
import "./index.css";
import { DESIGN_H, DESIGN_W, Main } from "./Main";
import { FPS, TOTAL_DURATION } from "./timeline";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="IceReel"
        component={Main}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={DESIGN_W * 2}
        height={DESIGN_H * 2}
      />
    </>
  );
};
