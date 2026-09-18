import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const fontFamily = "Unbounded";
export const serifFontFamily = "Playfair Display";

await Promise.all([
  loadFont({
    family: fontFamily,
    url: staticFile("fonts/Unbounded900.ttf"),
    weight: "900",
  }),
  loadFont({
    family: fontFamily,
    url: staticFile("fonts/Unbounded700.ttf"),
    weight: "700",
  }),
  loadFont({
    family: serifFontFamily,
    url: staticFile("fonts/PlayfairDisplay900.ttf"),
    weight: "900",
    style: "italic",
  }),
]);
