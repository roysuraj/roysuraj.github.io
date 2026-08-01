import { ref, watch, onMounted } from "vue";
import { resources } from "../utils/resources";
import gsap from "gsap";

export const preloaderVisible = ref(true);
export const trainJourneyComplete = ref(false);

export const usePreloader = () => {
  const resourcesProgress = ref(0);
  const resourcesReady = ref(false);

  onMounted(() => {
    resources.on("progress", (newProgress) => {
      resourcesProgress.value = newProgress;
      if (newProgress >= 1) {
        resourcesReady.value = true;
      }
    });
  });

  // Hide preloader only when BOTH resources are loaded AND train journey is complete
  watch(
    [resourcesReady, trainJourneyComplete],
    ([resReady, trainDone]) => {
      if (resReady && trainDone) {
        const preloader = document.querySelector(".preloader") as HTMLElement;
        gsap.delayedCall(0.2, () => {
          document.body.classList.remove("is-loading");
          if (preloader) preloader.classList.add("preloader-hidden");
          preloaderVisible.value = false;
        });
      }
    },
    { immediate: true },
  );
};
