<script setup lang="ts">
import { ref } from 'vue';
import {
  bengaliPlaylist,
  currentSong,
  currentTrackIndex,
  isPlayingMusic,
  musicVolume,
  toggleMusicPlay,
  handleNextTrack,
  handlePrevTrack,
  selectTrack,
  setMusicVolume
} from '../features/sounds/composables/useMusic';
import { soundsEnabled } from '../features/sounds/composables/useHowler';
import { t } from '../i18n/utils/translate';

const isExpanded = ref(false);

const updateVolume = (e: Event) => {
  const target = e.target as HTMLInputElement;
  setMusicVolume(parseFloat(target.value));
};
</script>

<template>
  <div class="bmp">
    <!-- Floating Music Toggle Button -->
    <button
      class="bmp__toggle"
      :class="{ 'bmp__toggle--playing': soundsEnabled && isPlayingMusic }"
      @click="isExpanded = !isExpanded"
      aria-label="Toggle Music Player"
    >
      <span class="bmp__disc" :class="{ 'bmp__disc--spin': soundsEnabled && isPlayingMusic }">
        {{ currentSong.emoji }}
      </span>
      <div class="bmp__ticker">
        <span class="bmp__ticker-title">{{ currentSong.title }}</span>
        <span class="bmp__ticker-artist">{{ currentSong.artist }}</span>
      </div>
      <span class="bmp__toggle-icon">{{ isExpanded ? '✕' : '🎵' }}</span>
    </button>

    <!-- Playlist & Controls Popup Drawer -->
    <Transition name="bmp-fade">
      <div v-if="isExpanded" class="bmp__drawer">
        <!-- Now Playing Header -->
        <div class="bmp__now-playing">
          <div class="bmp__art" :style="{ background: currentSong.color }">
            <span>{{ currentSong.emoji }}</span>
          </div>
          <div class="bmp__meta">
            <span class="bmp__tag">{{ t("music-player-now-playing") }}</span>
            <h4 class="bmp__song-name">{{ currentSong.title }}</h4>
            <p class="bmp__artist-name">{{ currentSong.artist }}</p>
            <span class="bmp__album-tag">{{ currentSong.album }}</span>
          </div>
        </div>

        <!-- Audio Control Buttons -->
        <div class="bmp__controls">
          <button class="bmp__ctrl-btn" @click="handlePrevTrack" aria-label="Previous Track">⏮️</button>
          <button class="bmp__play-btn" @click="toggleMusicPlay" aria-label="Play or Pause">
            {{ soundsEnabled && isPlayingMusic ? '⏸️' : '▶️' }}
          </button>
          <button class="bmp__ctrl-btn" @click="handleNextTrack" aria-label="Next Track">⏭️</button>
        </div>

        <!-- Volume Slider -->
        <div class="bmp__volume">
          <span class="bmp__vol-icon">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            :value="musicVolume"
            @input="updateVolume"
            class="bmp__vol-slider"
          />
        </div>

        <!-- Playlist Tracks List -->
        <div class="bmp__playlist">
          <h5 class="bmp__playlist-title">{{ t("music-player-playlist-title") }}</h5>
          <div
            v-for="(song, idx) in bengaliPlaylist"
            :key="song.id"
            class="bmp__track-item"
            :class="{ 'bmp__track-item--active': idx === currentTrackIndex }"
            @click="selectTrack(idx)"
          >
            <span class="bmp__track-emoji">{{ song.emoji }}</span>
            <div class="bmp__track-info">
              <span class="bmp__track-title">{{ song.title }}</span>
              <span class="bmp__track-artist">{{ song.artist }}</span>
            </div>
            <span v-if="idx === currentTrackIndex && soundsEnabled && isPlayingMusic" class="bmp__equalizer">
              <span /><span /><span />
            </span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.bmp {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  font-family: 'Urbanist', sans-serif;
}

/* Floating Toggle Button */
.bmp__toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px 8px 10px;
  background: rgba(8, 18, 36, 0.92);
  border: 1.5px solid rgba(126, 230, 215, 0.5);
  border-radius: 30px;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6), 0 0 16px rgba(126, 230, 215, 0.25);
  backdrop-filter: blur(12px);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: #7ee6d7;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.8), 0 0 24px rgba(126, 230, 215, 0.4);
  }
}

