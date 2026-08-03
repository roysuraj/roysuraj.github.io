<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { transitions } from "../../../animations";
import { t } from "../../../i18n/utils/translate";
import Social from "../../../components/Social.vue";
import videoParticles from "../../../assets/videos/particles.mp4";

const contactElement = ref<HTMLElement | null>(null);
const videoRef = ref<HTMLVideoElement | null>(null);
const bgVideoRef = ref<HTMLVideoElement | null>(null);

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.play().catch(() => {});
  }
  if (bgVideoRef.value) {
    bgVideoRef.value.play().catch(() => {});
  }
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

    <!-- Background running video loop -->
    <video
      ref="bgVideoRef"
      class="contact-section-bg-video"
      autoplay
      loop
      muted
      playsinline
      aria-hidden="true"
      :src="videoParticles"
    ></video>

    <div class="contact-content">

      <!-- Title with Howrah Bridge & River Ganga continuous video motion loop -->
      <div class="contact-hero">
        <div class="contact-kolkata-img" aria-hidden="true"></div>
        <div class="contact-river-water-effect" aria-hidden="true"></div>
        <!-- English greeting -->
        <p class="contact-bengali-greeting" aria-label="Contact Me">Contact Me</p>
        <h2 class="contact-title" v-html="t('lets-work-together')"></h2>
        <p class="contact-subtitle">Kolkata, West Bengal, India 🇮🇳 · Available for global projects</p>
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
            <span class="contact-details-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </span>
            <div>
              <p class="contact-details-label">Email</p>
              <a class="contact-details-value" href="mailto:spyrogypsertech@gmail.com">
                spyrogypsertech@gmail.com
              </a>
            </div>
          </div>
          <div class="contact-details-row">
            <span class="contact-details-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </span>
            <div>
              <p class="contact-details-label">Phone</p>
              <div style="display: flex; flex-direction: column; gap: 0.2rem;">
                <a class="contact-details-value" href="tel:+918910836042">+91 89108 36042</a>
                <a class="contact-details-value" href="tel:+919123727623">+91 91237 27623</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Social variant="background" />

      <!-- Bengali cultural identity strip -->
      <div class="contact-bengali-strip" aria-label="Bengali cultural identity">
        <span class="contact-bengali-tag">🎭 Durga Puja devotee</span>
        <span class="contact-bengali-tag">🎵 Rabindra Sangeet listener</span>
        <span class="contact-bengali-tag">🍮 Mishti Doi lover</span>
        <span class="contact-bengali-tag">🌺 Kolkata-native</span>
        <span class="contact-bengali-tag">📚 Tagore admirer</span>
        <span class="contact-bengali-tag">🚃 Tram ride nostalgia</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact {
  width: 100%;
  max-width: calc(var(--svw) * 100);
  overflow: visible;
  min-height: auto;
  height: auto;
  padding: var(--space-outer);
  padding-top: var(--space-lg);
  padding-bottom: calc(var(--space-xxl) * 2); /* Prevent footer notch overlap */
  position: relative;
  z-index: 2;

  &-section-bg-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.3;
    filter: brightness(0.4) saturate(1.2);
    z-index: 0;
    pointer-events: none;
  }

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
    padding: var(--space-md);
    grid-column: 1 / 13;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    color: var(--color-text-400);
    background: rgba(2, 12, 38, 0.7);
    border: 1px solid rgba(126,230,215,0.22);
    border-radius: 28px;
    backdrop-filter: blur(28px);
    box-shadow:
      0 2rem 6rem rgba(0,0,0,0.55),
      inset 0 1px 0 rgba(255,255,255,0.05),
      0 0 0 1px rgba(126,230,215,0.06);

    @include mixins.mq("md") {
      padding: var(--space-lg);
      gap: var(--space-lg);
    }

    @include mixins.mq("sm") { grid-column: 1 / 11; }
    @include mixins.mq("md") { grid-column: 1 / 9; }
    @include mixins.mq("lg") { grid-column: 2 / 9; }
  }

  // ── Hero: Kolkata image + title ───────────────────────────────────────
  &-hero {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    padding: 1.5rem;
    min-height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.5rem;

    @include mixins.mq("md") {
      padding: 2.4rem 2.8rem 2rem;
      min-height: 160px;
      gap: 0.6rem;
    }
  }

  &-kolkata-img {
    position: absolute;
    inset: 0;
    background-image: url("/images/kolkata_new.jpg");
    background-size: 115% 115%;
    background-position: center 60%;
    filter: brightness(0.68) saturate(1.3) contrast(1.1);
    z-index: 0;
    animation: ganga-video-loop 24s ease-in-out infinite alternate;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        rgba(2, 12, 38, 0.95) 0%,
        rgba(2, 12, 38, 0.4) 65%,
        rgba(2, 12, 38, 0.1) 100%
      );
      z-index: 1;
    }
  }

  &-river-water-effect {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: radial-gradient(circle at 50% 85%, rgba(126, 230, 215, 0.3) 0%, transparent 65%),
                linear-gradient(180deg, rgba(2, 12, 38, 0.1) 0%, rgba(126, 230, 215, 0.12) 50%, rgba(0, 45, 110, 0.35) 100%);
    mix-blend-mode: color-dodge;
    animation: water-waves 4.5s ease-in-out infinite alternate;
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
    gap: 1.6rem;
    padding: 1.5rem 1.2rem;
    border-radius: 20px;
    background: rgba(6, 14, 36, 0.85);
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

    @include mixins.mq("md") {
      padding: 2.2rem 2.6rem;
      gap: 2.4rem;
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
      flex: 0 0 auto;
      margin-top: 0.3rem;
      filter: drop-shadow(0 0 6px rgba(126,230,215,0.5));
      color: rgba(126,230,215,0.9);
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

// ── Bengali cultural greeting (above title) ──────────────────────────────────
.contact-bengali-greeting {
  position: relative;
  z-index: 1;
  font-family: "Noto Sans Bengali", "Mukti", "Vrinda", serif;
  font-size: clamp(0.85rem, 1.5vw, 1.15rem);
  color: #e8321f; /* alta red — Bengali festive foot decoration */
  letter-spacing: 0.06em;
  font-weight: 600;
  margin-bottom: 0.3rem;
  opacity: 0.88;
  text-shadow: 0 0 12px rgba(232, 50, 31, 0.4);
}

// ── Bengali cultural identity tag strip ──────────────────────────────────────
.contact-bengali-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 0.8rem;
  padding: 1.2rem 1.4rem;
  background: rgba(200, 35, 26, 0.08); /* subtle sindoor tint */
  border: 1px solid rgba(200, 35, 26, 0.3);
  border-radius: 14px;
  margin-top: 0.5rem;
}

.contact-bengali-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.85rem;
  background: rgba(200, 35, 26, 0.12);
  border: 1px solid rgba(200, 35, 26, 0.35);
  border-radius: 100px;
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(255, 210, 200, 0.92);
  letter-spacing: 0.03em;
  white-space: nowrap;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba(200, 35, 26, 0.25);
    border-color: rgba(200, 35, 26, 0.6);
  }
}

// ── Keyframes ────────────────────────────────────────────────────────────────

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

@keyframes ganga-video-loop {
  0% {
    background-position: 50% 60%;
    transform: scale(1.0);
  }
  50% {
    background-position: 48% 52%;
    transform: scale(1.06);
  }
  100% {
    background-position: 52% 68%;
    transform: scale(1.03);
  }
}

@keyframes water-waves {
  0% {
    opacity: 0.3;
    transform: translateY(0) scaleY(1);
  }
  50% {
    opacity: 0.75;
    transform: translateY(-8px) scaleY(1.06);
  }
  100% {
    opacity: 0.3;
    transform: translateY(0) scaleY(1);
  }
}

@keyframes avatar-glow {
  0%   { box-shadow: 0 0 0 6px rgba(126,230,215,0.10), 0 0 20px rgba(126,230,215,0.25), 0 8px 24px rgba(0,0,0,0.5); }
  100% { box-shadow: 0 0 0 8px rgba(126,230,215,0.22), 0 0 45px rgba(126,230,215,0.55), 0 8px 24px rgba(0,0,0,0.5); }
}
</style>
