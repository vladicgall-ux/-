import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { MoneyCounter } from "./scenes/MoneyCounter";
import { NetworkGraph } from "./scenes/NetworkGraph";
import { OrderFlow } from "./scenes/OrderFlow";
import { WebsiteBuilder } from "./scenes/WebsiteBuilder";

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
          background: "linear-gradient(160deg, #1c1d20 0%, #0b0b0d 100%)",
        }}
      >
        <AbsoluteFill
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </AbsoluteFill>

      <Sequence from={0} durationInFrames={201} layout="none">
        <FadeWrap duration={201}>
          <NetworkGraph />
        </FadeWrap>
      </Sequence>
      <Sequence from={201} durationInFrames={297} layout="none">
        <FadeWrap duration={297}>
          <OrderFlow />
        </FadeWrap>
      </Sequence>
      <Sequence from={498} durationInFrames={207} layout="none">
        <FadeWrap duration={207}>
          <WebsiteBuilder />
        </FadeWrap>
      </Sequence>
      <Sequence from={705} durationInFrames={98} layout="none">
        <FadeWrap duration={98}>
          <MoneyCounter />
        </FadeWrap>
      </Sequence>
    </AbsoluteFill>
  );
};
