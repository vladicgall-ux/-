import { AbsoluteFill, Sequence } from "remotion";
import { AvatarScene } from "./AvatarScene";
import { CardScene } from "./CardScene";
import { fontFamily } from "./fonts";
import { ClaudeChatCard } from "./scenes/ClaudeChatCard";
import { ClaudePricingCard } from "./scenes/ClaudePricingCard";
import { ClaudeTerminalCard } from "./scenes/ClaudeTerminalCard";
import { segments, segmentStart } from "./timeline";

export const Main: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0e0d0c", fontFamily }}>
      {segments.map((s) => {
        const from = segmentStart(s.id);
        return (
          <Sequence
            key={s.id}
            from={from}
            durationInFrames={s.durationInFrames}
            layout="none"
          >
            {s.kind === "avatar" ? (
              <AvatarScene
                segmentId={s.id}
                tag={s.id === "hook" ? "ЗАРАБОТОК НА САЙТАХ 💻" : undefined}
                ctaBadgeFrom={s.id === "cta" ? 95 : undefined}
              />
            ) : s.id === "no_office" ? (
              <CardScene segmentId={s.id} zoom={1.5}>
                <ClaudeTerminalCard />
              </CardScene>
            ) : s.id === "order" ? (
              <CardScene segmentId={s.id} zoom={1.55}>
                <ClaudeChatCard />
              </CardScene>
            ) : (
              <CardScene segmentId={s.id} zoom={1.7}>
                <ClaudePricingCard />
              </CardScene>
            )}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
