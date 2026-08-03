<script setup lang="ts">
import { ref } from "vue";
import Social from "./Social.vue";
import Clickable from "./Clickable.vue";
import LangSwitch from "./LangSwitch.vue";
import NotchSection from "./NotchSection.vue";
import LegalModal from "./LegalModal.vue";
import { t } from "../i18n/utils/translate";
import ButtonRound from "./ButtonRound.vue";
import { lenis } from "../composables/useScroll";
import ArrowRightLong from "./icons/ArrowRightLong.vue";

interface Props {
  withSocial?: boolean;
}

const activeModal = ref<"privacy" | "legal" | null>(null);

const openModal = (type: "privacy" | "legal") => {
  activeModal.value = type;
};

const closeModal = () => {
  activeModal.value = null;
};

const handleBackToTop = () => {
  if (!lenis.value) return;
  lenis.value.scrollTo(0);
};

const { withSocial = true } = defineProps<Props>();
const showAttribution = import.meta.env.VITE_SHOW_ATTRIBUTION !== "false";
</script>

<template>
  <footer class="footer">
    <NotchSection class="footer-notch" />
    <div class="footer-content">
      <div class="footer-top">
        <Social v-if="withSocial" />
        <div class="footer-top-links">
          <div class="footer-top-links-legal">
            <button
              type="button"
              class="footer-link-btn"
              @click="openModal('privacy')"
              data-sound="click"
            >
              🛡️ {{ t("privacy") }}
            </button>
            <button
              type="button"
              class="footer-link-btn"
              @click="openModal('legal')"
              data-sound="click"
            >
              ⚖️ {{ t("legal") }}
            </button>
          </div>
          <LangSwitch direction="up" />
        </div>
      </div>
      <div
        class="footer-back-to-top"
        tabindex="0"
        @click="handleBackToTop"
        @keydown.enter="handleBackToTop"
        data-cursor="circle-white"
        data-sound="click"
      >
        <ButtonRound renderAs="div" variant="border" class="children-unclickable" data-hoversound="hover">
          <ArrowRightLong class="footer-back-to-top-icon" />
        </ButtonRound>
      </div>
      <div class="footer-credits">
        <div v-if="showAttribution" class="footer-credits-built">
          <p>
            {{ t("original-concept-by") }}
          </p>
          <Clickable renderAs="div">
            <a
              href="mailto:spyrogypsertech@gmail.com"
              class="footer-link children-unclickable"
              data-cursor="circle-white"
              data-hoversound="hover"
            >
              Suraj Kumar Roy (SpyroGypserTech)
            </a>
          </Clickable>
        </div>
        <div class="footer-credits-music">
          <p>
            {{ t("music-produced-by") }}
          </p>
          <Clickable renderAs="div">
            <a
              href="https://youtube.com/@christyleillusion?si=3M-sVWZ3uzNDT655"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link children-unclickable"
              data-cursor="circle-white"
              data-hoversound="hover"
            >
              Suraj Kumar Roy (Pianist)
            </a>
          </Clickable>
        </div>
        <p>© {{ new Date().getFullYear() }} Suraj Kumar Roy. All Rights Reserved.</p>
      </div>
    </div>

    <!-- Scrollable Modal for Privacy & Legal Notice -->
    <LegalModal :type="activeModal" @close="closeModal" />
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: var(--color-background-300, var(--color-beige-400));
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xl);
    width: 100%;
    max-width: calc(var(--breakpoint-xxxl));
    padding: calc(var(--space-outer) + var(--space-sm)) var(--space-outer);
    position: relative;
  }

  &-back-to-top {
    cursor: pointer;

    @include mixins.mq("md") {
      position: absolute;
      top: calc(var(--space-outer) + var(--space-sm));
      left: 50%;
      transform: translateX(-50%);
    }

    &-icon {
      transform: rotate(-90deg);
    }
  }

  &-top {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-xl);

    @include mixins.mq("md") {
      gap: var(--space-md);
      flex-direction: row;
    }

    &-links {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-md);

      &-legal {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
        flex-wrap: wrap;
        justify-content: center;
      }

      @include mixins.mq("md") {
        gap: var(--space-lg);
        flex-direction: row;
        position: relative;
        margin-left: auto;
      }
    }
  }

  &-link {
    font-family: inherit;
    font-weight: 700;
    color: inherit;
    background: none;
    border: none;
    padding: 0;
    font-size: inherit;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      color: var(--color-text-cyan-400, #7ee6d7);
    }
  }

  &-link-btn {
    font-family: 'Urbanist', sans-serif;
    font-weight: 800;
    color: #ffffff !important;
    background: linear-gradient(135deg, #061838 0%, #020c20 100%) !important;
    border: 1.5px solid rgba(126, 230, 215, 0.7) !important;
    border-radius: 20px;
    padding: 8px 18px;
    font-size: 13.5px;
    cursor: pointer;
    text-decoration: none;
    pointer-events: auto !important;
    position: relative;
    z-index: 100 !important;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.25s ease;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5), 0 0 12px rgba(126, 230, 215, 0.2);

    &:hover {
      background: linear-gradient(135deg, #0a2656 0%, #041634 100%) !important;
      border-color: #7ee6d7 !important;
      color: #7ee6d7 !important;
      box-shadow: 0 0 20px rgba(126, 230, 215, 0.5);
      transform: translateY(-2px);
    }
  }

  &-credits {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
    width: 100%;
    font-size: var(--font-size-sm);
    text-align: center;

    &-built,
    &-music {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--space-xxs);
    }
  }

  &-notch {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    color: var(--color-background-300, var(--color-beige-400));
    --icon-color: var(--color-background-300, var(--color-beige-400));
  }
}
</style>
