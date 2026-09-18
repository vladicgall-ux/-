export const FPS = 30;

export type Treatment = "full" | "card3d" | "split" | "frame";

export type Shot = {
  id: string;
  srcIn: number;
  srcOut: number;
  speed: number;
  treatment: Treatment;
  zoom: [number, number];
  panX?: [number, number];
  panY?: [number, number];
  volume?: number;
  grade?: "cold" | "punch" | "teaser";
};

export const SHOTS: Shot[] = [
  // --- cold open teaser ---
  {
    id: "hook_drill",
    srcIn: 19.6,
    srcOut: 21.0,
    speed: 1,
    treatment: "full",
    zoom: [1.55, 1.34],
    panY: [60, 10],
    volume: 0.55,
    grade: "teaser",
  },
  {
    id: "hook_wide",
    srcIn: 38.2,
    srcOut: 39.35,
    speed: 1,
    treatment: "full",
    zoom: [1.06, 1.16],
    volume: 0.45,
    grade: "teaser",
  },
  // --- story ---
  {
    id: "intro",
    srcIn: 1.55,
    srcOut: 4.35,
    speed: 1,
    treatment: "full",
    zoom: [1.3, 1.14],
    panY: [-40, 0],
    grade: "cold",
  },
  {
    id: "date",
    srcIn: 4.4,
    srcOut: 8.0,
    speed: 1,
    treatment: "full",
    zoom: [1.08, 1.22],
    grade: "cold",
  },
  {
    id: "distance",
    srcIn: 9.0,
    srcOut: 12.3,
    speed: 1,
    treatment: "split",
    zoom: [1.02, 1.1],
    grade: "cold",
  },
  {
    id: "question",
    srcIn: 12.9,
    srcOut: 16.15,
    speed: 1,
    treatment: "full",
    zoom: [1.12, 1.36],
    grade: "punch",
  },
  {
    id: "drill",
    srcIn: 16.6,
    srcOut: 29.4,
    speed: 3.6,
    treatment: "card3d",
    zoom: [1.0, 1.08],
    volume: 0.5,
    grade: "punch",
  },
  {
    id: "reveal",
    srcIn: 29.4,
    srcOut: 33.6,
    speed: 1,
    treatment: "frame",
    zoom: [1.24, 1.1],
    grade: "punch",
  },
  {
    id: "weekend",
    srcIn: 33.6,
    srcOut: 37.25,
    speed: 1,
    treatment: "full",
    zoom: [1.1, 1.24],
    grade: "cold",
  },
  {
    id: "outro",
    srcIn: 38.5,
    srcOut: 41.2,
    speed: 1,
    treatment: "full",
    zoom: [1.02, 1.16],
    volume: 0.4,
    grade: "teaser",
  },
];

export const shotDuration = (s: Shot) =>
  Math.round(((s.srcOut - s.srcIn) / s.speed) * FPS);

export const shotStart = (index: number) =>
  SHOTS.slice(0, index).reduce((sum, s) => sum + shotDuration(s), 0);

export const TOTAL_DURATION = SHOTS.reduce(
  (sum, s) => sum + shotDuration(s),
  0,
);

// Spoken words, in SOURCE seconds. Mapped onto the edited timeline at render.
export type Word = { t: string; s: number; e: number };

export const WORDS: Word[] = [
  { t: "ЗДРАВСТВУЙТЕ", s: 1.62, e: 2.6 },
  { t: "УВАЖАЕМЫЕ РЫБАКИ", s: 2.95, e: 4.3 },
  { t: "СЕГОДНЯ", s: 4.56, e: 5.14 },
  { t: "21 НОЯБРЯ", s: 5.14, e: 6.34 },
  { t: "ВЫШЛИ НА ЛЁД", s: 6.34, e: 7.42 },
  { t: "ПРОВЕРЯТЬ", s: 7.42, e: 8.3 },
  { t: "ОТОШЛИ", s: 9.1, e: 9.95 },
  { t: "МЕТРОВ 500", s: 10.2, e: 11.1 },
  { t: "ОТ БЕРЕГА", s: 11.3, e: 12.2 },
  { t: "НУ-КА", s: 13.05, e: 13.7 },
  { t: "СКОЛЬКО САНТИМЕТРОВ", s: 13.85, e: 14.7 },
  { t: "ЗДЕСЬ?", s: 14.7, e: 15.15 },
  { t: "ВСЕМ ПРИВЕТ", s: 15.3, e: 16.1 },
  { t: "ТОЛЩИНА ЛЬДА", s: 29.4, e: 30.15 },
  { t: "САНТИМЕТРОВ 8-10", s: 30.2, e: 31.45 },
  { t: "НО ЕЩЁ РАНОВАТО", s: 31.55, e: 33.4 },
  { t: "НУ ДА", s: 33.65, e: 34.1 },
  { t: "К ВЫХОДНЫМ", s: 34.9, e: 35.9 },
  { t: "БУДЕТ САМОЕ ТО", s: 35.95, e: 37.1 },
];

// Words that fall inside a shot, re-timed to that shot's local seconds.
export const wordsForShot = (shot: Shot): Word[] =>
  WORDS.filter((w) => w.e > shot.srcIn && w.s < shot.srcOut).map((w) => ({
    t: w.t,
    s: Math.max(0, (w.s - shot.srcIn) / shot.speed),
    e: Math.min(
      (shot.srcOut - shot.srcIn) / shot.speed,
      (w.e - shot.srcIn) / shot.speed,
    ),
  }));
