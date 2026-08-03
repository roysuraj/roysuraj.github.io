<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Vector3 } from "three";
import { camera } from "../three/core/camera";
import { sizes } from "../utils/sizes";
import gsap from "gsap";
import { sceneWeightsInOut } from "../animations/scenes";
import { room } from "../three/objects/room";

const props = withDefaults(
  defineProps<{
    point: Vector3;
    side?: "left" | "right";
    zone?: "top-left" | "bottom-left" | "right";
  }>(),
  {
    side: "left",
    zone: "bottom-left",
  }
);

const wrapperRef = ref<HTMLDivElement | null>(null);

let lastTransform = "";

const updatePosition = () => {
  if (!wrapperRef.value) return;
  if (sceneWeightsInOut.about.in === 0) return;
  if (sceneWeightsInOut.about.out === 1) return;

  const isLandscape = sizes.isLandscape;
  const { point, side, zone } = props;

  if (isLandscape) {
    const worldPoint = point.clone();
    room.group.localToWorld(worldPoint);
    const screenPos = camera.project(worldPoint);

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Convert centered screenPos (-vw/2 to vw/2) to absolute screen coordinates (0 to vw)
    const absoluteX = vw * 0.5 + screenPos.x;
    const absoluteY = vh * 0.5 + screenPos.y;

    // Measure actual card width if available, or default to 340px
    const cardChild = wrapperRef.value.firstElementChild as HTMLElement | null;
    const cardWidth = cardChild ? cardChild.clientWidth : 340;
    const margin = 24; // minimum safety gap from screen edge in px

    let minX: number;
    let maxX: number;
    let minY: number;
    let maxY: number;

    if (side === "left") {
      // Left cards sit to the left of anchor (translate -100%)
      // Left edge of card = (absoluteX - cardWidth) => absoluteX >= cardWidth + margin
      // Right edge of card = absoluteX => must not cross center hologram boy (vw * 0.38)
      minX = cardWidth + margin;
      maxX = Math.max(minX + 10, vw * 0.38);
    } else {
      // Right cards sit to the right of anchor (translate 0%)
      // Left edge of card = absoluteX => absoluteX >= vw * 0.62 (right of hologram boy)
      // Right edge of card = (absoluteX + cardWidth) => absoluteX <= vw - cardWidth - margin
      minX = vw * 0.62;
      maxX = Math.max(minX + 10, vw - cardWidth - margin);
    }

    // Zone-based vertical clamping to guarantee no card overlaps and no header collisions
    if (zone === "top-left") {
      minY = 220; // Top-left card center at 220px (top edge at ~140px, safely below top nav bar)
      maxY = Math.max(minY + 10, vh * 0.36);
    } else if (zone === "bottom-left") {
      minY = Math.max(380, vh * 0.54); // Bottom-left card center at ~540px (top edge at ~440px, well below top card)
      maxY = Math.max(minY + 10, vh * 0.82);
    } else {
      // Right zone (Skills card)
      minY = 240; // Skills card center at 240px-340px (top edge at ~140px, safely below top nav bar)
      maxY = Math.max(minY + 10, vh * 0.72);
    }

    if (minX > maxX) {
      const mid = (minX + maxX) / 2;
      minX = mid - 10;
      maxX = mid + 10;
    }

    const clampedX = Math.max(minX, Math.min(maxX, absoluteX));
    const clampedY = Math.max(minY, Math.min(maxY, absoluteY));

    // Convert back to centered coordinates for css translate
    const translateX = clampedX - vw * 0.5;
    const translateY = clampedY - vh * 0.5;

    const transform = `translate(${translateX}px, ${translateY}px)`;

    if (transform !== lastTransform) {
      wrapperRef.value.style.transform = transform;
      lastTransform = transform;
    }
  } else {
    const transform = `translate(0px, 0px)`;
    if (transform !== lastTransform) {
      wrapperRef.value.style.transform = transform;
      lastTransform = transform;
    }
  }
};

onMounted(() => {
  gsap.ticker.add(updatePosition);
});

onBeforeUnmount(() => {
  gsap.ticker.remove(updatePosition);
});
</script>

<template>
  <div ref="wrapperRef" class="projected-element">
    <slot> </slot>
  </div>
</template>

<style scoped lang="scss">
.projected-element {
  width: 100%;
  height: 100%;

  @include mixins.landscape {
    width: 0;
    height: 0;
    position: relative;
  }
}
</style>
