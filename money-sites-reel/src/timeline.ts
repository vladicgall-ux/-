export const FPS = 30;

export type SegmentId =
  | "hook"
  | "no_office"
  | "client"
  | "order"
  | "money"
  | "cta";

export const segments: {
  id: SegmentId;
  kind: "avatar" | "card";
  durationInFrames: number;
}[] = [
  { id: "hook", kind: "avatar", durationInFrames: 110 },
  { id: "no_office", kind: "card", durationInFrames: 171 },
  { id: "client", kind: "avatar", durationInFrames: 128 },
  { id: "order", kind: "card", durationInFrames: 97 },
  { id: "money", kind: "card", durationInFrames: 238 },
  { id: "cta", kind: "avatar", durationInFrames: 121 },
];

export const TOTAL_DURATION = segments.reduce(
  (sum, s) => sum + s.durationInFrames,
  0,
);

export const segmentStart = (id: SegmentId): number => {
  let acc = 0;
  for (const s of segments) {
    if (s.id === id) return acc;
    acc += s.durationInFrames;
  }
  throw new Error(`Unknown segment ${id}`);
};
