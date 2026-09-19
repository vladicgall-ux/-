import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "../Arrow";
import { theme } from "../brand";
import { CityPhoto, Credit } from "../Photo";
import { Accent, Body, Eyebrow, Headline, Lower, PageDots, Slate } from "../ui";

export const Slide4: React.FC = () => (
  <AbsoluteFill style={{ background: theme.bg }}>
    <CityPhoto src="tankmen.jpg" focus="50% 26%" scale={1.05} />
    <Slate index={4} total={7} label="1941–1945" />
    <Lower>
      <Eyebrow>имя, которого нет на карте</Eyebrow>
      <Headline size={88}>
        <Accent>ТАНКОГРАД</Accent>
      </Headline>
      <Body size={30}>
        В войну сюда вывезли заводы со всей страны. Отсюда же в 1943-м ушёл
        Уральский добровольческий танковый корпус — снаряжение для него рабочие
        оплатили сами.
      </Body>
    </Lower>
    <PageDots total={7} active={3} />
    <SwipeArrow />
    <Credit>фото: памятник «Добровольцам-танкистам», Vsatinet / CC0</Credit>
  </AbsoluteFill>
);
