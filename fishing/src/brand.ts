/**
 * Every plate in this feed is water at a low sun: Ural lakes before the
 * day starts, ice at dusk, a perch on wet boards. So the palette is two
 * temperatures and nothing else — the cold green-black of the water, and
 * the gold the sun puts on it. Type is always the gold.
 */
export const theme = {
  bg: "#050d10",
  deep: "#0a1a20",
  panel: "#0e2027",
  panelLight: "#16303a",
  border: "#27454f",

  accent: "#f0b23c",
  accentLight: "#ffe1a6",
  accentDeep: "#9a6208",

  /* the water side of the frame — structure only, never type */
  water: "#3d8c96",

  text: "#f3f8f8",
  muted: "#9fb6bc",
};

/** The three daily slots, each with its own label and rhythm. */
export const SLOTS = {
  morning: { at: "09:00", label: "клёв" },
  day: { at: "16:00", label: "снасть" },
  evening: { at: "21:00", label: "на кухню" },
} as const;

export type SlotId = keyof typeof SLOTS;
