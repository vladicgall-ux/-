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
    <CityPhoto src="site-2015.jpg" focus="50% 44%" scale={1.1} />
    <UpArrow label="ПОДРОБНОСТИ ТУТ" />
    <Slate index={7} total={7} label="Челябинская область" />
    <Lower bottom={126}>
      <Eyebrow>это в трёх часах от Челябинска</Eyebrow>
      <Headline size={70}>
        А ТЫ БЫЛ
        <br />
        НА <Accent>АРКАИМЕ?</Accent>
      </Headline>
      <Body size={28}>Напиши в комментариях — за наукой ты бы поехал или за мистикой?</Body>
      <HotPlate>ПОДРОБНОСТИ В ШАПКЕ ПРОФИЛЯ</HotPlate>
    </Lower>
    <PageDots total={7} active={6} />
    <Credit>фото: Rafikova m / CC BY-SA 4.0</Credit>
  </AbsoluteFill>
);
