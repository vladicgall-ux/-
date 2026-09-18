import { Composition } from "remotion";
import "./index.css";
import { Main } from "./Main";
import { FPS, TOTAL_DURATION } from "./timeline";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="IceReel"
        component={Main}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
