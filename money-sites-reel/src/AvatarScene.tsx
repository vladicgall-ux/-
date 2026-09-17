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
              fontSize: 24,
              fontWeight: 800,
              color: claude.gold,
              backgroundColor: "rgba(10,9,8,0.75)",
              border: `1.5px solid ${claude.gold}`,
              borderRadius: 999,
              padding: "9px 28px",
              letterSpacing: 2,
              boxShadow: "0 0 20px rgba(230,195,116,0.25)",
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
            borderRadius: 44,
            padding: 4,
            background: `linear-gradient(135deg, ${claude.gold} 0%, ${claude.goldDeep} 45%, ${claude.gold} 100%)`,
            boxShadow: "0 30px 70px rgba(0,0,0,0.65), 0 0 40px rgba(230,195,116,0.18)",
            scale: entrance,
            transform: `scale(${slowZoom})`,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 40,
              overflow: "hidden",
            }}
          >
            <Video
              src={staticFile(`video/${segmentId}.mp4`)}
              objectFit="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </AbsoluteFill>

      {ctaBadgeFrom !== undefined ? (
        <AbsoluteFill style={{ top: 1620, alignItems: "center" }}>
          <div
            style={{
              fontFamily,
              fontSize: 44,
              fontWeight: 900,
              color: "#171410",
              background: `linear-gradient(135deg, ${claude.accentLight} 0%, ${claude.gold} 50%, ${claude.goldDeep} 100%)`,
              padding: "14px 44px",
              borderRadius: 999,
              boxShadow:
                "0 14px 30px rgba(0,0,0,0.55), 0 0 32px rgba(230,195,116,0.4)",
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
