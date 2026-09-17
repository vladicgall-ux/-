import { Still } from "remotion";
import "./index.css";
import { Slide1 } from "./slides/Slide1";
import { Slide2 } from "./slides/Slide2";
import { Slide3 } from "./slides/Slide3";
import { Slide4 } from "./slides/Slide4";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Still id="Slide1" component={Slide1} width={1080} height={1080} />
      <Still id="Slide2" component={Slide2} width={1080} height={1080} />
      <Still id="Slide3" component={Slide3} width={1080} height={1080} />
      <Still id="Slide4" component={Slide4} width={1080} height={1080} />
    </>
  );
};