.bmp__disc {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: radial-gradient(circle, #2d3748, #0f172a);
  border: 1.5px solid #7ee6d7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;

  &--spin {
    animation: bmp-spin 4s linear infinite;
  }
}

@keyframes bmp-spin {
  to { transform: rotate(360deg); }
}

.bmp__ticker {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 140px;
  overflow: hidden;
}

.bmp__ticker-title {
  font-size: 11px;
  font-weight: 800;
  color: #ffffff;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 130px;
}

.bmp__ticker-artist {
  font-size: 9.5px;
  font-weight: 600;
  color: #7ee6d7;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 130px;
}

.bmp__toggle-icon {
  font-size: 14px;
  color: #7ee6d7;
}

/* Playlist Popup Drawer */
.bmp__drawer {
  position: absolute;
  bottom: 60px;
  right: 0;
  width: 310px;
  background: rgba(8, 18, 36, 0.96);
  border: 1.5px solid rgba(126, 230, 215, 0.5);
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.85), 0 0 30px rgba(126, 230, 215, 0.2);
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.bmp__now-playing {
  display: flex;
  gap: 12px;
  align-items: center;
}

.bmp__art {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
}

.bmp__meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.bmp__tag {
  font-size: 8.5px;
  font-weight: 800;
  color: #7ee6d7;
  letter-spacing: 0.1em;
}

.bmp__song-name {
  font-size: 13px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
}

.bmp__artist-name {
  font-size: 11px;
  font-weight: 600;
  color: rgba(243, 237, 227, 0.85);
  margin: 0;
}

.bmp__album-tag {
  font-size: 9px;
  color: #ffb36b;
  font-style: italic;
}

/* Controls */
.bmp__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.bmp__ctrl-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.15s ease;

  &:hover { transform: scale(1.15); }
}

.bmp__play-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7ee6d7, #2563eb);
  border: none;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(126, 230, 215, 0.4);
  transition: transform 0.2s ease;

  &:hover { transform: scale(1.08); }
}

/* Volume */
.bmp__volume {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.05);
  padding: 6px 12px;
  border-radius: 12px;
}

.bmp__vol-icon { font-size: 13px; }

.bmp__vol-slider {
  flex: 1;
  accent-color: #7ee6d7;
  cursor: pointer;
}

/* Playlist List */
.bmp__playlist {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 160px;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: rgba(126, 230, 215, 0.4); border-radius: 4px; }
}

.bmp__playlist-title {
  font-size: 9.5px;
  font-weight: 800;
  color: rgba(243, 237, 227, 0.7);
  letter-spacing: 0.12em;
  margin: 0 0 2px 0;
}

.bmp__track-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(126, 230, 215, 0.1);
    border-color: rgba(126, 230, 215, 0.3);
  }

  &--active {
    background: rgba(126, 230, 215, 0.15);
    border-color: #7ee6d7;
  }
}

.bmp__track-emoji { font-size: 15px; }

.bmp__track-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.bmp__track-title {
  font-size: 11px;
  font-weight: 700;
  color: #ffffff;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.bmp__track-artist {
  font-size: 9px;
  color: rgba(243, 237, 227, 0.7);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

/* Equalizer animation */
.bmp__equalizer {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 12px;

  span {
    width: 2px;
    background: #7ee6d7;
    animation: bmp-eq 0.8s ease-in-out infinite alternate;

    &:nth-child(1) { height: 60%; animation-delay: 0.1s; }
    &:nth-child(2) { height: 100%; animation-delay: 0.3s; }
    &:nth-child(3) { height: 40%; animation-delay: 0.5s; }
  }
}

@keyframes bmp-eq {
  0% { transform: scaleY(0.3); }
  100% { transform: scaleY(1); }
}

/* Transition */
.bmp-fade-enter-active, .bmp-fade-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.bmp-fade-enter-from, .bmp-fade-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

/* Mobile Responsiveness */
@media (max-width: 640px) {
  .bmp {
    bottom: 16px;
    right: 16px;
  }
  .bmp__drawer {
    width: 280px;
    right: 0;
    bottom: 54px;
    padding: 12px;
  }
  .bmp__ticker {
    max-width: 100px;
  }
}
</style>
