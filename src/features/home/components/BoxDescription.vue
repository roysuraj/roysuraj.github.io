<script setup lang="ts">
import { ref, watchEffect, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { BREAKPOINTS } from "../../../utils/sizes";
import { Vector3 } from "three";
import ProjectedElement from "../../../components/ProjectedElement.vue";
import { t } from "../../../i18n/utils/translate";
import AppearingText from "../../../components/AppearingText.vue";
import WorkExperienceModal from "../../../components/WorkExperienceModal.vue";

const isExpModalOpen = ref(false);

const openExpModal = (e?: Event) => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  isExpModalOpen.value = true;
};

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
  <ProjectedElement :point="point" side="left" zone="bottom-left">
    <div ref="wrapperRef" class="box-description">
      <div class="box-description-content">
        <!-- Compact Mobile Header -->
        <div class="box-mobile-header">
          <h3 class="box-mobile-name">Suraj Kumar Roy</h3>
          <p class="box-mobile-location">📍 Kolkata, West Bengal, India</p>
        </div>

        <div class="box-description-copy">
          <AppearingText
            :text="t('about-tagline')"
            :steps="3"
            :duration="0.7"
            @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0)"
          />
        </div>

        <!-- Skills Summary Pills -->
        <div class="box-description-skills">
          <p class="box-section-title">⚡ Core Tech Stack:</p>
          <div class="box-skill-pills">
            <span class="skill-pill">Flutter</span>
            <span class="skill-pill">Java</span>
            <span class="skill-pill">Kotlin</span>
            <span class="skill-pill">Swift</span>
            <span class="skill-pill">React Native</span>
            <span class="skill-pill">SQL</span>
            <span class="skill-pill">Firebase</span>
            <span class="skill-pill">GCP</span>
            <span class="skill-pill">.NET Core</span>
          </div>
        </div>

        <!-- Industry Experience Tags & Action Button -->
        <div class="box-description-exp">
          <p class="box-description-exp-title">🏢 Proven Experience (5 Companies):</p>
          <div class="box-description-exp-tags">
            <span class="box-exp-tag">Inland</span>
            <span class="box-exp-tag">Ionio</span>
            <span class="box-exp-tag">Cloudcraftz</span>
            <span class="box-exp-tag">Craftveda</span>
            <span class="box-exp-tag">Distarise</span>
          </div>
          <button class="box-exp-btn" @click="openExpModal" @touchend.prevent="openExpModal" type="button">
            💼 View Work History & Roles ↗
          </button>
        </div>
      </div>
    </div>
  </ProjectedElement>

  <!-- Work Experience Modal Dialog -->
  <WorkExperienceModal :isOpen="isExpModalOpen" @close="isExpModalOpen = false" />
</template>

<style scoped lang="scss">
.box-description {
  --line-length: min(48px, calc(var(--svw) * 5));

  gap: var(--space-xxs);
  position: relative;
  width: 100%;
  left: 0;
  bottom: 0;

  @include mixins.landscape {
    position: absolute;
    left: 0;
    top: 0;
    bottom: auto;
    width: auto;
    min-width: 320px;
    max-width: min(400px, calc(var(--svw) * 40));
    transform: translate(-100%, -50%);
    padding-top: 3px;
    padding-right: var(--line-length);
  }

  @include mixins.landscape-large {
    min-width: 340px;
    max-width: 440px;
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
    display: none !important;

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

    @media (max-width: 767px) {
      padding: 10px 14px;
    }

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

  &-exp {
    padding: 0 var(--space-md) var(--space-sm) var(--space-md);
    border-top: 1px dashed rgba(126, 230, 215, 0.3);
    margin-top: 4px;
    padding-top: 8px;

    @include mixins.landscape {
      padding: 0 var(--space-xs) var(--space-xs) var(--space-xs);
      padding-top: 6px;
    }

    &-title {
      font-size: 11px;
      font-weight: 700;
      color: #ffb36b;
      margin-bottom: 6px;
    }

    &-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
  }
}

.box-mobile-header {
  display: none;
  padding: 8px 12px 4px 12px;

  @media (max-width: 767px) {
    display: block;
  }
}

.box-mobile-name {
  font-size: 15px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
}

.box-mobile-location {
  font-size: 11px;
  color: #7ee6d7;
  margin: 2px 0 0 0;
  font-weight: 600;
}

.box-description-skills {
  padding: 6px 12px;
  border-top: 1px dashed rgba(126, 230, 215, 0.3);
  margin-top: 4px;
}

.box-section-title {
  font-size: 10.5px;
  font-weight: 700;
  color: #7ee6d7;
  margin: 0 0 4px 0;
}

.box-skill-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.skill-pill {
  display: inline-block;
  padding: 2px 7px;
  background: rgba(126, 230, 215, 0.15);
  border: 1px solid rgba(126, 230, 215, 0.4);
  border-radius: 100px;
  font-size: 9.5px;
  font-weight: 700;
  color: #ffffff;
}

.box-exp-tag {
  display: inline-block;
  padding: 2px 7px;
  background: rgba(126, 230, 215, 0.12);
  border: 1px solid rgba(126, 230, 215, 0.35);
  border-radius: 100px;
  font-size: 9.5px;
  font-weight: 700;
  color: #ffffff;
}

.box-exp-btn {
  position: relative;
  z-index: 9999;
  pointer-events: auto !important;
  cursor: pointer !important;
  touch-action: manipulation;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 8px;
  padding: 8px 12px;
  background: linear-gradient(135deg, #c8231a 0%, #a0150e 100%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 100px;
  color: #ffffff;
  font-family: 'Urbanist', sans-serif;
  font-size: 11px;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(200, 35, 26, 0.5);
  transition: all 0.2s ease;

  &:hover, &:active {
    background: linear-gradient(135deg, #e5281e 0%, #c8231a 100%);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(200, 35, 26, 0.7);
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
