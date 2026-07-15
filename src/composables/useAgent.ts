import { onMounted, ref } from "vue";

export const isTouch = ref(false);

export const useAgent = () => {
  onMounted(() => {
    isTouch.value =
      window.matchMedia
        ? window.matchMedia("(pointer: coarse)").matches && !window.matchMedia("(hover: hover)").matches
        : "ontouchstart" in window;
  });

  return {
    isTouch,
  };
};
