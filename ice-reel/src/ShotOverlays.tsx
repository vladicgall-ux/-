import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { theme } from "./brand";
import { Grid3D, IceParticles } from "./effects/Atmosphere";
import { fontFamily } from "./fonts";
import { Chip, ProgressRing, StatCard3D } from "./overlays/Hud";
import { KineticCaption, Title3D, extrude } from "./overlays/Text3D";
import { Shot, shotDuration, wordsForShot } from "./timeline";

const Center: React.FC<{
  children: React.ReactNode;
  top?: number;
  gap?: number;
}> = ({ children, top, gap = 24 }) => (
  <AbsoluteFill
    style={{
      alignItems: "center",
      justifyContent: top === undefined ? "center" : "flex-start",
      paddingTop: top,
      paddingLeft: 60,
      paddingRight: 60,
      flexDirection: "column",
      gap,
    }}
  >
    {children}
  </AbsoluteFill>
);

export const ShotOverlays: React.FC<{ shot: Shot }> = ({ shot }) => {
  const frame = useCurrentFrame();
  const dur = shotDuration(shot);
  const words = wordsForShot(shot);

  switch (shot.id) {
    case "hook_drill":
      return (
        <>
          <IceParticles intensity={1.5} />
          <Center>
            <Title3D text={"ПЕРВЫЙ" + "\n" + "ЛЁД"} fontSize={172} />
          </Center>
        </>
      );

    case "hook_wide":
      return (
        <>
          <IceParticles intensity={1.2} />
          <Grid3D opacity={0.22} />
          <Center gap={30}>
            <Chip tone="ice">21 НОЯБРЯ · ПЕРВЫЙ ВЫХОД</Chip>
            <Title3D text={"500 МЕТРОВ" + "\n" + "ОТ БЕРЕГА"} fontSize={104} />
            <Chip tone="danger" delay={10} fontSize={34}>
              А ЛЬДА — 8 СМ 😳
            </Chip>
          </Center>
        </>
      );

    case "intro":
      return (
        <>
          <IceParticles intensity={0.5} />
          <div style={{ position: "absolute", top: 48, left: 48 }}>
            <Chip tone="gold" fontSize={26}>
              ❄️ ПЕРВЫЙ ЛЁД 2025
            </Chip>
          </div>
          <KineticCaption words={words} />
        </>
      );

    case "date":
      return (
        <>
          <IceParticles intensity={0.5} />
          <div style={{ position: "absolute", top: 300, right: 60 }}>
            <StatCard3D
              value="21.11"
              label="ПЕРВЫЙ ВЫХОД"
              icon="❄️"
              delay={14}
            />
          </div>
          <KineticCaption words={words} />
        </>
      );

    case "distance": {
      return (
        <>
          <IceParticles intensity={0.6} />
          <Grid3D opacity={0.3} />
          <div
            style={{
              position: "absolute",
              top: 1290,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <StatCard3D value="500 м" label="ОТ БЕРЕГА" icon="📍" delay={12} />
          </div>
          <KineticCaption words={words} top={960} />
        </>
      );
    }

    case "question": {
      const pulse = interpolate(frame % 40, [0, 20, 40], [1, 1.08, 1], {
        easing: Easing.inOut(Easing.sin),
      });
      return (
        <>
          <IceParticles intensity={0.7} />
          <div
            style={{
              position: "absolute",
              top: 250,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              transform: `scale(${pulse})`,
            }}
          >
            <Chip tone="danger" fontSize={38} delay={6}>
              ТОЛЩИНА ЛЬДА = ЖИЗНЬ
            </Chip>
          </div>
          <KineticCaption words={words} />
        </>
      );
    }

    case "drill":
      return (
        <>
          <IceParticles intensity={1.1} />
          <div style={{ position: "absolute", top: 60, right: 56 }}>
            <Chip tone="gold" fontSize={26}>
              ×3.6 УСКОРЕНО
            </Chip>
          </div>
          <div
            style={{
              position: "absolute",
              top: 1330,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ProgressRing duration={dur} label="БУРИМ ЛУНКУ" />
          </div>
        </>
      );

    case "reveal": {
      const shake = interpolate(frame, [18, 24, 30], [0, 8, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      return (
        <>
          <IceParticles intensity={1.3} />
          <div
            style={{
              position: "absolute",
              top: 210,
              left: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 30,
              transform: `translateY(${shake}px)`,
            }}
          >
            <Chip tone="ice" fontSize={30}>
              ТОЛЩИНА ЛЬДА
            </Chip>
            <Title3D text="8–10 СМ" fontSize={138} delay={10} tone="gold" />
            <div style={{ marginTop: 18 }}>
              <Chip tone="danger" fontSize={36} delay={54}>
                ⚠️ ЕЩЁ РАНОВАТО
              </Chip>
            </div>
          </div>
          <KineticCaption words={words} top={1530} />
        </>
      );
    }

    case "weekend":
      return (
        <>
          <IceParticles intensity={0.8} />
          <div
            style={{
              position: "absolute",
              top: 300,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Title3D text={"К ВЫХОДНЫМ" + "\n" + "БУДЕТ САМОЕ ТО"} fontSize={70} tone="gold" delay={8} />
          </div>
          <KineticCaption words={words} />
        </>
      );

    case "outro": {
      const pop = interpolate(frame, [6, 24], [0, 1], {
        easing: Easing.out(Easing.back(1.8)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        output: "perceptual-scale",
      });
      const glow = interpolate(frame % 70, [0, 35, 70], [0.4, 1, 0.4], {
        easing: Easing.inOut(Easing.sin),
      });
      return (
        <>
          <IceParticles intensity={1.4} />
          <Grid3D opacity={0.26} />
          <Center gap={34}>
            <Title3D text="ЕДЕМ НА ВЫХОДНЫХ?" fontSize={82} tone="ice" />
            <div style={{ scale: pop }}>
              <div
                style={{
                  fontFamily,
                  fontSize: 46,
                  fontWeight: 900,
                  color: "#14100a",
                  background: `linear-gradient(135deg, ${theme.goldLight} 0%, ${theme.gold} 50%, ${theme.goldDeep} 100%)`,
                  padding: "20px 52px",
                  borderRadius: 999,
                  boxShadow: `0 16px 34px rgba(0,0,0,0.6), 0 0 ${
                    22 + glow * 30
                  }px rgba(230,195,116,${0.35 + glow * 0.35})`,
                  letterSpacing: 1,
                }}
              >
                ПОДПИШИСЬ 🎣
              </div>
            </div>
            <div
              style={{
                fontFamily,
                fontSize: 28,
                fontWeight: 800,
                color: theme.frost,
                letterSpacing: 3,
                backgroundColor: "rgba(5,9,14,0.72)",
                border: `1px solid ${theme.ice}55`,
                borderRadius: 999,
                padding: "12px 30px",
                textShadow: extrude(3),
                opacity: interpolate(frame, [30, 46], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              СЛЕДИМ ЗА ЛЬДОМ КАЖДУЮ НЕДЕЛЮ
            </div>
          </Center>
        </>
      );
    }

    default:
      return <KineticCaption words={words} />;
  }
};
