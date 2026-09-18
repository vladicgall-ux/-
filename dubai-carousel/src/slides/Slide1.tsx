import { AbsoluteFill, staticFile } from "remotion";
import { PhotoBackground } from "../Background";
import { fontFamily } from "../fonts";
import { HookTitle, PageDots, PillTag, SubText } from "../ui";

export const Slide1: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily }}>
      <PhotoBackground src={staticFile("photo/dubai-hero.jpg")} />
      <PageDots total={6} active={0} />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 130,
          paddingLeft: 70,
          paddingRight: 70,
        }}
      >
        <PillTag>ОТДЫХ В ДУБАЕ ✈️</PillTag>

        <div style={{ marginTop: 34 }}>
          <HookTitle fontSize={72}>
            5 МЕСТ, ПОСЛЕ КОТОРЫХ НЕ ЗАХОЧЕШЬ ДОМОЙ
          </HookTitle>
        </div>

        <div style={{ marginTop: 28 }}>
          <SubText>Сохрани — пригодится 📌</SubText>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
