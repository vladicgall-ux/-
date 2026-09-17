export type Caption = { text: string; start: number; end: number };

// Timings in seconds, transcribed from the source audio (word-level ASR),
// grouped into short punch-caption chunks; a couple of misheard words
// were corrected by context (рубика -> рубрика, телеверам -> телеграм,
// понимаете большое -> поднимаете бабло).
export const captions: Caption[] = [
  { text: "ВСЕМ ПРИВЕТ", start: 0.0, end: 0.76 },
  { text: "СЕГОДНЯ ЕЩЁ У НАС", start: 1.06, end: 1.8 },
  { text: "РУБРИКА", start: 1.8, end: 2.42 },
  { text: "ЭТО", start: 2.42, end: 2.66 },
  { text: "ИСКУССТВЕННЫЙ", start: 2.66, end: 3.58 },
  { text: "ИНТЕЛЛЕКТ", start: 3.58, end: 4.06 },
  { text: "КАК НА НИХ", start: 4.06, end: 4.58 },
  { text: "МОЖНО ЗАРАБОТАТЬ?", start: 4.58, end: 5.44 },
  { text: "ОСОБЕННО НА", start: 5.44, end: 5.96 },
  { text: "КОДЕ", start: 5.96, end: 7.08 },
  { text: "ВЫ НАХОДИТЕ", start: 7.08, end: 7.88 },
  { text: "КЛИЕНТА НА САЙТЕ", start: 7.88, end: 8.96 },
  { text: "ЧЕРЕЗ ИНТЕРНЕТ", start: 8.96, end: 10.24 },
  { text: "ОН ВАМ ЗВОНИТ", start: 10.24, end: 11.02 },
  { text: "И ВЫ ПРИНИМАЕТЕ", start: 11.02, end: 11.9 },
  { text: "ЗАКАЗ", start: 11.9, end: 12.66 },
  { text: "И ПИШЕТЕ ЕМУ", start: 12.66, end: 13.72 },
  { text: "В ТЕЛЕГРАМ", start: 13.72, end: 14.68 },
  { text: "ПРИЛОЖЕНИЕ", start: 14.68, end: 15.32 },
  { text: "И НА ЭТОМ УЖЕ", start: 15.32, end: 16.04 },
  { text: "ПОДНИМАЕТЕ БАБЛО", start: 16.04, end: 17.2 },
  { text: "ТАК ЖЕ МОЖНО", start: 17.2, end: 17.74 },
  { text: "ДЕЛАТЬ САЙТЫ", start: 17.74, end: 18.98 },
  { text: "САЙТЫ МОЖНО ДЕЛАТЬ", start: 18.98, end: 19.84 },
  { text: "ЧТО ТАКЖЕ", start: 19.84, end: 20.22 },
  { text: "ВИЗУАЛЬНЫЕ И", start: 20.22, end: 21.56 },
  { text: "БОЛЬШИЕ", start: 21.56, end: 21.96 },
  { text: "КРУПНЫЕ", start: 21.96, end: 23.5 },
  { text: "НУ И ВСЁ", start: 23.5, end: 24.24 },
  { text: "И НА ЭТОМ", start: 24.24, end: 24.5 },
  { text: "СОБИРАЕМ", start: 24.5, end: 25.06 },
  { text: "УЖЕ МЫ ВСЕ", start: 25.06, end: 25.52 },
  { text: "ДЕНЬГИ", start: 25.52, end: 25.8 },
  { text: "ЗАРАБАТЫВАЕМ", start: 25.8, end: 26.6 },
];

export const VIDEO_DURATION_SECONDS = 26.75;
