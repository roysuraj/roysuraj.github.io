<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { transitions } from "../../../animations";
import { t } from "../../../i18n/utils/translate";
import Social from "../../../components/Social.vue";

const contactElement = ref<HTMLElement | null>(null);

onMounted(() => {
  if (contactElement.value) {
    transitions.contact.setup(contactElement.value);
  }
});

onUnmounted(() => {
  transitions.contact.destroy();
});
</script>

<template>
  <div class="contact grid" ref="contactElement">
    <div class="contact-content">
      <h2 class="contact-title" v-html="t('lets-work-together')"></h2>
      <div class="contact-card">
        <div class="contact-dialer">
          <div class="contact-dialer-ring"></div>
        </div>
        <div class="contact-details">
          <p>Email</p>
          <a href="mailto:spyrogypsertech@gmail.com">spyrogypsertech@gmail.com</a>
          <p>Phone</p>
          <a href="tel:+918910836042">+91 89108 36042</a>
        </div>
      </div>
      <Social variant="background" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact {
  width: 100%;
  max-width: calc(var(--svw) * 100);
  overflow: hidden;
  min-height: calc(var(--lvh) * 100);
  padding: var(--space-outer);
  padding-top: var(--space-lg);

  @include mixins.mq("md") {
    padding-top: var(--space-xxl);
  }

  &-content {
    position: relative;
    padding-top: var(--space-md);
    grid-column: 1 / 13;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    color: var(--color-text-400);

    @include mixins.mq("sm") {
      grid-column: 1 / 8;
    }

    @include mixins.mq("md") {
      gap: var(--space-xl);
      grid-column: 1 / 6;
      padding-top: var(--space-lg);
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 6;
    }
  }

  &-title {
    font-weight: 900;
    letter-spacing: 0.02em;
    font-size: var(--font-size-title-md);

    @include mixins.mq("sm") {
      font-size: var(--font-size-title-lg);
    }

    @include mixins.mq("xl") {
      font-size: var(--font-size-title-xl);
    }
  }

  &-card {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    width: min(100%, 620px);
    padding: 1.6rem 2rem;
    border-radius: 28px;
    background: linear-gradient(180deg, rgba(16, 20, 29, 0.92), rgba(10, 13, 20, 0.92));
    border: 1px solid rgba(126, 230, 215, 0.18);
    backdrop-filter: blur(16px);
    box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.28);
  }

  &-dialer {
    flex: 0 0 auto;
    position: relative;
    width: 88px;
    height: 88px;
    border-radius: 50%;
    border: 1px solid rgba(126, 230, 215, 0.25);
    background: radial-gradient(circle, rgba(255, 179, 107, 0.15), rgba(255, 255, 255, 0.02));
    overflow: hidden;

    &-ring {
      position: absolute;
      inset: 12px;
      border-radius: 50%;
      border: 2px dashed rgba(255, 179, 107, 0.6);
      animation: spin 10s linear infinite;
    }
  }

  &-details {
    display: grid;
    gap: 0.35rem;
    min-width: 0;

    p {
      font-family: "ProFontWindows", monospace;
      color: #7ee6d7;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-size: 1.2rem;
    }

    a {
      color: var(--color-text-400);
      font-size: 1.8rem;
      font-weight: 700;
      word-break: break-word;
      font-family: "Urbanist";
    }
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.75; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-2px); }
}
</style>
