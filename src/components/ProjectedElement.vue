<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Vector3 } from "three";
import { camera } from "../three/core/camera";
import { sizes } from "../utils/sizes";
import gsap from "gsap";
import { sceneWeightsInOut } from "../animations/scenes";
import { room } from "../three/objects/room";

const props = defineProps<{
  point: Vector3;
}>();

const wrapperRef = ref<HTMLDivElement | null>(null);

let lastTransform = "";

const updatePosition = () => {
  if (!wrapperRef.value) return;
  if (sceneWeightsInOut.about.in === 0) return;
  if (sceneWeightsInOut.about.out === 1) return;

  const isLandscape = sizes.isLandscape;
  const { point } = props;

  if (isLandscape) {
    const worldPoint = point.clone();
    room.group.localToWorld(worldPoint);
    const screenPos = camera.project(worldPoint);

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Convert centered screenPos (-vw/2 to vw/2) to absolute screen coordinates (0 to vw)
    const absoluteX = vw * 0.5 + screenPos.x;
    const absoluteY = vh * 0.5 + screenPos.y;

    // Clamp absolute coordinates
    const minX = vw * 0.15;
    const maxX = vw * 0.85;
    const minY = vh * 0.12;
    const maxY = vh * 0.85;

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
