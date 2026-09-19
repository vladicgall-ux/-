/**
 * The whole set is lit by one object: a fireball burning through a winter
 * dawn. So the palette has exactly two temperatures — the blue-black sky
 * everything sits in, and the incandescent trail that cuts it. Type takes
 * its colour from the trail, never from a generic accent.
 */
export const theme = {
  bg: "#04060e",
  sky: "#0a1226",
  panel: "#0c1220",
  panelLight: "#141d30",
  border: "#25334a",

  /* the trail, from its cold outer edge to its white-hot core */
  accent: "#ff8f2e",
  accentLight: "#ffd39a",
  hot: "#fff4e2",
  deep: "#b8460c",

  /* the sky side of the same frame — used only for structure, never for type */
  cold: "#4f7fbf",

  text: "#eef3fb",
  muted: "#93a6c2",
  danger: "#ff5a4d",
};
