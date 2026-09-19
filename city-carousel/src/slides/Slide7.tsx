import { AbsoluteFill } from "remotion";
import { UpArrow } from "../Arrow";
import { theme } from "../brand";
import { CityPhoto, Credit } from "../Photo";
import {
  Accent,
  Body,
  Eyebrow,
  Headline,
  HotPlate,
  Lower,
  PageDots,
  Slate,
} from "../ui";

export const Slide7: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <CityPhoto src="square.jpg" focus="50% 40%" scale={1.14} />
    <UpArrow label="ПОДРОБНОСТИ ТУТ" />
    <Slate index={7} total={7} label="290" />
    <Lower bottom={126}>
      <Eyebrow>вопрос к тебе</Eyebrow>
      <Headline size={76}>
        ЧТО ДЛЯ ТЕБЯ
        <br />
        <Accent>ЧЕЛЯБИНСК?</Accent>
      </Headline>
      <Body size={29}>
        Одно слово в комментарии. Соберём из них портрет города к юбилею.
      </Body>
      <HotPlate>ПОДРОБНОСТИ В ШАПКЕ ПРОФИЛЯ</HotPlate>
    </Lower>
    <PageDots total={7} active={6} />
    <Credit>фото: Vyacheslav Bukharov / CC BY-SA 4.0</Credit>
  </AbsoluteFill>
);
