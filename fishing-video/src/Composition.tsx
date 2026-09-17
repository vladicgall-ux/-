import { Composition } from "remotion";
import { FishingVideo } from "./FishingVideo";

export const MyComposition = () => {
  return (
    <Composition
      id="FishingHook"
      component={FishingVideo}
      durationInFrames={900}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
