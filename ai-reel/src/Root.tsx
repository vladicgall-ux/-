import { Composition } from "remotion";
import "./index.css";
import { Main } from "./Main";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AiReel"
        component={Main}
        durationInFrames={803}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
