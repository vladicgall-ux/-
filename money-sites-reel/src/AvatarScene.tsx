import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { AppBackground } from "./Background";
import { Captions } from "./Captions";
import { claude } from "./claudeBrand";
import { fontFamily } from "./fonts";
import { SegmentId } from "./timeline";

export const AvatarScene: React.FC<{
  segmentId: SegmentId;
  tag?: string;
  ctaBadgeFrom?: number;
}> = ({ segmentId, tag, ctaBadgeFrom }) => {
  const frame = useCurrentFrame();

  const entrance = interpolate(frame, [0, 14], [0.82, 1], {
    easing: Easing.out(Easing.back(1.6)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    output: "perceptual-scale",
  });

  const slowZoom = interpolate(frame, [0, 400], [1, 1.06], {
    extrapolateRight: "clamp",
  });

  const cardSize = 860;

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <AppBackground />

      {tag ? (
        <AbsoluteFill style={{ top: 46, alignItems: "center" }}>
          <div
            style={{
              fontFamily,
              fontSize: 26,
              fontWeight: 800,
              color: claude.accentLight,
              backgroundColor: "rgba(11,11,11,0.7)",
              border: `2px solid ${claude.accent}`,
              borderRadius: 999,
              padding: "8px 26px",
              letterSpacing: 1,
            }}
          >
            {tag}
          </div>
        </AbsoluteFill>
      ) : null}

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: cardSize,
            height: cardSize,
            borderRadius: 40,
            overflow: "hidden",
            border: `3px solid ${claude.border}`,
            boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
            scale: entrance,
            transform: `scale(${slowZoom})`,
          }}
        >
          <Video
            src={staticFile(`video/${segmentId}.mp4`)}
            objectFit="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </AbsoluteFill>

      {ctaBadgeFrom !== undefined ? (
        <AbsoluteFill style={{ top: 1620, alignItems: "center" }}>
          <div
            style={{
              fontFamily,
              fontSize: 44,
              fontWeight: 900,
              color: "#0b0b0b",
              backgroundColor: claude.accentLight,
              padding: "14px 40px",
              borderRadius: 999,
              border: "4px solid #0b0b0b",
              boxShadow: "8px 10px 0 rgba(0,0,0,0.6)",
              scale: interpolate(
                frame,
                [ctaBadgeFrom, ctaBadgeFrom + 12],
                [0, 1],
                {
                  easing: Easing.out(Easing.back(2)),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  output: "perceptual-scale",
                },
              ),
            }}
          >
            ПИШИ 🔥
          </div>
        </AbsoluteFill>
      ) : null}

      <Captions segmentId={segmentId} top={1520} />
    </AbsoluteFill>
  );
};
