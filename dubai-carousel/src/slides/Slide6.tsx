import { AbsoluteFill } from "remotion";
import { GoldBackground } from "../Background";
import { theme } from "../brand";
import { fontFamily } from "../fonts";
import { HookTitle, PageDots, SubText } from "../ui";

export const Slide6: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily }}>
      <GoldBackground />
      <PageDots total={6} active={5} />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 70,
          paddingRight: 70,
        }}
      >
        <HookTitle fontSize={80}>ХОЧЕШЬ ТАК ЖЕ?</HookTitle>

        <div style={{ marginTop: 50 }}>
          <div
            style={{
              fontFamily,
              fontSize: 46,
              fontWeight: 900,
              color: "#171410",
              background: `linear-gradient(135deg, ${theme.accentLight} 0%, ${theme.gold} 50%, ${theme.goldDeep} 100%)`,
              padding: "20px 48px",
              borderRadius: 999,
              boxShadow:
                "0 14px 30px rgba(0,0,0,0.55), 0 0 32px rgba(230,195,116,0.4)",
            }}
          >
            СОХРАНИ ПОСТ 📌
          </div>
        </div>

        <div style={{ marginTop: 44 }}>
          <SubText>Пиши «ДУБАЙ» в личку — скину маршрут на 5 дней</SubText>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
