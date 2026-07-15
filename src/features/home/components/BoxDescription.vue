<script setup lang="ts">
import { ref, watchEffect, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { BREAKPOINTS } from "../../../utils/sizes";
import { Vector3 } from "three";
import ProjectedElement from "../../../components/ProjectedElement.vue";
import { t } from "../../../i18n/utils/translate";
import AppearingText from "../../../components/AppearingText.vue";
import PinIcon from "../../../components/icons/Pin.vue";

const point = new Vector3(5.5, -7.5, 6.75);

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
    },
    (context) => {
      const { conditions } = context;
      const { isMobile } = conditions as { isMobile: boolean; isDesktop: boolean };

      const tl = gsap.timeline({
        paused: true,
      });

      // Only animate clipPath on desktop
      if (!isMobile) {
        tl.fromTo(
          wrapperEl,
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.3, ease: "none" },
          0,
        );
      } else {
        // On mobile, ensure clipPath is set to visible immediately
        gsap.set(wrapperEl, { clipPath: "inset(0% 0% 0% 0%)" });
      }

      for (let i = 0; i < timelines.value.length; i++) {
        const item = timelines.value[i];
        if (!item) continue;
        tl.add(() => {
          item.timeline.restart(true);
        }, item.delay + 0.15);
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
  <ProjectedElement :point="point">
    <div ref="wrapperRef" class="box-description">
      <div class="box-description-content">
        <div class="box-description-details">
          <p class="box-description-details-name">Suraj Roy</p>
          <div class="box-description-details-location">
            <PinIcon class="box-description-details-location-icon" />
            <p class="box-description-details-location-copy">{{ t("location") }}</p>
          </div>
        </div>
        <div class="box-description-line"></div>
        <div class="box-description-copy">
          <AppearingText
            :text="t('about-tagline')"
            :steps="3"
            :duration="0.7"
            @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0)"
          />
        </div>
      </div>
    </div>
  </ProjectedElement>
</template>

<style scoped lang="scss">
.box-description {
  --line-length: min(48px, calc(var(--svw) * 5));

  gap: var(--space-xxs);
  position: absolute;
  bottom: var(--count-height);
  width: calc(100% - var(--space-outer) * 2);
  left: var(--space-outer);

  @include mixins.landscape {
    position: relative;
    left: 0;
    bottom: 0;
    width: 340px;
    max-width: calc(var(--svw) * 38);
    transform: translate(-100%, -50%);
    padding-top: 3px;
    padding-right: var(--line-length);
  }

  @include mixins.landscape-large {
    width: 360px;
    max-width: calc(var(--svw) * 36);
  }

  &-line {
    width: 100%;
    height: 1px;
    background-color: var(--color-cyan-400);

    @include mixins.landscape {
      display: none;
    }
  }

  &-details {
    padding: var(--space-sm) var(--space-md);
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include mixins.landscape {
      display: none;
    }

    &-name {
      font-size: var(--font-size-title-xs);
      font-weight: 700;
    }

    &-location {
      display: flex;
      align-items: center;
      gap: var(--space-xs);

      &-icon {
        width: var(--icon-size-xs);
        --icon-color: var(--color-white-400);
        transform: translateY(-1px);
      }

      &-copy {
        font-size: var(--font-size-md);
      }
    }
  }

  &-content {
    position: relative;
    border: var(--stroke-sm) solid var(--color-cyan-400);
    border-radius: var(--radius-md);
    background: linear-gradient(to bottom, rgba(0, 53, 133, 0.85) 0%, rgba(0, 20, 60, 0.85) 100%);
    backdrop-filter: blur(8px);

    @include mixins.landscape {
      padding: var(--space-xs) var(--space-sm);

      @include mixins.mq("md") {
        padding: var(--space-sm) var(--space-md);
      }
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
      transform: translateY(-50%);
      right: -36px;
      width: 36px;
      height: 36px;
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
      border-top: var(--stroke-sm) solid var(--color-cyan-400);
      z-index: 10;
    }
  }

  &-copy {
    will-change: opacity;
    font-size: var(--font-size-sm);
    padding: var(--space-sm) var(--space-md);
    word-break: break-word;
    white-space: normal;
    overflow-wrap: break-word;
    hyphens: auto;
    line-height: 1.4;

    @include mixins.landscape {
      padding: var(--space-xs);
      font-size: var(--font-size-xs);
    }

    @include mixins.landscape-large {
      padding: var(--space-sm);
      font-size: var(--font-size-sm);
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
