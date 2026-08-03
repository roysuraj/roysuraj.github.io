<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { locale } from "../i18n/store";
import { changeLocale } from "../i18n/utils/locale";
import { LOCALES } from "../i18n/constants";
import type { Locale } from "../i18n/types";

const props = withDefaults(
  defineProps<{
    direction?: "up" | "down";
  }>(),
  {
    direction: "down",
  }
);

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const currentLocale = computed(() => {
  const currentKey = (locale.value as Locale) || "en";
  return LOCALES[currentKey] || LOCALES.en;
});

const allLanguages = [
  { key: "en" as Locale, name: "English", short: "EN", flag: "🇬🇧" },
  { key: "bn" as Locale, name: "বাংলা", short: "BN", flag: "🇧🇩" },
  { key: "hi" as Locale, name: "हिंदी", short: "HI", flag: "🇮🇳" },
  { key: "es" as Locale, name: "Español", short: "ES", flag: "🇪🇸" },
  { key: "fr" as Locale, name: "Français", short: "FR", flag: "🇫🇷" },
  { key: "de" as Locale, name: "Deutsch", short: "DE", flag: "🇩🇪" },
];

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectLocale = (key: Locale) => {
  changeLocale(key);
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="lang-switch" ref="dropdownRef">
    <button
      class="lang-switch-btn"
      @click.stop="toggleDropdown"
      :aria-expanded="isOpen"
      aria-label="Select Language"
      data-cursor="circle-white"
      data-sound="click"
      data-hoversound="hover"
    >
      <span class="lang-flag">{{ currentLocale.flag }}</span>
      <span class="lang-short">{{ currentLocale.short }}</span>
      <svg class="lang-arrow" :class="{ 'lang-arrow-open': isOpen }" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <transition name="dropdown-fade">
      <div v-if="isOpen" class="lang-dropdown" :class="`lang-dropdown-${props.direction}`">
        <div class="lang-dropdown-header">Select Language</div>
        <div class="lang-dropdown-grid">
          <button
            v-for="item in allLanguages"
            :key="item.key"
            type="button"
            class="lang-option-card"
            :class="{ 'lang-option-card-active': (locale || 'en') === item.key }"
            @click.stop="selectLocale(item.key)"
            data-sound="click"
          >
            <div class="lang-option-card-left">
              <span class="lang-flag">{{ item.flag }}</span>
              <span class="lang-name">{{ item.name }}</span>
            </div>
            <span class="lang-badge">{{ item.short }}</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.lang-switch {
  position: relative;
  display: inline-block;
  pointer-events: auto;
  z-index: 1000;

  &-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    background: linear-gradient(135deg, rgba(8, 20, 42, 0.94) 0%, rgba(2, 12, 30, 0.94) 100%);
    border: 1.5px solid rgba(126, 230, 215, 0.5);
    border-radius: 20px;
    color: #ffffff;
    font-family: 'Urbanist', sans-serif;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
    backdrop-filter: blur(12px);
    transition: all 0.25s ease;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), 0 0 10px rgba(126, 230, 215, 0.15);

    &:hover {
      border-color: rgba(126, 230, 215, 0.9);
      background: linear-gradient(135deg, rgba(14, 34, 70, 0.95) 0%, rgba(6, 20, 45, 0.95) 100%);
      box-shadow: 0 0 20px rgba(126, 230, 215, 0.4);
      transform: translateY(-1px);
    }
  }

  .lang-flag {
    font-size: 15px;
    line-height: 1;
  }

  .lang-short {
    letter-spacing: 0.06em;
  }

  .lang-arrow {
    transition: transform 0.25s ease;
    &-open {
      transform: rotate(180deg);
    }
  }

  &-dropdown {
    position: absolute;
    right: 0;
    width: min(340px, 92vw);
    background: rgba(3, 12, 28, 0.98);
    border: 1.5px solid rgba(126, 230, 215, 0.6);
    border-radius: 18px;
    padding: 12px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.92), 0 0 32px rgba(126, 230, 215, 0.3);
    backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 99999;

    &-down {
      top: calc(100% + 12px);
      bottom: auto;
    }

    &-up {
      bottom: calc(100% + 12px);
      top: auto;
    }
  }

  .lang-dropdown-header {
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(126, 230, 215, 0.9);
    padding: 0 2px 4px 2px;
    border-bottom: 1px solid rgba(126, 230, 215, 0.2);
  }

  .lang-dropdown-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    padding-top: 4px;

    @media (max-width: 480px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .lang-option-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    background: rgba(10, 24, 48, 0.94);
    border: 1px solid rgba(126, 230, 215, 0.22);
    border-radius: 12px;
    color: rgba(243, 237, 227, 0.95);
    font-family: 'Urbanist', sans-serif;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);

    &-left {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }

    .lang-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 700;
    }

    .lang-badge {
      font-size: 9.5px;
      font-weight: 900;
      padding: 2px 5px;
      border-radius: 5px;
      background: rgba(126, 230, 215, 0.18);
      color: #7ee6d7;
      letter-spacing: 0.04em;
      flex: 0 0 auto;
    }

    &:hover {
      background: linear-gradient(135deg, rgba(0, 55, 140, 0.95) 0%, rgba(126, 230, 215, 0.3) 100%);
      border-color: rgba(126, 230, 215, 0.85);
      color: #ffffff;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    }

    &-active {
      background: linear-gradient(135deg, rgba(0, 70, 160, 0.98) 0%, rgba(8, 32, 68, 0.98) 100%);
      border-color: #7ee6d7;
      color: #ffffff;
      box-shadow: 0 0 14px rgba(126, 230, 215, 0.4);

      .lang-badge {
        background: #7ee6d7;
        color: #040e1e;
      }
    }
  }
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
