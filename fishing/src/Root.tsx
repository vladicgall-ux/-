import { Still } from "remotion";
import "./index.css";
import { Slide } from "./Slide";
import { DAY1 } from "./posts/day1";

/**
 * One Still per slide of every post in the current day, named
 * <slot>-<n> so the render loop and the publish step can find them
 * without knowing anything about the content.
 *
 * Alongside them, one <slot>-solo per post: the same hook slide rendered
 * as a post of one. Telegram gets a single photograph rather than an
 * album, and at total=1 the frame drops the things that only mean
 * something in a carousel — the 01/03 count, the pager dots and the
 * ЛИСТАЙ arrow, which would otherwise point at nothing.
 */
export const RemotionRoot: React.FC = () => (
  <>
    {DAY1.flatMap((post) =>
      post.slides.map((slide, i) => (
        <Still
          key={`${post.slot}-${i + 1}`}
          id={`${post.slot}-${i + 1}`}
          component={Slide}
          width={1080}
          height={1080}
          defaultProps={{
            data: slide,
            index: i + 1,
            total: post.slides.length,
            slot: post.slot,
          }}
        />
      )),
    )}
    {DAY1.map((post) => (
      <Still
        key={`${post.slot}-solo`}
        id={`${post.slot}-solo`}
        component={Slide}
        width={1080}
        height={1080}
        defaultProps={{
          data: post.slides[0],
          index: 1,
          total: 1,
          slot: post.slot,
        }}
      />
    ))}
  </>
);
