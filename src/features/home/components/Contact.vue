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
  position: relative;
  z-index: 2;

  @include mixins.mq("md") {
    padding-top: var(--space-xxl);
  }

  &-content {
    position: relative;
    z-index: 2;
    padding-top: var(--space-md);
    padding-bottom: var(--space-lg);
    grid-column: 1 / 13;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    color: var(--color-text-400);
    background: linear-gradient(
      135deg,
      rgba(0, 36, 80, 0.92) 0%,
      rgba(0, 53, 133, 0.88) 50%,
      rgba(0, 82, 145, 0.85) 100%
    );
    border: 1px solid rgba(126, 230, 215, 0.2);
    border-radius: 28px;
    padding: var(--space-lg);
    backdrop-filter: blur(20px);
    box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.4);

    @include mixins.mq("sm") {
      grid-column: 1 / 11;
    }

    @include mixins.mq("md") {
      gap: var(--space-xl);
      grid-column: 1 / 9;
      padding-top: var(--space-lg);
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 9;
    }
  }

  &-title {
    font-weight: 900;
    letter-spacing: 0.02em;
    font-size: var(--font-size-title-md);
    color: #ffffff;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

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
    padding: 2.5rem 3rem;
    border-radius: 28px;
    background: linear-gradient(180deg, rgba(16, 20, 29, 0.95), rgba(10, 13, 20, 0.95));
    border: 2px solid rgba(126, 230, 215, 0.6);
    backdrop-filter: blur(16px);
    box-shadow: 0 0 3rem rgba(126, 230, 215, 0.3);
    animation: pulse-glow 3s infinite alternate;
    transform: scale(1.02);

    @media (max-width: 767px) {
      flex-direction: column;
      text-align: center;
    }
  }

  &-dialer {
    flex: 0 0 auto;
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid rgba(126, 230, 215, 0.4);
    background: radial-gradient(circle, rgba(255, 179, 107, 0.25), rgba(255, 255, 255, 0.05));
    overflow: hidden;
    box-shadow: 0 0 2rem rgba(255, 179, 107, 0.3);

    &-ring {
      position: absolute;
      inset: 12px;
      border-radius: 50%;
      border: 3px dashed rgba(255, 179, 107, 0.8);
      animation: spin 8s linear infinite;
    }
  }

  &-details {
    display: grid;
    gap: 0.5rem;
    min-width: 0;

    p {
      font-family: "ProFontWindows", monospace;
      color: #ffb36b;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-size: 1.5rem;
      font-weight: 700;
      text-shadow: 0px 2px 5px rgba(255, 179, 107, 0.5);
    }

    a {
      background: linear-gradient(90deg, #ffb36b, #7ee6d7, #ffb36b);
      background-size: 200% auto;
      color: transparent;
      background-clip: text;
      -webkit-background-clip: text;
      font-size: clamp(1.4rem, 2.2vw, 2.2rem);
      font-weight: 900;
      letter-spacing: 0.03em;
      animation: gradient-flow 4s linear infinite;
      text-shadow: 0px 4px 15px rgba(126, 230, 215, 0.3);
      display: inline-block;
      transition: transform 0.3s ease;
      word-break: normal;
      overflow-wrap: anywhere;
      font-family: "Urbanist";

      &:hover {
        transform: scale(1.03);
      }
    }
  }
}

@keyframes gradient-flow {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

@keyframes pulse-glow {
  0% { box-shadow: 0 0 2rem rgba(126, 230, 215, 0.2); }
  100% { box-shadow: 0 0 5rem rgba(126, 230, 215, 0.5); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.75; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-2px); }
}
</style>
