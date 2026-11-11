/** Real job photos supplied by the client, served from /public/images/work. */
export const WORK_PHOTOS = Array.from({ length: 22 }, (_, i) => `/images/work/work-${String(i + 1).padStart(2, "0")}.jpg`);
