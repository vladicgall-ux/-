import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "../fonts";
import { SunsetBackground } from "./Background";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <SunsetBackground />

      <Interactive.Div
        name="Fishing hook icon"
        style={{
          position: "absolute",
          top: 140,
          right: 90,
          fontSize: 110,
          opacity: interpolate(frame, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          rotate: interpolate(frame, [0, 110], ["-8deg", "10deg"], {
            easing: Easing.inOut(Easing.sin),
          }),
          translate: interpolate(frame, [0, 55, 110], ["0px 0px", "0px -18px", "0px 0px"], {
            easing: Easing.inOut(Easing.sin),
            output: "perceptual-scale",
          }),
        }}
      >
        🎣
      </Interactive.Div>

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 80,
          paddingRight: 80,
        }}
      >
        <Interactive.Div
          name="120"
          style={{
            fontSize: 260,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 0.95,
            textShadow: "0 10px 40px rgba(0,0,0,0.55)",
            scale: interpolate(frame, [0, 14], [0, 1], {
              easing: Easing.spring({ damping: 9 }),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              output: "perceptual-scale",
            }),
          }}
        >
          120
        </Interactive.Div>

        <Interactive.Div
          name="Fish word badge"
          style={{
            marginTop: 4,
            backgroundColor: "#0b0b0b",
            color: "#ffd400",
            fontSize: 96,
            fontWeight: 900,
            padding: "6px 42px",
            borderRadius: 14,
            rotate: "-3deg",
            scale: interpolate(frame, [8, 24], [0, 1], {
              easing: Easing.spring({ damping: 10 }),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              output: "perceptual-scale",
            }),
          }}
        >
          РЫБ
        </Interactive.Div>

        <Interactive.Div
          name="For 4 hours question"
          style={{
            marginTop: 40,
            fontSize: 82,
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.08,
            textShadow: "0 6px 24px rgba(0,0,0,0.5)",
            opacity: interpolate(frame, [26, 46], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [26, 46], ["0px 40px", "0px 0px"], {
              easing: Easing.out(Easing.cubic),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              output: "perceptual-scale",
            }),
          }}
        >
          ЗА 4 ЧАСА?
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
