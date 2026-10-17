/**
 * Shared geometry for the Stats and Story rows, measured from the reference
 * mockup in frame units (--u = 1vw, see globals.css):
 *
 *   Stats:  pill 2.2 → 80.6u · red leaf 81 → 97.6u
 *   Story:  red block 4.4u · photo → 39.3u · card 39.6 → 76.7u · pillars 77u → screen edge
 */
export const statsRow = "px-4 sm:px-8 lg:ps-[calc(var(--u)*2.2)] lg:pe-[calc(var(--u)*2.4)]";
export const statsGrid = "lg:grid-cols-[minmax(0,1fr)_calc(var(--u)*16.6)] lg:gap-[calc(var(--u)*0.4)]";

export const storyRow = "px-4 sm:px-8 lg:ps-[calc(var(--u)*4.4)] lg:pe-0";
export const storyGrid =
  "lg:grid-cols-[minmax(0,34.9fr)_minmax(0,37.1fr)_calc(var(--u)*23)] lg:gap-[calc(var(--u)*0.3)]";
