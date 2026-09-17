import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontFamily } from "../fonts";

export const RevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1, 1.16], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const counted = Math.round(
    interpolate(frame, [10, 65], [0, 120], {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <Img
          src={staticFile("hero.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          paddingTop: 140,
        }}
      >
        <Interactive.Div
          name="Counter number"
          style={{
            fontSize: 210,
            fontWeight: 900,
            color: "#ffd400",
            textShadow: "0 10px 36px rgba(0,0,0,0.7)",
            scale: interpolate(frame, [10, 20], [0.7, 1], {
              easing: Easing.spring({ damping: 10 }),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              output: "perceptual-scale",
            }),
          }}
        >
          {counted}
        </Interactive.Div>

        <Interactive.Div
          name="Fish in 4 hours label"
          style={{
            marginTop: -10,
            fontSize: 64,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: 2,
            textShadow: "0 6px 20px rgba(0,0,0,0.6)",
            opacity: interpolate(frame, [55, 75], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          РЫБ ЗА 4 ЧАСА
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 130,
        }}
      >
        <Interactive.Div
          name="Location badge"
          style={{
            backgroundColor: "rgba(11,11,11,0.75)",
            color: "#ffffff",
            fontSize: 40,
            fontWeight: 700,
            padding: "14px 34px",
            borderRadius: 999,
            border: "2px solid #ffd400",
            opacity: interpolate(frame, [95, 115], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [95, 115], ["0px 30px", "0px 0px"], {
              easing: Easing.out(Easing.cubic),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              output: "perceptual-scale",
            }),
          }}
        >
          📍 БОЛЬШОЙ КРЕМЕНКУЛЬ
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
