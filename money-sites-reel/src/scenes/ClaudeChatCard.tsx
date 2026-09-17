import { Easing, interpolate, useCurrentFrame } from "remotion";
import { claude, uiFont } from "../claudeBrand";
import { ClaudeMark, WindowChrome } from "./WindowChrome";

const messages = [
  { t: 0, from: "client", text: "Нужен сайт 🙏" },
  { t: 26, from: "you", text: "Сделаю, держи Telegram 📲" },
  { t: 54, from: "system", text: "✅ Заказ принят" },
];

export const ClaudeChatCard: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <WindowChrome title="Telegram — Заказчик" width={620} height={460}>
      <div
        style={{
          padding: "24px 26px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {messages.map((m, i) => {
          const pop = interpolate(frame, [m.t, m.t + 14], [0, 1], {
            easing: Easing.out(Easing.back(1.6)),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            output: "perceptual-scale",
          });
          const isYou = m.from === "you";
          const isSystem = m.from === "system";
          return (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: isSystem ? "center" : isYou ? "flex-end" : "flex-start",
                scale: pop,
                transformOrigin: isYou ? "right" : "left",
              }}
            >
              {isSystem ? (
                <div
                  style={{
                    fontFamily: uiFont,
                    fontSize: 22,
                    fontWeight: 700,
                    color: claude.green,
                    backgroundColor: "rgba(79,174,107,0.14)",
                    border: `1px solid ${claude.green}`,
                    borderRadius: 999,
                    padding: "10px 24px",
                  }}
                >
                  {m.text}
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flexDirection: isYou ? "row-reverse" : "row",
                  }}
                >
                  {isYou && (
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 999,
                        backgroundColor: claude.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ClaudeMark size={18} />
                    </div>
                  )}
                  <div
                    style={{
                      fontFamily: uiFont,
                      fontSize: 26,
                      fontWeight: 600,
                      color: isYou ? "#fff" : claude.text,
                      backgroundColor: isYou ? claude.accent : claude.panelLight,
                      borderRadius: 20,
                      padding: "16px 24px",
                      maxWidth: 380,
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </WindowChrome>
  );
};
