<script setup lang="ts">
import { t } from "../../../i18n/utils/translate";
import { ref, watchEffect, onBeforeUnmount } from "vue";
import gsap from "gsap";
import AppearingText from "../../../components/AppearingText.vue";
import { BREAKPOINTS } from "../../../utils/sizes";
import { Vector3 } from "three";
import PinIcon from "../../../components/icons/Pin.vue";
import ProjectedElement from "../../../components/ProjectedElement.vue";

const point = new Vector3(5.5, -3.2, 6.75);

const wrapperRef = ref<HTMLDivElement | null>(null);
const timelines = ref<{ timeline: gsap.core.Timeline; delay: number }[]>([]);
let matchMedia: gsap.MatchMedia | null = null;

const emit = defineEmits<{
  "timeline:created": [timeline: gsap.core.Timeline];
}>();

watchEffect((onInvalidate) => {
  const wrapperEl = wrapperRef.value;
  if (!wrapperEl) return;

  // Clean up previous matchMedia
  if (matchMedia) {
    matchMedia.revert();
    matchMedia = null;
  }

  // Initialize GSAP matchMedia
  matchMedia = gsap.matchMedia();

  matchMedia.add(
    {
      isMobile: `(max-width: ${BREAKPOINTS.md - 1}px)`,
      isDesktop: `(min-width: ${BREAKPOINTS.md}px)`,
      isLandscape: `(min-aspect-ratio: 1)`,
    },
    (context) => {
      const { conditions } = context;
      const { isLandscape } = conditions as { isMobile: boolean; isDesktop: boolean; isLandscape: boolean };

      const tl = gsap.timeline({
        paused: true,
      });

      // Only animate clipPath on landscape (animations disabled on portrait)
      if (isLandscape) {
        tl.fromTo(
          wrapperEl,
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.3, ease: "none" },
          0,
        );
      } else {
        // On portrait, set clipPath immediately without animation
        gsap.set(wrapperEl, { clipPath: "inset(0% 0% 0% 0%)" });
      }

      // Only add timeline animations on landscape
      if (isLandscape) {
        for (let i = 0; i < timelines.value.length; i++) {
          const item = timelines.value[i];
          if (!item) continue;
          tl.add(() => {
            item.timeline.restart(true);
          }, item.delay + 0.25);
        }
      }

      emit("timeline:created", tl);

      // Return cleanup function
      return () => {
        tl.kill();
      };
    },
  );

  onInvalidate(() => {
    if (matchMedia) {
      matchMedia.revert();
      matchMedia = null;
    }
  });
});

onBeforeUnmount(() => {
  if (matchMedia) {
    matchMedia.revert();
  }
});

const handleTimelineCreated = (timeline: gsap.core.Timeline, delay: number) => {
  const updatedTimelines = [...timelines.value, { timeline, delay }];
  timelines.value = updatedTimelines;
};
</script>

<template>
  <ProjectedElement :point="point" side="left" zone="top-left">
    <div ref="wrapperRef" class="box-details">
      <div class="box-details-content">
        <div class="box-details-title">
          <AppearingText
            text="Suraj Kumar Roy"
            :steps="1"
            :duration="0.35"
            @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0)"
          />
        </div>
        <div class="box-details-items">
          <div class="box-details-item">
            <PinIcon class="box-details-icon" />
            <AppearingText
              v-if="t('location')"
              class="box-details-content-copy"
              :text="t('location')"
              :steps="3"
              :duration="0.35"
              @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0.1)"
            />
          </div>
        </div>
      </div>
    </div>
  </ProjectedElement>
</template>

<style scoped lang="scss">
.box-details {
  --line-length: min(48px, calc(var(--svw) * 5));

  display: block;
  position: relative;
  width: 100%;

  @include mixins.landscape {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: auto;
    padding-bottom: 3px;
    padding-right: var(--line-length);
    width: auto;
    min-width: 260px;
    max-width: min(340px, calc(var(--svw) * 35));
    transform: translate(-100%, -50%);
  }

  @include mixins.landscape-large {
    min-width: 280px;
    max-width: 360px;
  }

  &-content {
    position: relative;
    border: var(--stroke-sm) solid var(--color-cyan-400);
    border-radius: var(--radius-md);
    background: linear-gradient(to bottom, rgba(0, 53, 133, 0.85) 0%, rgba(0, 20, 60, 0.85) 100%);
    backdrop-filter: blur(8px);
    gap: var(--space-xxs);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: var(--space-sm) var(--space-md);

    @include mixins.landscape {
      flex-direction: column;
      justify-content: flex-start;
      padding: var(--space-xs) var(--space-sm);
    }

    @include mixins.mq("md") {
      padding: var(--space-sm) var(--space-md);
    }

    &::after,
    &::before {
      display: none;

      @include mixins.landscape {
        display: block;
      }
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(100%, -50%);
      width: 32px;
      height: 32px;
      background-image: url("/images/code3.jpg");
      background-size: cover;
      background-position: top center;
      border-radius: 50%;
      border: 2px solid var(--color-cyan-400);
      box-shadow: 0 0 10px rgba(126, 230, 215, 0.5);
      z-index: 10;
    }

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      width: var(--line-length);
      height: 0;
      border-bottom: var(--stroke-sm) solid var(--color-cyan-400);
      z-index: 10;
    }
  }

  &-item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-xs);
    flex-direction: row;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: break-word;
    height: auto;
  }

  &-icon {
    width: var(--icon-size-xxs);
    transform: translateY(-1px);
    --icon-color: var(--color-white-400);

    @include mixins.mq("md") {
      width: var(--icon-size-xs);
    }
  }

  &-title {
    font-size: var(--font-size-title-xxs);
    font-weight: 700;

    @include mixins.mq("md") {
      font-size: var(--font-size-title-sm);
    }
  }

  &-items {
    display: flex;
    font-size: var(--font-size-sm);
    flex-direction: column;

    @include mixins.mq("md") {
      font-size: var(--font-size-md);
    }

    &-copy {
      flex: 0.5;
    }
  }
}
</style>

<style scoped lang="scss">
.box-avatar {
  position: absolute;
  right: -36px;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--color-cyan-400);
  object-fit: cover;
  z-index: 10;
  box-shadow: 0 0 10px rgba(126,230,215,0.4);
}
</style>
