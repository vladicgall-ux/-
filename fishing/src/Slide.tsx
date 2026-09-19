import { AbsoluteFill } from "remotion";
import { SwipeArrow } from "./Arrow";
import { theme, type SlotId } from "./brand";
import { Plate as PhotoPlate } from "./Plate";
import type { Slide as SlideData } from "./post";
import {
  Body,
  Eyebrow,
  Gold,
  Headline,
  Lower,
  PageDots,
  Plate,
  Slate,
  Source,
  Stat,
  Step,
} from "./ui";

/**
 * Renders one slide of a post from its data. Every branch shares the same
 * frame — slate at the top, art in the upper half, the words in the lower —
 * so a post written as data comes out looking authored.
 */
export const Slide: React.FC<{
  data: SlideData;
  index: number;
  total: number;
  slot: SlotId;
}> = ({ data, index, total, slot }) => {
  const last = index === total;
  return (
    <AbsoluteFill style={{ background: theme.bg }}>
      <PhotoPlate photo={data.photo} />
      <Slate index={index} total={total} slot={slot} />

      {data.kind === "hook" ? (
        <Lower>
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <Headline text={data.title}>
            <Gold text={data.title} accent={data.accent} />
          </Headline>
          {data.body ? (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 6, height: 54, background: theme.accent }} />
              <Body size={32}>{data.body}</Body>
            </div>
          ) : null}
          {data.note ? <Body size={27}>{data.note}</Body> : null}
        </Lower>
      ) : null}

      {data.kind === "fact" ? (
        <Lower>
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <Headline text={data.title}>
            <Gold text={data.title} accent={data.accent} />
          </Headline>
          {data.stats?.length ? (
            <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
              {data.stats.map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </div>
          ) : null}
          {data.body ? <Body size={28}>{data.body}</Body> : null}
          {data.source ? <Source>{data.source}</Source> : null}
        </Lower>
      ) : null}

      {data.kind === "steps" ? (
        <Lower bottom={168}>
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <Headline text={data.title}>
            <Gold text={data.title} accent={data.accent} />
          </Headline>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              marginTop: 6,
            }}
          >
            {data.steps.map((s, i) => (
              <Step key={s} n={i + 1}>
                {s}
              </Step>
            ))}
          </div>
        </Lower>
      ) : null}

      {data.kind === "cta" ? (
        <Lower bottom={126}>
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <Headline text={data.title}>
            <Gold text={data.title} accent={data.accent} />
          </Headline>
          {data.body ? <Body size={29}>{data.body}</Body> : null}
          <Plate>{data.plate}</Plate>
        </Lower>
      ) : null}

      <PageDots total={total} active={index - 1} />
      {last ? null : <SwipeArrow />}
    </AbsoluteFill>
  );
};
