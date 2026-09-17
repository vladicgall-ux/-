import { SegmentId } from "./timeline";

export type Caption = { text: string; start: number; end: number };

// Per-segment caption chunks, timed proportionally within each clip
// (seconds, relative to the start of that segment's own audio).
export const captionsBySegment: Record<SegmentId, Caption[]> = {
  hook: [
    { text: "СИЖУ В", start: 0.0, end: 0.523 },
    { text: "ДУБАЕ С", start: 0.523, end: 1.132 },
    { text: "НОУТОМ, А", start: 1.132, end: 1.916 },
    { text: "ДЕНЬГИ ИДУТ", start: 1.916, end: 2.874 },
    { text: "САМИ", start: 2.874, end: 3.309 },
  ],
  no_office: [
    { text: "НИКАКОГО ОФИСА", start: 0.0, end: 1.956 },
    { text: "НИКАКОГО ПРОГРАММИРОВАНИЯ", start: 1.956, end: 5.347 },
  ],
  client: [
    { text: "Я НАХОЖУ", start: 0.0, end: 0.696 },
    { text: "КЛИЕНТА, А", start: 0.696, end: 1.567 },
    { text: "САЙТ ЕМУ", start: 1.567, end: 2.263 },
    { text: "СОБИРАЕТ НЕЙРОСЕТЬ", start: 2.263, end: 3.917 },
  ],
  order: [
    { text: "ЗАКАЗ ЧЕРЕЗ", start: 0.0, end: 0.936 },
    { text: "САЙТ, ОПЛАТА", start: 0.936, end: 1.957 },
    { text: "В ТЕЛЕГРАМ", start: 1.957, end: 2.893 },
  ],
  money: [
    { text: "ОДИН САЙТ", start: 0.0, end: 0.823 },
    { text: "ОТ", start: 0.823, end: 1.188 },
    { text: "ТРИДЦАТИ ДО", start: 1.188, end: 2.194 },
    { text: "СТА ТЫСЯЧ", start: 2.194, end: 3.017 },
    { text: "РУБЛЕЙ. СПРОС", start: 3.017, end: 4.205 },
    { text: "ОГРОМНЫЙ, САЙТЫ", start: 4.205, end: 5.576 },
    { text: "НУЖНЫ ВСЕМ", start: 5.576, end: 6.49 },
    { text: "КАЖДЫЙ ДЕНЬ", start: 6.49, end: 7.587 },
  ],
  cta: [
    { text: "ХОЧЕШЬ ТАК", start: 0.0, end: 0.942 },
    { text: "ЖЕ? ПИШИ", start: 0.942, end: 1.695 },
    { text: "СЛОВО САЙТ", start: 1.695, end: 2.637 },
    { text: "МНЕ В", start: 2.637, end: 3.108 },
    { text: "ЛИЧКУ", start: 3.108, end: 3.673 },
  ],
};
