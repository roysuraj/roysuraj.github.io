<script setup lang="ts">
import { computed, ref, watchEffect, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { locale } from "../../../i18n/store";
import { t } from "../../../i18n/utils/translate";
import AppearingText from "../../../components/AppearingText.vue";
import { BREAKPOINTS } from "../../../utils/sizes";
import { Vector3 } from "three";
import ProjectedElement from "../../../components/ProjectedElement.vue";

const point = new Vector3(-6.5, -6.0, 6.75);

const wrapperRef = ref<HTMLDivElement | null>(null);
const timelines = ref<{ timeline: gsap.core.Timeline; delay: number }[]>([]);
const subRefs = ref<HTMLParagraphElement[]>([]);
let matchMedia: gsap.MatchMedia | null = null;

const emit = defineEmits<{
  "timeline:created": [timeline: gsap.core.Timeline];
}>();

watchEffect((onInvalidate) => {
  const wrapperEl = wrapperRef.value;
  if (!wrapperEl) return;

  if (matchMedia) {
    matchMedia.revert();
    matchMedia = null;
  }

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
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.4, ease: "none" },
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
        }, item.delay + 0.25);
      }

      // Only fade in on desktop
      if (!isMobile && subRefs.value.length > 0) {
        const subItems = subRefs.value.filter((ref) => ref !== null && ref !== undefined);
        if (subItems.length > 0) {
          tl.fromTo(subItems, { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.1 }, 0.3);
        }
      } else if (isMobile && subRefs.value.length > 0) {
        // On mobile, ensure opacity is 1 immediately
        const subItems = subRefs.value.filter((ref) => ref !== null && ref !== undefined);
        if (subItems.length > 0) {
          gsap.set(subItems, { opacity: 1 });
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

const SERVICES_EN = [
  { name: "Flutter & React Native" },
  { name: "Firebase & GCP Backend" },
  { name: "Agile/Scrum Management" },
  { name: "TypeScript Cloud Functions" },
  { name: "BigQuery & Google Analytics" },
] as const satisfies { name: string }[];

const SERVICES_DE = [
  { name: "Flutter & React Native" },
  { name: "Firebase & GCP Backend" },
  { name: "Agile/Scrum Management" },
  { name: "TypeScript Cloud Functions" },
  { name: "BigQuery & Google Analytics" },
] as const satisfies { name: string }[];

const services = computed(() => {
  return locale.value === "en" ? SERVICES_EN : SERVICES_DE;
});
</script>

<template>
  <ProjectedElement :point="point" side="right" zone="right">
    <div ref="wrapperRef" class="box-services">
      <div class="box-services-content">
        <div class="box-services-title">
          <AppearingText
            :text="t('services')"
            :steps="1"
            :duration="0.35"
            @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0)"
          />
        </div>
        <div class="box-services-list">
          <div class="box-services-list-item" v-for="(service, index) in services" :key="service.name">
            <p class="box-services-list-item-name">
              <AppearingText
                :text="service.name"
                :steps="1"
                :duration="0.35"
                @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0.15 + index * 0.1)"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  </ProjectedElement>
</template>

<style scoped lang="scss">
.box-services {
  --line-length: min(48px, calc(var(--svw) * 5));

  position: relative;
  width: 100%;
  left: 0;
  bottom: 0;

  @include mixins.landscape {
    width: auto;
    min-width: 290px;
    max-width: min(380px, calc(var(--svw) * 35));
    padding-left: var(--line-length);
    position: absolute;
    left: 0;
    top: 0;
    bottom: auto;
    padding-top: 3px;
    transform: translate(0, -50%);
  }

  @include mixins.landscape-large {
    min-width: 320px;
    max-width: 400px;
  }

  &::after,
  &::before {
    display: none;

    @include mixins.landscape {
      display: block;
    }
  }

  &-content {
    position: relative;
    border: var(--stroke-sm) solid var(--color-cyan-400);
    border-radius: var(--radius-md);
    background: linear-gradient(to bottom, rgba(0, 53, 133, 0.85) 0%, rgba(0, 20, 60, 0.85) 100%);
    backdrop-filter: blur(8px);
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    padding: var(--space-sm) var(--space-md);

    @include mixins.landscape {
      padding: var(--space-xs) var(--space-sm);
      gap: var(--space-xxs);
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
      left: 0;
      transform: translate(-100%, -50%);
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
      left: 0;
      height: 0;
      border-top: var(--stroke-sm) solid var(--color-cyan-400);
      z-index: 10;

      @include mixins.landscape {
        width: var(--line-length);
      }
    }

    @include mixins.mq("md") {
      padding: var(--space-sm) var(--space-md);
    }
  }

  &-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-xxs);

    &-item {
      display: flex;
      flex-direction: column;
      padding-left: 16px;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: 2px;
        top: 6px;
        width: 4px;
        height: 4px;
        background-color: var(--color-text-cyan-400);
        border-radius: 50%;
      }

      &-name {
        font-size: var(--font-size-sm);
        overflow-wrap: break-word;
        word-break: break-word;
        white-space: nowrap;

        @include mixins.landscape {
          font-size: var(--font-size-xs);
        }

        @include mixins.landscape-large {
          font-size: var(--font-size-sm);
        }
      }
    }
  }

  &-title {
    font-size: var(--font-size-title-xxs);
    font-weight: 700;

    @include mixins.landscape {
      font-size: var(--font-size-title-xxs);
    }

    @include mixins.landscape-large {
      font-size: var(--font-size-title-xs);
    }
  }
}
</style>

<style scoped lang="scss">
.box-avatar {
  position: absolute;
  left: -36px;
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
