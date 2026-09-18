import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { theme } from "./brand";
import { FilmGrade } from "./effects/FilmGrade";
import { FPS, Shot, shotDuration } from "./timeline";

const GRADES: Record<string, string> = {
  cold: "contrast(1.14) saturate(1.06) brightness(1.03)",
  punch: "contrast(1.24) saturate(1.16) brightness(1.0)",
  teaser: "contrast(1.34) saturate(0.92) brightness(0.93)",
};

const useKenBurns = (shot: Shot) => {
  const frame = useCurrentFrame();
  const dur = shotDuration(shot);
  const scale = interpolate(frame, [0, dur], shot.zoom, {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(frame, [0, dur], shot.panX ?? [0, 0], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [0, dur], shot.panY ?? [0, 0], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Handheld breathing so locked-off crops still feel operated.
  const floatX = Math.sin(frame / 37) * 5 + Math.sin(frame / 11) * 1.6;
  const floatY = Math.cos(frame / 43) * 6 + Math.cos(frame / 13) * 1.4;
  return { scale, x: x + floatX, y: y + floatY };
};

const RawVideo: React.FC<{
  shot: Shot;
  blur?: number;
  muted?: boolean;
}> = ({ shot, blur, muted }) => (
  <Video
    src={staticFile("video/source_ai.mp4")}
    trimBefore={Math.round(shot.srcIn * FPS)}
    trimAfter={Math.round(shot.srcOut * FPS)}
    playbackRate={shot.speed}
    volume={muted ? 0 : (shot.volume ?? 1)}
    objectFit="cover"
    style={{
      width: "100%",
      height: "100%",
      filter: blur
        ? `${GRADES[shot.grade ?? "cold"]} blur(${blur}px) brightness(0.5)`
        : GRADES[shot.grade ?? "cold"],
    }}
  />
);

export const ShotVideo: React.FC<{ shot: Shot }> = ({ shot }) => {
  const frame = useCurrentFrame();
  const { scale, x, y } = useKenBurns(shot);

  if (shot.treatment === "card3d") {
    const rotY = interpolate(frame % 110, [0, 55, 110], [-13, 13, -13], {
      easing: Easing.inOut(Easing.sin),
    });
    const rotX = interpolate(frame % 85, [0, 42, 85], [7, -5, 7], {
      easing: Easing.inOut(Easing.sin),
    });
    const entry = interpolate(frame, [0, 11], [0.72, 1], {
      easing: Easing.out(Easing.back(1.5)),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      output: "perceptual-scale",
    });

    return (
      <AbsoluteFill style={{ backgroundColor: theme.deep }}>
        <AbsoluteFill>
          <RawVideo shot={shot} blur={34} muted />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            perspective: 1500,
          }}
        >
          <div
            style={{
              width: 830,
              height: 1160,
              transform: `scale(${entry * scale}) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
              transformStyle: "preserve-3d",
              borderRadius: 40,
              padding: 4,
              background: `linear-gradient(135deg, ${theme.ice} 0%, ${theme.iceDeep} 40%, ${theme.gold} 100%)`,
              boxShadow:
                "0 50px 90px rgba(0,0,0,0.75), 0 0 60px rgba(159,220,255,0.22)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 36,
                overflow: "hidden",
              }}
            >
              <RawVideo shot={shot} />
            </div>
          </div>
        </AbsoluteFill>
        <FilmGrade />
      </AbsoluteFill>
    );
  }

  if (shot.treatment === "split") {
    return (
      <AbsoluteFill style={{ backgroundColor: theme.deep }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1080,
            height: 1240,
            overflow: "hidden",
          }}
        >
          <AbsoluteFill
            style={{ transform: `scale(${scale}) translate(${x}px, ${y}px)` }}
          >
            <RawVideo shot={shot} />
          </AbsoluteFill>
          <AbsoluteFill
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 58%, rgba(5,9,14,0.96) 100%)",
            }}
          />
        </div>
        <FilmGrade />
      </AbsoluteFill>
    );
  }

  if (shot.treatment === "frame") {
    const inset = interpolate(frame, [0, 9], [0, 34], {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return (
      <AbsoluteFill style={{ backgroundColor: theme.deep }}>
        <AbsoluteFill
          style={{ transform: `scale(${scale}) translate(${x}px, ${y}px)` }}
        >
          <RawVideo shot={shot} />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            border: `${inset}px solid ${theme.deep}`,
            boxSizing: "border-box",
          }}
        />
        <AbsoluteFill
          style={{
            border: `2px solid rgba(159,220,255,${interpolate(
              frame,
              [5, 15],
              [0, 0.5],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            )})`,
            margin: inset,
            boxSizing: "border-box",
          }}
        />
        <FilmGrade />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: theme.deep }}>
      <AbsoluteFill
        style={{ transform: `scale(${scale}) translate(${x}px, ${y}px)` }}
      >
        <RawVideo shot={shot} />
      </AbsoluteFill>
      <FilmGrade />
    </AbsoluteFill>
  );
};
