import { Still } from "remotion";
import "./index.css";
import { Slide } from "./Slide";
import { DAY1 } from "./posts/day1";

/**
 * One Still per slide of every post in the current day, named
 * <slot>-<n> so the render loop and the publish step can find them
 * without knowing anything about the content.
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
  </>
);
