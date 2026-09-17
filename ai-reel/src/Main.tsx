import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Captions } from "./Captions";
import { fontFamily } from "./fonts";
import { TopZone } from "./TopZone";

const TOP_HEIGHT = 850;

export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1, 1.1], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0b0d", fontFamily }}>
      <TopZone height={TOP_HEIGHT} />

      <AbsoluteFill style={{ top: TOP_HEIGHT, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            width: 1080,
            height: 1440,
            top: -300,
            left: 0,
            transform: `scale(${zoom})`,
            transformOrigin: "center 65%",
          }}
        >
          <Video
            src={staticFile("video/talk.mp4")}
            objectFit="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 14%)",
          }}
        />
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          top: TOP_HEIGHT - 3,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: "#ffe000",
        }}
      />

      <Captions top={TOP_HEIGHT - 44} />

      <div
        style={{
          position: "absolute",
          top: 46,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 26,
            fontWeight: 800,
            color: "#ffe000",
            backgroundColor: "rgba(11,11,11,0.7)",
            border: "2px solid #ffe000",
            borderRadius: 999,
            padding: "8px 26px",
            letterSpacing: 1,
          }}
        >
          ЗАРАБОТОК НА ИИ 🤖
        </div>
      </div>
    </AbsoluteFill>
  );
};
