import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

/**
 * Photochemical finishing pass: split-toning, highlight bloom (halation),
 * an anamorphic streak and a soft lens falloff. Sits above the footage,
 * below the type.
 */
export const FilmGrade: React.FC<{ bloom?: number; streak?: boolean }> = ({
  bloom = 0.22,
  streak = true,
}) => {
  const frame = useCurrentFrame();
  const streakShift = interpolate(frame % 600, [0, 600], [-14, 14], {
    easing: Easing.inOut(Easing.sin),
  });

  return (
    <>
      {/* cold shadows */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(24,58,86,0.30) 0%, rgba(10,24,38,0.16) 46%, rgba(6,12,20,0.42) 100%)",
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }}
      />
      {/* warm highlights */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 30%, rgba(255,214,164,0.16) 0%, rgba(255,214,164,0) 68%)",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />
      {/* halation / bloom lifted from whatever is behind */}
      <AbsoluteFill
        style={{
          backdropFilter: "blur(26px) brightness(1.45) saturate(1.1)",
          WebkitBackdropFilter: "blur(26px) brightness(1.45) saturate(1.1)",
          mixBlendMode: "screen",
          opacity: bloom,
          pointerEvents: "none",
        }}
      />
      {streak ? (
        <AbsoluteFill
          style={{
            background: `linear-gradient(${90 + streakShift}deg, rgba(0,0,0,0) 34%, rgba(176,220,255,0.12) 50%, rgba(0,0,0,0) 66%)`,
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
      ) : null}
      {/* lens falloff */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 76% 64% at 50% 46%, rgba(0,0,0,0) 46%, rgba(0,0,0,0.58) 100%)",
          pointerEvents: "none",
        }}
      />
    </>
  );
};

/** Directional blur smear used to sell a whip between two shots. */
export const WhipIn: React.FC<{ frames?: number; dir?: "x" | "y" }> = ({
  frames = 8,
  dir = "x",
}) => {
  const frame = useCurrentFrame();
  if (frame > frames) return null;
  const amount = interpolate(frame, [0, frames], [26, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });
  const offset = interpolate(frame, [0, frames], [dir === "x" ? 90 : 0, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        backdropFilter: `blur(${amount}px)`,
        WebkitBackdropFilter: `blur(${amount}px)`,
        transform: `translateX(${offset}px)`,
        pointerEvents: "none",
      }}
    />
  );
};

/** Warm film-burn flash instead of a flat white frame. */
export const FilmBurn: React.FC<{ length?: number }> = ({ length = 9 }) => {
  const frame = useCurrentFrame();
  if (frame > length) return null;
  const o = interpolate(frame, [0, 2, length], [0.7, 0.34, 0], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 120% 90% at 50% 40%, rgba(255,236,206,0.95) 0%, rgba(255,186,120,0.55) 45%, rgba(255,150,80,0) 78%)",
        opacity: o,
        mixBlendMode: "screen",
        pointerEvents: "none",
      }}
    />
  );
};
