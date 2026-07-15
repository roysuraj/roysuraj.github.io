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

    <!-- Floating gradient decorative boxes (background layer) -->
    <div class="contact-deco contact-deco-1" aria-hidden="true"></div>
    <div class="contact-deco contact-deco-2" aria-hidden="true"></div>
    <div class="contact-deco contact-deco-3" aria-hidden="true"></div>

    <div class="contact-content">

      <!-- Title with Kolkata skyline image clipped behind it -->
      <div class="contact-hero">
        <div class="contact-kolkata-img" aria-hidden="true"></div>
        <h2 class="contact-title" v-html="t('lets-work-together')"></h2>
        <p class="contact-subtitle">Kolkata, India 🇮🇳 · Available for global projects</p>
      </div>

      <!-- Card: Lottie person + contact details -->
      <div class="contact-card">
        <!-- Portrait photo -->
        <div class="contact-person">
          <img class="contact-person-photo" src="/images/code3.jpg" alt="Suraj Roy" />
          <span class="contact-person-label">Let's connect!</span>
        </div>

        <div class="contact-details">
          <div class="contact-details-row">
            <span class="contact-details-icon">✉</span>
            <div>
              <p class="contact-details-label">Email</p>
              <a class="contact-details-value" href="mailto:spyrogypsertech@gmail.com">
                spyrogypsertech@gmail.com
              </a>
            </div>
          </div>
          <div class="contact-details-row">
            <span class="contact-details-icon">📞</span>
            <div>
              <p class="contact-details-label">Phone</p>
              <a class="contact-details-value" href="tel:+918910836042">+91 89108 36042</a>
            </div>
          </div>
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

  // ── Decorative floating gradient boxes ──────────────────────────────
  &-deco {
    position: absolute;
    border-radius: 18px;
    pointer-events: none;
    z-index: 0;
    backdrop-filter: blur(6px);

    &-1 {
      width: 160px; height: 110px;
      top: 10%; right: 10%;
      background: linear-gradient(135deg, rgba(78,60,220,0.40) 0%, rgba(78,205,196,0.28) 100%);
      border: 1px solid rgba(126,230,215,0.35);
      box-shadow: 0 12px 40px rgba(78,60,220,0.25), inset 0 1px 0 rgba(255,255,255,0.1);
      animation: float-deco 6s ease-in-out infinite;
      @media (max-width: 767px) { display: none; }
    }

    &-2 {
      width: 110px; height: 160px;
      top: 38%; right: 5%;
      background: linear-gradient(135deg, rgba(255,140,60,0.38) 0%, rgba(94,40,200,0.28) 100%);
      border: 1px solid rgba(255,179,107,0.4);
      box-shadow: 0 12px 40px rgba(255,140,60,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
      animation: float-deco 8s ease-in-out infinite reverse;
      @media (max-width: 767px) { display: none; }
    }

    &-3 {
      width: 130px; height: 85px;
      bottom: 16%; right: 16%;
      background: linear-gradient(135deg, rgba(78,205,196,0.35) 0%, rgba(40,180,160,0.20) 100%);
      border: 1px solid rgba(78,205,196,0.4);
      box-shadow: 0 12px 40px rgba(78,205,196,0.22), inset 0 1px 0 rgba(255,255,255,0.08);
      animation: float-deco 7s ease-in-out infinite 1.2s;
      @media (max-width: 767px) { display: none; }
    }
  }

  // ── Main content panel ────────────────────────────────────────────────
  &-content {
    position: relative;
    z-index: 2;
    padding: var(--space-lg);
    grid-column: 1 / 13;
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    color: var(--color-text-400);
    background: linear-gradient(
      145deg,
      rgba(2, 12, 38, 0.95) 0%,
      rgba(0, 30, 80, 0.92) 55%,
      rgba(4, 48, 105, 0.90) 100%
    );
    border: 1px solid rgba(126,230,215,0.22);
    border-radius: 28px;
    backdrop-filter: blur(28px);
    box-shadow:
      0 2rem 6rem rgba(0,0,0,0.55),
      inset 0 1px 0 rgba(255,255,255,0.05),
      0 0 0 1px rgba(126,230,215,0.06);

    @include mixins.mq("sm") { grid-column: 1 / 11; }
    @include mixins.mq("md") { grid-column: 1 / 9; }
    @include mixins.mq("lg") { grid-column: 2 / 9; }
  }

  // ── Hero: Kolkata image + title ───────────────────────────────────────
  &-hero {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    padding: 2.4rem 2.8rem 2rem;
    min-height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.6rem;
  }

  &-kolkata-img {
    position: absolute;
    inset: 0;
    background-image: url("/images/kolkata_new.jpg");
    background-size: cover;
    background-position: center 60%;
    filter: brightness(0.38) saturate(1.1);
    z-index: 0;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        rgba(2, 12, 38, 0.95) 0%,
        rgba(2, 12, 38, 0.5) 60%,
        rgba(2, 12, 38, 0.1) 100%
      );
    }
  }

  &-title {
    position: relative;
    z-index: 1;
    font-weight: 900;
    letter-spacing: -0.025em;
    line-height: 1.08;
    font-family: "Urbanist", "Inter", sans-serif;
    font-size: var(--font-size-title-md);
    background: linear-gradient(135deg, #ffffff 0%, #7ee6d7 45%, #ffb36b 78%, #ffffff 100%);
    background-size: 280% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    animation: shimmer 6s linear infinite;

    @include mixins.mq("sm") { font-size: var(--font-size-title-lg); }
    @include mixins.mq("xl") { font-size: var(--font-size-title-xl); }
  }

  &-subtitle {
    position: relative;
    z-index: 1;
    font-size: 1.3rem;
    letter-spacing: 0.06em;
    color: rgba(126,230,215,0.80);
    font-family: "Urbanist", "Inter", sans-serif;
    font-weight: 500;
  }

  // ── Card ─────────────────────────────────────────────────────────────
  &-card {
    display: flex;
    align-items: center;
    gap: 2.4rem;
    padding: 2.2rem 2.6rem;
    border-radius: 20px;
    background: linear-gradient(160deg, rgba(6,14,36,0.98) 0%, rgba(4,22,60,0.96) 100%);
    border: 1.5px solid rgba(126,230,215,0.45);
    box-shadow:
      0 0 40px rgba(126,230,215,0.12),
      0 18px 50px rgba(0,0,0,0.45),
      inset 0 1px 0 rgba(126,230,215,0.08);
    animation: card-pulse 4.5s ease-in-out infinite alternate;
    position: relative;

    @media (max-width: 640px) {
      flex-direction: column;
      text-align: center;
    }
  }

  // ── Portrait photo ───────────────────────────────────────────────────
  &-person {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;

    &-photo {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center top;
      border: 3px solid rgba(126, 230, 215, 0.7);
      box-shadow:
        0 0 0 6px rgba(126, 230, 215, 0.12),
        0 0 30px rgba(126, 230, 215, 0.35),
        0 8px 24px rgba(0, 0, 0, 0.5);
      animation: avatar-glow 3s ease-in-out infinite alternate;
    }

    &-label {
      font-size: 1.1rem;
      color: rgba(126, 230, 215, 0.80);
      font-weight: 600;
      letter-spacing: 0.04em;
      font-family: "Urbanist", sans-serif;
      text-align: center;
    }
  }

  // ── Details rows ─────────────────────────────────────────────────────
  &-details {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    min-width: 0;
    flex: 1;

    &-row {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    &-icon {
      font-size: 2rem;
      line-height: 1;
      flex: 0 0 auto;
      margin-top: 0.3rem;
      filter: drop-shadow(0 0 6px rgba(126,230,215,0.5));
    }

    &-label {
      font-family: "ProFontWindows", "Courier New", monospace;
      color: #ffb36b;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-size: 1.2rem;
      font-weight: 700;
      text-shadow: 0 0 8px rgba(255,179,107,0.55);
      margin-bottom: 0.2rem;
    }

    &-value {
      background: linear-gradient(90deg, #ffffff 0%, #7ee6d7 50%, #ffb36b 100%);
      background-size: 200% auto;
      color: transparent;
      background-clip: text;
      -webkit-background-clip: text;
      font-size: clamp(1.25rem, 1.9vw, 1.9rem);
      font-weight: 800;
      font-family: "Urbanist", "Inter", sans-serif;
      letter-spacing: 0.015em;
      animation: gradient-flow 5s linear infinite;
      display: inline-block;
      transition: transform 0.25s ease, filter 0.25s ease;
      word-break: break-all;

      &:hover {
        transform: scale(1.03) translateX(3px);
        filter: brightness(1.2);
      }
    }
  }
}

// ── Keyframes ────────────────────────────────────────────────────────────

@keyframes shimmer {
  0%   { background-position: 0% 50%; }
  100% { background-position: 280% 50%; }
}

@keyframes gradient-flow {
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

@keyframes card-pulse {
  0%   { box-shadow: 0 0 20px rgba(126,230,215,0.08), 0 18px 50px rgba(0,0,0,0.45); }
  100% { box-shadow: 0 0 55px rgba(126,230,215,0.28), 0 18px 50px rgba(0,0,0,0.45); }
}

@keyframes float-deco {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33%       { transform: translateY(-14px) rotate(1.8deg); }
  66%       { transform: translateY(-7px) rotate(-1.2deg); }
}

@keyframes avatar-glow {
  0%   { box-shadow: 0 0 0 6px rgba(126,230,215,0.10), 0 0 20px rgba(126,230,215,0.25), 0 8px 24px rgba(0,0,0,0.5); }
  100% { box-shadow: 0 0 0 8px rgba(126,230,215,0.22), 0 0 45px rgba(126,230,215,0.55), 0 8px 24px rgba(0,0,0,0.5); }
}
</style>
