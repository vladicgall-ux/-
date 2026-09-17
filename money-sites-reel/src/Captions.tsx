import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { captionsBySegment } from "./captions";
import { claude, uiFont } from "./claudeBrand";
import { fontFamily, serifFontFamily } from "./fonts";
import { SegmentId } from "./timeline";

export const Captions: React.FC<{ segmentId: SegmentId; top: number }> = ({
  segmentId,
  top,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const caps = captionsBySegment[segmentId];
  const idx = caps.findIndex((c) => t >= c.start && t < c.end);
  if (idx === -1) return null;
  const active = caps[idx];

  const localFrame = frame - Math.round(active.start * fps);
  const rotate = idx % 2 === 0 ? -2.2 : 2.2;

  const scale = interpolate(localFrame, [0, 7], [0.55, 1.1], {
    easing: Easing.out(Easing.back(2.4)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    output: "perceptual-scale",
  });
  const settle = interpolate(localFrame, [7, 12], [1.1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    output: "perceptual-scale",
  });
  const liveScale = localFrame < 7 ? scale : settle;

  const shimmer = interpolate(frame % 50, [0, 25, 50], [0.75, 1, 0.75], {
    easing: Easing.inOut(Easing.sin),
  });

  const isAccentWord = active.text.length <= 7;

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 30,
      }}
    >
      <div
        style={{
          position: "relative",
          scale: liveScale,
          rotate: `${rotate}deg`,
        }}
      >
        <div
          style={{
            fontFamily: isAccentWord ? serifFontFamily : fontFamily,
            fontStyle: isAccentWord ? "italic" : "normal",
            fontWeight: 900,
            fontSize: isAccentWord ? 72 : 54,
            textAlign: "center",
            lineHeight: 1.05,
            padding: "16px 40px",
            borderRadius: 18,
            color: claude.gold,
            background:
              "linear-gradient(180deg, rgba(20,18,15,0.92) 0%, rgba(10,9,8,0.92) 100%)",
            border: `2px solid rgba(230,195,116,${0.35 + shimmer * 0.4})`,
            boxShadow: `0 18px 34px rgba(0,0,0,0.55), 0 0 ${
              18 + shimmer * 22
            }px rgba(230,195,116,${0.25 + shimmer * 0.25})`,
            textShadow: `0 0 18px rgba(230,195,116,${0.4 + shimmer * 0.3}), 0 4px 0 rgba(0,0,0,0.4)`,
            maxWidth: 940,
          }}
        >
          {active.text}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: -8,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: 3,
            background: `linear-gradient(90deg, transparent, ${claude.gold}, transparent)`,
            opacity: 0.8,
          }}
        />
      </div>
    </div>
  );
};

export const uiFontFamily = uiFont;
