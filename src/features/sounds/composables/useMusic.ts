import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { Howl } from "howler";
import { howlerUnlocked, soundsEnabled } from "./useHowler";
import { isFeatureEnabled } from "../../../utils/features";

export interface MusicSong {
  id: string;
  title: string;
  artist: string;
  album: string;
  emoji: string;
  src: string;
  color: string;
}

export const bengaliPlaylist: MusicSong[] = [
  {
    id: 'kolkata',
    title: 'Kolkata',
    artist: 'Anupam Roy & Shantanu Moitra',
    album: 'Kolkata Melodies (Praktan / Cholo Paltai)',
    emoji: '🪕',
    src: '/sounds/music_kolkata.ogg',
    color: '#60a5fa'
  },
  {
    id: 'keno-aajkal',
    title: 'Keno Aajkal',
    artist: 'Kunal Ganjawala & Monali Thakur',
    album: 'Amanush (Sohom & Srabanti)',
    emoji: '🎶',
    src: '/sounds/music_keno.ogg',
    color: '#a855f7'
  },
  {
    id: 'luci-parbona',
    title: 'Luci / Parbona Ami Chartey Tokey',
    artist: 'Arijit Singh & Monali Thakur',
    album: 'Parbona Ami Chartey Tokey',
    emoji: '❤️',
    src: '/sounds/luci.ogg',
    color: '#f43f5e'
  },
  {
    id: 'mon-bebagi-paglu',
    title: 'Mon Bebagi',
    artist: 'Kunal Ganjawala & Akriti Kakar',
    album: 'Paglu (Dev & Koel Mallick)',
    emoji: '🎸',
    src: '/sounds/sujan_majhi.ogg',
    color: '#e11d48'
  },
  {
    id: 'dui-prithibi-title',
    title: 'Dui Prithibi (Title Song)',
    artist: 'Rana Majumder & Timir Biswas',
    album: 'Dui Prithibi (Dev, Jeet & Koel Mallick)',
    emoji: '🎬',
    src: '/sounds/music_kolkata.ogg',
    color: '#0284c7'
  },
  {
    id: 'firiye-dao',
    title: 'Firiye Dao',
    artist: 'Miles (Shafin Ahmed)',
    album: 'Protiyashar Shobdo',
    emoji: '🎤',
    src: '/sounds/bhalobashar_morshum.ogg',
    color: '#10b981'
  },
  {
    id: 'khujechi-toke',
    title: 'Khujechi Toke Raat Berate',
    artist: 'Jeet Gannguli & Monali Thakur',
    album: 'Josh (Jeet & Srabanti)',
    emoji: '✨',
    src: '/sounds/parbo_na.ogg',
    color: '#f59e0b'
  },
  {
    id: 'bolo-na-tumi-amar',
    title: 'Bolo Na Tumi Amar',
    artist: 'Monali Thakur & Zubeen Garg',
    album: 'Bolo Na Tumi Amar (Dev & Koel Mallick)',
    emoji: '💫',
    src: '/sounds/music_keno.ogg',
    color: '#ec4899'
  },
  {
    id: 'sujan-majhi',
    title: 'Sujan Majhi Re (Folk)',
    artist: 'Iman Chakraborty / Traditional Folk',
    album: 'Bengali Folk Classics',
    emoji: '⛵',
    src: '/sounds/sujan_majhi.ogg',
    color: '#34d399'
  },
  {
    id: 'bhalobashar-morshum',
    title: 'Bhalobashar Morshum',
    artist: 'Arijit Singh & Shreya Ghoshal',
    album: 'X=Prem (Dir. Srijit Mukherji)',
    emoji: '🌸',
    src: '/sounds/bhalobashar_morshum.ogg',
    color: '#fbbf24'
  },
  {
    id: 'ambient-serenade',
    title: 'Soft Ambient Serenade',
    artist: 'Calm Midnight Tones',
    album: 'Peaceful Melodies',
    emoji: '🌌',
    src: '/sounds/ambient-pads.ogg',
    color: '#38bdf8'
  }
];

export const currentTrackIndex = ref(0);
export const isPlayingMusic = ref(false);
export const musicVolume = ref(0.75);

export const currentSong = computed((): MusicSong => {
  return bengaliPlaylist[currentTrackIndex.value] ?? bengaliPlaylist[0]!;
});

const howls: Record<string, Howl> = {};

export const getHowl = (song: MusicSong): Howl => {
  if (!howls[song.id]) {
    howls[song.id] = new Howl({
      src: [song.src],
      loop: true,
      volume: musicVolume.value,
      preload: true,
      html5: true,
      onplay() { isPlayingMusic.value = true; },
      onpause() { isPlayingMusic.value = false; },
      onstop() { isPlayingMusic.value = false; },
      onend() { handleNextTrack(); }
    });
  }
  return howls[song.id]!;
};

export const stopAllMusic = () => {
  Object.values(howls).forEach(h => {
    if (h.playing()) h.stop();
  });
  isPlayingMusic.value = false;
};

export const playCurrentTrack = () => {
  if (!isFeatureEnabled("sounds")) return;
  stopAllMusic();
  const howl = getHowl(currentSong.value);
  howl.volume(musicVolume.value);
  howl.play();
  soundsEnabled.value = true;
  howlerUnlocked.value = true;
};

export const toggleMusicPlay = () => {
  if (!soundsEnabled.value) {
    soundsEnabled.value = true;
    playCurrentTrack();
    return;
  }

  const howl = getHowl(currentSong.value);
  if (howl.playing()) {
    howl.pause();
    soundsEnabled.value = false;
  } else {
    stopAllMusic();
    howl.play();
    soundsEnabled.value = true;
  }
};

export const handleNextTrack = () => {
  currentTrackIndex.value = (currentTrackIndex.value + 1) % bengaliPlaylist.length;
  if (soundsEnabled.value) {
    playCurrentTrack();
  }
};

export const handlePrevTrack = () => {
  currentTrackIndex.value = (currentTrackIndex.value - 1 + bengaliPlaylist.length) % bengaliPlaylist.length;
  if (soundsEnabled.value) {
    playCurrentTrack();
  }
};

export const selectTrack = (index: number) => {
  currentTrackIndex.value = index;
  playCurrentTrack();
};

export const setMusicVolume = (val: number) => {
  musicVolume.value = val;
  const howl = getHowl(currentSong.value);
  howl.volume(val);
};

export const useMusic = () => {
  watch([soundsEnabled, howlerUnlocked], ([enabled, unlocked]) => {
    if (!isFeatureEnabled("sounds")) return;
    if (enabled && unlocked) {
      const howl = getHowl(currentSong.value);
      if (!howl.playing()) {
        howl.play();
      }
    } else {
      stopAllMusic();
    }
  });

  onMounted(() => {
    if (!isFeatureEnabled("sounds")) return;
    if (soundsEnabled.value && howlerUnlocked.value) {
      playCurrentTrack();
    }
  });

  onUnmounted(() => {
    stopAllMusic();
  });
};
