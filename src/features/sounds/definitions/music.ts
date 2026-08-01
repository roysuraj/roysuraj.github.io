import { Howl } from "howler";

import type { MusicTrack } from "../types";

export const musicTracks = {
  luci: new Howl({ src: ["/sounds/music_keno.ogg"], loop: true, volume: 0, preload: true }),
  about: new Howl({ src: ["/sounds/music_kolkata.ogg"], loop: true, volume: 0, preload: true }),
} as const;

export const BASE_VOLUMES = {
  luci: 0.2,
  about: 0.3,
} as const satisfies Record<MusicTrack, number>;
