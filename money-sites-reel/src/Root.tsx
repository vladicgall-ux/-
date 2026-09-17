import { Composition } from "remotion";
import "./index.css";
import { Main } from "./Main";
import { TOTAL_DURATION } from "./timeline";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MoneySitesReel"
        component={Main}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
