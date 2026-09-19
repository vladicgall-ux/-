import { AbsoluteFill } from "remotion";
import { ArtMuseum } from "../Art";
import { UpArrow } from "../Arrow";
import { theme } from "../brand";
import { Sky } from "../Sky";
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
    <Sky glow={0.8} />
    <ArtMuseum />
    <UpArrow label="ПОДРОБНОСТИ ТУТ" />
    <Slate index={7} total={7} label="сегодня" />
    <Lower bottom={126}>
      <Eyebrow>он никуда не делся</Eyebrow>
      <Headline size={74}>
        ОН И СЕЙЧАС
        <br />В <Accent>ЦЕНТРЕ ГОРОДА</Accent>
      </Headline>
      <Body size={29}>
        Главный фрагмент лежит в витрине Исторического музея Южного Урала —
        в десяти минутах ходьбы от площади Революции.
      </Body>
      <HotPlate>ПОДРОБНОСТИ В ШАПКЕ ПРОФИЛЯ</HotPlate>
    </Lower>
    <PageDots total={7} active={6} />
  </AbsoluteFill>
);
