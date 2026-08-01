<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { transitions } from "../../../animations";
import BoxDescription from "./BoxDescription.vue";
import BoxServices from "./BoxServices.vue";
import BoxDetails from "./BoxDetails.vue";
import ProgressCount from "./ProgressCount.vue";

const contentDescriptionRef = ref<HTMLDivElement | null>(null);
const contentServicesRef = ref<HTMLDivElement | null>(null);
const contentDetailsRef = ref<HTMLDivElement | null>(null);
const contentProgressCountRef = ref<HTMLDivElement | null>(null);
const tlDescriptionRef = ref<gsap.core.Timeline | null>(null);
const tlServicesRef = ref<gsap.core.Timeline | null>(null);
const tlDetailsRef = ref<gsap.core.Timeline | null>(null);

const portraitRef = ref<HTMLImageElement | null>(null);

const props = defineProps<{
  spacerRef: HTMLElement | null;
}>();

watchEffect((onInvalidate) => {
  if (
    props.spacerRef &&
    tlDescriptionRef.value &&
    contentDescriptionRef.value &&
    tlServicesRef.value &&
    contentServicesRef.value &&
    contentDetailsRef.value &&
    tlDetailsRef.value &&
    contentProgressCountRef.value &&
    portraitRef.value
  ) {
    transitions.about.setup({
      about: props.spacerRef,
      contentDescription: contentDescriptionRef.value,
      tlDescription: tlDescriptionRef.value,
      contentServices: contentServicesRef.value,
      tlServices: tlServicesRef.value,
      contentDetails: contentDetailsRef.value,
      tlDetails: tlDetailsRef.value,
      contentProgressCount: contentProgressCountRef.value,
      portrait: portraitRef.value,
    });
  }

  onInvalidate(() => {
    transitions.about.destroy();
  });
});
</script>

<template>
  <div class="about-content">
    <div ref="contentDetailsRef" class="about-details">
      <BoxDetails @timeline:created="(tl: gsap.core.Timeline) => (tlDetailsRef = tl)" />
    </div>
    <div ref="contentDescriptionRef" class="about-description">
      <BoxDescription @timeline:created="(tl: gsap.core.Timeline) => (tlDescriptionRef = tl)" />
    </div>
    <div ref="contentServicesRef" class="about-services">
      <BoxServices @timeline:created="(tl: gsap.core.Timeline) => (tlServicesRef = tl)" />
    </div>
    <div ref="contentProgressCountRef" class="about-progress-count">
      <ProgressCount />
    </div>
    <img ref="portraitRef" class="about-portrait" src="/images/code3.jpg" alt="Suraj Roy portrait" />
  </div>
</template>

<style scoped lang="scss">
.about {
  &-content {
    position: absolute;
    color: var(--color-text-cyan-400);
    font-family: "ProFontWindows";
    top: 0;
    width: 100%;
    padding: var(--space-outer);
    left: 50%;
    transform: translateX(-50%);
    height: calc(var(--lvh) * 100);
    overflow: hidden;

    --count-height: calc(max(calc((var(--lvh) - var(--svh)) * 100), 36px) + var(--space-outer));
  }

  &-portrait {
    opacity: 0; /* Hidden by default, faded in by GSAP */
    position: absolute;
    right: var(--space-outer);
    top: 50%;
    transform: translateY(-50%);
    width: 100px;
    height: 130px;
    object-fit: cover;
    border-radius: 16px;
    border: 1px solid rgba(126, 230, 215, 0.25);
    box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.35);
    z-index: 1;

    @media (max-width: 767px) {
      position: relative;
      right: auto;
      top: auto;
      transform: none;
      width: 80px;
      height: 100px;
      margin-top: var(--space-md);
    }
  }

  &-details,
  &-description,
  &-services {
    display: flex;
    justify-content: center;
    align-items: center;
    will-change: transform, opacity;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding-right: calc(100px + var(--space-outer) * 2);

    @include mixins.landscape {
      width: 100%;
      height: 0;
      top: 50%;
      overflow: visible;
    }

    @media (max-width: 767px) {
      padding-right: 0;
      position: relative;
      height: auto;
    }
  }

  &-progress-count {
    will-change: transform, opacity;
    position: absolute;
    bottom: 0;
    left: var(--space-outer);
    width: calc(100% - var(--space-outer) * 2);
  }
}
</style>
