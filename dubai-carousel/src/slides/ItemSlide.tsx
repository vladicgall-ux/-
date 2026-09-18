import { AbsoluteFill } from "remotion";
import { GoldBackground } from "../Background";
import { fontFamily } from "../fonts";
import { GoldCard, HookTitle, IconBadge, PageDots, PillTag, SubText } from "../ui";

export const ItemSlide: React.FC<{
  index: number;
  total: number;
  icon: string;
  label: string;
  title: string;
  subtitle: string;
}> = ({ index, total, icon, label, title, subtitle }) => {
  return (
    <AbsoluteFill style={{ fontFamily }}>
      <GoldBackground />
      <PageDots total={total} active={index} />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 70,
          paddingRight: 70,
        }}
      >
        <GoldCard>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 26,
            }}
          >
            <IconBadge icon={icon} />
            <PillTag>{label}</PillTag>
            <HookTitle fontSize={64}>{title}</HookTitle>
            <SubText>{subtitle}</SubText>
          </div>
        </GoldCard>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
