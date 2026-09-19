import type { SlotId } from "./brand";

/**
 * A day's post is data, not code. Three of these get written every day, so
 * the slide components stay fixed and only this file changes — which is
 * also what makes the posted-topic ledger meaningful, since every post has
 * a stable `id`.
 */

export type Slide =
  /** Opening plate: the hook. */
  | {
      kind: "hook";
      photo: Photo;
      eyebrow: string;
      title: string;
      /** the one word or phrase that takes the gold */
      accent?: string;
      body?: string;
      note?: string;
    }
  /** A claim with the figures that back it. */
  | {
      kind: "fact";
      photo: Photo;
      eyebrow: string;
      title: string;
      accent?: string;
      stats?: { value: string; unit?: string; label: string }[];
      body?: string;
      source?: string;
    }
  /** Numbered steps — how to rig it, how to cook it. */
  | {
      kind: "steps";
      photo: Photo;
      eyebrow: string;
      title: string;
      accent?: string;
      steps: string[];
    }
  /** Closing plate: a question and the subscribe line. */
  | {
      kind: "cta";
      photo: Photo;
      eyebrow: string;
      title: string;
      accent?: string;
      body?: string;
      plate: string;
    };

export type Photo = {
  /** file name under public/photos, or null to run the slide on the gradient alone */
  src: string | null;
  focus?: string;
  scale?: number;
  /** archive or heavily-compressed sources take more grain */
  grainy?: boolean;
  /** printed small, bottom left — required for anything CC BY-SA */
  credit?: string;
};

export type Post = {
  /** stable id, also the ledger key: YYYY-MM-DD-slot */
  id: string;
  slot: SlotId;
  /** the topic key, checked against POSTED.json so nothing repeats */
  topic: string;
  /** the VK wall text */
  caption: string;
  slides: Slide[];
};
