<script setup>
import Button from "../../../components/Button.vue";
import Banner from "../../../components/Banner.vue";
import { preloaderVisible } from "../../../composables/usePreloader";
import { t } from "../../../i18n/utils/translate";
import AppearingText from "../../../components/AppearingText.vue";
</script>

<template>
  <div class="hero">
    <div class="hero-content grid">
      <div class="hero-content-inner" id="hero-content-inner">
        <div class="hero-content-copys">
          <h1 class="hero-title">Hi,<br />I'm Suraj Kumar Roy</h1>
          <Banner class="hero-banner" :copy="t('job-title')" v-if="!preloaderVisible" animated />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  max-height: calc(var(--lvh) * 100);
  height: calc(var(--lvh) * 100);
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    align-items: flex-start !important;
  }

  &-content {
    position: relative;
    z-index: 1;
    align-items: center;
    justify-content: center;
    height: 46%;

    @media (max-width: 1024px) {
      height: auto !important;
      padding-top: 48px !important;
      align-items: flex-start !important;
      justify-content: flex-start !important;
    }

    @include mixins.landscape {
      height: 100%;

      @include mixins.mq("md") {
        padding-bottom: 30%;
      }

      @include mixins.mq("lg") {
        padding-bottom: 5%;
      }
    }

    &-inner {
      transform-origin: center center;
      grid-column: 1 / 13;
      gap: var(--space-xxl);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: fit-content;
      position: relative;
      left: 50%;
      transform: translateX(-50%);

      @include mixins.landscape {
        left: 0;
        transform: translateX(0);
        grid-column: 1 / 8;
        width: fit-content;
      }
    }

    &-copys {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      align-items: center;

      @include mixins.mq("md") {
        gap: var(--space-md);
        align-items: flex-start;
      }
    }

    &-button {
      width: fit-content;
    }
  }

  &-title {
    font-weight: 900;
    letter-spacing: 0.02em;
    font-size: clamp(2rem, 3vw, 3.2rem);
    /* Bengali poster-art feel: warm dark text */
    color: #1a1208;
    /* Adding a strong protective glow to ensure perfect clarity against the busy graffiti */
    text-shadow: 
      0 0 8px var(--color-background-400),
      0 0 16px var(--color-background-400),
      0 0 32px var(--color-background-400),
      0 0 48px var(--color-background-400);
    line-height: 1.12;

    @media (max-width: 1024px) {
      font-size: clamp(1.3rem, 5.2vw, 1.8rem) !important;
      text-align: center !important;
    }

    @include mixins.landscape {
      font-size: clamp(1.8rem, 2.6vw, 2.8rem);
    }

    @include mixins.landscape-large {
      @include mixins.mq("sm") {
        font-size: clamp(2.2rem, 3.2vw, 3.6rem);
      }

      @include mixins.mq("xl") {
        font-size: clamp(2.6rem, 4vw, 4.4rem);
      }
    }
  }

  &-banner {
    position: absolute;
    bottom: 0;
    right: -16px;
    z-index: 10;
    transform: rotate(-5deg) translate(0, 105%);

    @media (max-width: 1024px) {
      position: relative !important;
      right: auto !important;
      bottom: auto !important;
      top: auto !important;
      transform: rotate(-3deg) translate(0, 0) !important;
      margin-top: 4px !important;
      align-self: center !important;
    }
  }

}
</style>
