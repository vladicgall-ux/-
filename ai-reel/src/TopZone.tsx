import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { claude } from "./claudeBrand";
import { ClaudeBuilderCard } from "./scenes/ClaudeBuilderCard";
import { ClaudeChatCard } from "./scenes/ClaudeChatCard";
import { ClaudePricingCard } from "./scenes/ClaudePricingCard";
import { ClaudeTerminalCard } from "./scenes/ClaudeTerminalCard";
import { Tilt3D } from "./Tilt3D";

const FadeWrap: React.FC<{ duration: number; children: React.ReactNode }> = ({
  duration,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 8, duration - 8, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return <div style={{ width: "100%", height: "100%", opacity }}>{children}</div>;
};

export const TopZone: React.FC<{ height: number }> = ({ height }) => {
  return (
    <AbsoluteFill style={{ height }}>
      <AbsoluteFill
        style={{
          background: `linear-gradient(160deg, ${claude.bg} 0%, #0e0d0c 100%)`,
        }}
      >
        <AbsoluteFill
          style={{
            backgroundImage:
              "radial-gradient(rgba(217,119,87,0.10) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse 900px 500px at 50% 0%, rgba(217,119,87,0.16) 0%, rgba(0,0,0,0) 65%)",
          }}
        />
      </AbsoluteFill>

      <Sequence from={0} durationInFrames={201} layout="none">
        <FadeWrap duration={201}>
          <Tilt3D>
            <ClaudeTerminalCard />
          </Tilt3D>
        </FadeWrap>
      </Sequence>
      <Sequence from={201} durationInFrames={297} layout="none">
        <FadeWrap duration={297}>
          <Tilt3D>
            <ClaudeChatCard />
          </Tilt3D>
        </FadeWrap>
      </Sequence>
      <Sequence from={498} durationInFrames={207} layout="none">
        <FadeWrap duration={207}>
          <Tilt3D>
            <ClaudeBuilderCard />
          </Tilt3D>
        </FadeWrap>
      </Sequence>
      <Sequence from={705} durationInFrames={98} layout="none">
        <FadeWrap duration={98}>
          <Tilt3D>
            <ClaudePricingCard />
          </Tilt3D>
        </FadeWrap>
      </Sequence>
    </AbsoluteFill>
  );
};
