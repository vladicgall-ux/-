import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { AbsoluteFill } from "remotion";
import { CtaScene } from "./scenes/CtaScene";
import { DoubtScene } from "./scenes/DoubtScene";
import { HookScene } from "./scenes/HookScene";
import { ProofScene } from "./scenes/ProofScene";
import { RevealScene } from "./scenes/RevealScene";

export const FishingVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a1a2b" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={110} premountFor={15}>
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 15 })}
        />
        <TransitionSeries.Sequence durationInFrames={170} premountFor={15}>
          <DoubtScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: 15 })}
        />
        <TransitionSeries.Sequence durationInFrames={280} premountFor={15}>
          <RevealScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 15 })}
        />
        <TransitionSeries.Sequence durationInFrames={220} premountFor={15}>
          <ProofScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: 15 })}
        />
        <TransitionSeries.Sequence durationInFrames={180} premountFor={15}>
          <CtaScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
