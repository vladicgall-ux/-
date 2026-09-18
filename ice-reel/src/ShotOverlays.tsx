import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { theme } from "./brand";
import { Grid3D, IceParticles } from "./effects/Atmosphere";
import { fontFamily } from "./fonts";
import { Chip, ProgressRing, StatCard3D } from "./overlays/Hud";
import { KineticCaption, Title3D } from "./overlays/Text3D";
import { Shot, shotDuration, wordsForShot } from "./timeline";

const Stack: React.FC<{
  children: React.ReactNode;
  top?: number;
  gap?: number;
}> = ({ children, top, gap = 26 }) => (
  <AbsoluteFill
    style={{
      alignItems: "center",
      justifyContent: top === undefined ? "center" : "flex-start",
      paddingTop: top,
      paddingLeft: 70,
      paddingRight: 70,
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
          <IceParticles intensity={1.3} />
          <Stack>
            <Title3D
              text={"ПЕРВЫЙ" + "\n" + "ЛЁД"}
              kicker="21 НОЯБРЯ"
              fontSize={158}
            />
          </Stack>
        </>
      );

    case "hook_wide":
      return (
        <>
          <IceParticles intensity={1.1} />
          <Grid3D opacity={0.2} />
          <Stack gap={34}>
            <Title3D
              text={"500 МЕТРОВ" + "\n" + "ОТ БЕРЕГА"}
              kicker="ВЫШЛИ НА ПРОВЕРКУ"
              fontSize={96}
            />
            <Chip tone="danger" delay={7} fontSize={30}>
              ПОД НОГАМИ — 8 СМ
            </Chip>
          </Stack>
        </>
      );

    case "intro":
      return (
        <>
          <IceParticles intensity={0.45} />
          <div style={{ position: "absolute", top: 54, left: 56 }}>
            <Chip tone="gold" fontSize={22}>
              ПЕРВЫЙ ЛЁД
            </Chip>
          </div>
          <KineticCaption words={words} />
        </>
      );

    case "date":
      return (
        <>
          <IceParticles intensity={0.45} />
          <div style={{ position: "absolute", top: 320, left: 70 }}>
            <StatCard3D value="21.11" label="ПЕРВЫЙ ВЫХОД" delay={8} align="left" />
          </div>
          <KineticCaption words={words} />
        </>
      );

    case "distance":
      return (
        <>
          <IceParticles intensity={0.55} />
          <Grid3D opacity={0.26} />
          <div style={{ position: "absolute", top: 1330, left: 90 }}>
            <StatCard3D value="500 м" label="ДО БЕРЕГА" delay={7} align="left" />
          </div>
          <KineticCaption words={words} top={980} />
        </>
      );

    case "question":
      return (
        <>
          <IceParticles intensity={0.65} />
          <div
            style={{
              position: "absolute",
              top: 270,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Chip tone="danger" fontSize={32} delay={4}>
              ТОЛЩИНА РЕШАЕТ ВСЁ
            </Chip>
          </div>
          <KineticCaption words={words} />
        </>
      );

    case "drill":
      return (
        <>
          <IceParticles intensity={1.0} />
          <div style={{ position: "absolute", top: 70, right: 70 }}>
            <Chip tone="gold" fontSize={22}>
              ×3.6
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
      const drop = interpolate(frame, [8, 13, 18], [0, 7, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      return (
        <>
          <IceParticles intensity={1.2} />
          <div
            style={{
              position: "absolute",
              top: 240,
              left: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 34,
              transform: `translateY(${drop}px)`,
            }}
          >
            <Title3D
              text="8–10 СМ"
              kicker="ТОЛЩИНА ЛЬДА"
              fontSize={132}
              delay={5}
              tone="gold"
            />
            <Chip tone="danger" fontSize={32} delay={30}>
              ЕЩЁ РАНОВАТО
            </Chip>
          </div>
          <KineticCaption words={words} top={1540} />
        </>
      );
    }

    case "weekend":
      return (
        <>
          <IceParticles intensity={0.7} />
          <KineticCaption words={words} />
        </>
      );

    case "outro":
      return (
        <>
          <IceParticles intensity={1.25} />
          <Grid3D opacity={0.24} />
          <Stack gap={40}>
            <Title3D
              text={"К ВЫХОДНЫМ" + "\n" + "БУДЕТ САМОЕ ТО"}
              kicker="ЖДЁМ ЛЁД"
              fontSize={76}
              tone="gold"
            />
            <div
              style={{
                fontFamily,
                fontSize: 24,
                fontWeight: 700,
                color: theme.muted,
                letterSpacing: 8,
                opacity: interpolate(frame, [22, 36], [0, 1], {
                  easing: Easing.out(Easing.cubic),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              ПЕРВЫЙ ЛЁД · 21 НОЯБРЯ
            </div>
          </Stack>
        </>
      );

    default:
      return <KineticCaption words={words} />;
  }
};
