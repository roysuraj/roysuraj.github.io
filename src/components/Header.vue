<script setup lang="ts">
import Logo from "./Logo.vue";
import { computed, ref } from "vue";
import { t } from "../i18n/utils/translate";
import { useHeaderTheme } from "../composables/useHeaderTheme";
import { lenis } from "../composables/useScroll";
import { projectId } from "../composables/useRouteObserver";
import ButtonRound from "./ButtonRound.vue";
import ArrowRight from "./icons/ArrowRight.vue";
import LangSwitch from "./LangSwitch.vue";
import { isFeatureEnabled } from "../utils/features";
import { useRouter } from "../composables/useRouter";
import { useFirstRoute } from "../composables/useFirstRoute";

import GetInTouchModal from "./GetInTouchModal.vue";

const router = useRouter();
const { isFirstRoute } = useFirstRoute();

const scrolledPastHeroVisible = ref(false);
const isGetInTouchOpen = ref(false);

const handleGetInTouchClick = (e: MouseEvent) => {
  e.preventDefault();
  isGetInTouchOpen.value = true;
};

const { isDarkTheme } = useHeaderTheme({
  onUpdate: (element, boundingClientRect, hasScrolledIntoView) => {
    if (!element || !boundingClientRect) {
      scrolledPastHeroVisible.value = false;
      return;
    }

    if (hasScrolledIntoView) {
      scrolledPastHeroVisible.value = true;
    } else {
      scrolledPastHeroVisible.value = false;
    }
  },
});

const handleBackClick = () => {
  // If it's the first route the user visited, navigate to home
  // Otherwise, go back in browser history
  if (isFirstRoute.value) {
    router.push("/");
  } else {
    router.back();
  }
};

const handleLogoClick = () => {
  lenis.value?.scrollTo("#hero");
};

const classNames = computed(() => {
  return {
    header: true,
    "header-dark": isDarkTheme.value,
    "header-scrolled": scrolledPastHeroVisible.value,
    [`project-${projectId.value}`]: projectId.value !== null,
  };
});
</script>

<template>
  <header :class="classNames">
    <div class="header-left">
      <ButtonRound
        v-if="projectId !== null"
        variant="accent"
        @click="handleBackClick"
        :aria-label="t('back-to-home')"
        :class="{ 'header-back': true, 'header-back-isProjectPage': projectId !== null }"
        data-cursor="circle-white"
        data-sound="click"
        data-hoversound="hover"
      >
        <ArrowRight class="header-back-icon" />
      </ButtonRound>
    </div>
    <div
      :class="{
        'header-logo': true,
        'header-logo-isProjectPage': projectId !== null,
        'header-logo-clickable': scrolledPastHeroVisible,
        'children-unclickable': true,
      }"
      @click="handleLogoClick"
      data-sound="click"
      data-hoversound="hover"
      data-cursor="circle-white"
    >
      <Logo class="header-logo-image" />
    </div>
    <div class="header-right">
      <button
        type="button"
        class="header-get-in-touch"
        :aria-label="t('get-in-touch')"
        @click="handleGetInTouchClick"
        data-cursor="circle-white"
        data-hoversound="hover"
        data-sound="click"
      >
        {{ t("get-in-touch") }}
      </button>
      <LangSwitch class="header-lang-switch" />
      <SoundsToggle class="header-sounds-toggle" :isDarkTheme="isDarkTheme" v-if="isFeatureEnabled('sounds')" />
    </div>
  </header>

  <!-- Get In Touch Modal with Resume PDF viewer & Email Direct -->
  <GetInTouchModal :isOpen="isGetInTouchOpen" @close="isGetInTouchOpen = false" />
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 50%;
  transform: translateX(-50%);
  width: var(--breakpoint-xxxl);
  padding: 0 var(--space-outer);
  max-width: 100%;
  z-index: var(--z-index-header);
  height: var(--height-header);
  pointer-events: none;

  --scrolled: 0;

  @media (max-width: 1024px) {
    align-items: flex-start !important;
    padding-top: 10px !important;
    padding-right: 12px !important;
    padding-left: 12px !important;
    height: auto !important;
    min-height: 0 !important;
  }

  &-scrolled {
    --scrolled: 1;
  }

  &-back {
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    transition-delay: 0.1s;
    pointer-events: auto;

    &-icon {
      width: 100%;
      transform: rotate(180deg);
    }

    &-isProjectPage {
      pointer-events: auto;
      opacity: 1;
    }
  }

  &-left {
    display: flex;
    align-items: center;
    z-index: 100;
  }

  :deep(.header-lang-switch),
  &-lang-switch {
    display: inline-flex !important;

    @media (max-width: 1024px) {
      :deep(.lang-switch-btn),
      button {
        padding: 4px 9px !important;
        font-size: 11px !important;
        border-radius: 100px !important;
      }
    }
  }

  &-right {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    z-index: 100;
    pointer-events: auto;
    margin-left: auto !important;

    @media (max-width: 1024px) {
      position: fixed !important;
      top: 10px !important;
      right: 12px !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-end !important;
      justify-content: flex-start !important;
      gap: 6px !important;
      z-index: 999999 !important;
      pointer-events: auto !important;
    }
  }

  &-sounds-toggle {
    display: flex;
  }

  &-dark {
    color: var(--color-white-400);
    --icon-color: var(--color-white-400);
  }

  &-get-in-touch {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    height: 38px !important;
    padding: 0 18px !important;
    font-family: 'Urbanist', 'Inter', sans-serif !important;
    font-size: 12px !important;
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;
    text-transform: uppercase !important;
    color: #ffffff !important;
    background: linear-gradient(135deg, #c8231a 0%, #a0150e 100%) !important;
    border-radius: 100px !important;
    box-shadow: 0 4px 14px rgba(200, 35, 26, 0.45) !important;
    white-space: nowrap !important;
    flex-shrink: 0 !important;
    visibility: visible !important;
    opacity: 1 !important;
    pointer-events: auto !important;
    text-decoration: none !important;
    transition: all 0.2s ease !important;

    &:hover {
      background: linear-gradient(135deg, #e5281e 0%, #c8231a 100%) !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 6px 18px rgba(200, 35, 26, 0.6) !important;
    }

    @media (max-width: 1024px) {
      height: 32px !important;
      padding: 0 12px !important;
      font-size: 10.5px !important;
      line-height: 32px !important;
    }

    &-isProjectPage {
      opacity: 1 !important;
    }
  }

  &-logo {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    transition: all 0.2s ease-in-out;
    opacity: 1 !important;
    pointer-events: auto !important;
    
    position: fixed !important;
    left: 16px !important;
    top: 12px !important;
    transform: none !important;
    z-index: 999999 !important;

    @media (max-width: 767px) {
      left: 12px !important;
      top: 10px !important;
    }

    &-clickable {
      pointer-events: all;
    }

    @include mixins.mq("md") {
      gap: var(--space-sm);
    }

    &-isProjectPage {
      transition: opacity 0.2s ease-in-out;
      pointer-events: none;
      opacity: 0;
    }

    &-image {
      width: 36px;

      @include mixins.mq("md") {
        width: 40px;
      }
    }

    &-text {
      font-weight: 900;
      font-size: 18px;

      @media (max-width: 540px) {
        display: none !important;
      }

      @include mixins.mq("md") {
        font-size: 20px;
      }
    }
  }
}
</style>
