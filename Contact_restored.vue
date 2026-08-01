<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { transitions } from "../../../animations";
import { t } from "../../../i18n/utils/translate";
import Social from "../../../components/Social.vue";
import lottie from "lottie-web";

const contactElement = ref<HTMLElement | null>(null);
const lottiePersonRef = ref<HTMLElement | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let personAnim: any = null;

// A rich developer/person working Lottie animation (inline so no CDN needed)
// Source style: tech person at desk with floating UI elements
const developerAnimData = {
  v: "5.9.0", fr: 30, ip: 0, op: 150, w: 300, h: 300,
  nm: "developer", ddd: 0, assets: [],
  layers: [
    // Background circle glow
    {
      ddd: 0, ind: 10, ty: 4, nm: "bg-glow", sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [20] }, { t: 75, s: [45] }, { t: 150, s: [20] }] },
        r: { a: 0, k: 0 }, p: { a: 0, k: [150, 155, 0] }, a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0, shapes: [{ ty: "gr", it: [
        { ty: "el", s: { a: 0, k: [260, 260] }, p: { a: 0, k: [0, 0] } },
        { ty: "fl", c: { a: 0, k: [0.2, 0.5, 0.9, 1] }, o: { a: 0, k: 100 } },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ]}],
      ip: 0, op: 150, st: 0
    },
    // Body torso
    {
      ddd: 0, ind: 1, ty: 4, nm: "body", sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 20, s: [2] }, { t: 40, s: [0] }, { t: 60, s: [-2] }, { t: 80, s: [0] }, { t: 150, s: [0] }] },
        p: { a: 1, k: [{ t: 0, s: [150, 175, 0], e: [150, 172, 0] }, { t: 40, s: [150, 172, 0], e: [150, 175, 0] }, { t: 80, s: [150, 175, 0] }] },
        a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0, shapes: [{ ty: "gr", it: [
        { ty: "rc", r: { a: 0, k: 20 }, s: { a: 0, k: [90, 80] }, p: { a: 0, k: [0, 0] } },
        { ty: "fl", c: { a: 0, k: [0.2, 0.4, 0.85, 1] }, o: { a: 0, k: 100 } },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ]}],
      ip: 0, op: 150, st: 0
    },
    // Head
    {
      ddd: 0, ind: 2, ty: 4, nm: "head", sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 30, s: [5] }, { t: 60, s: [0] }, { t: 90, s: [-5] }, { t: 120, s: [0] }, { t: 150, s: [0] }] },
        p: { a: 0, k: [150, 108, 0] }, a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0, shapes: [{ ty: "gr", it: [
        { ty: "el", s: { a: 0, k: [66, 72] }, p: { a: 0, k: [0, 0] } },
        { ty: "fl", c: { a: 0, k: [0.95, 0.78, 0.60, 1] }, o: { a: 0, k: 100 } },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ]}],
      ip: 0, op: 150, st: 0
    },
    // Hair
    {
      ddd: 0, ind: 3, ty: 4, nm: "hair", sr: 1,
      ks: { o: { a: 0, k: 100 }, r: { a: 0, k: 0 }, p: { a: 0, k: [150, 88, 0] }, a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] } },
      ao: 0, shapes: [{ ty: "gr", it: [
        { ty: "el", s: { a: 0, k: [70, 48] }, p: { a: 0, k: [0, 0] } },
        { ty: "fl", c: { a: 0, k: [0.25, 0.12, 0.05, 1] }, o: { a: 0, k: 100 } },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ]}],
      ip: 0, op: 150, st: 0
    },
    // Left eye
    {
      ddd: 0, ind: 4, ty: 4, nm: "eye-l", sr: 1,
      ks: { o: { a: 0, k: 100 }, r: { a: 0, k: 0 }, p: { a: 0, k: [135, 107, 0] }, a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] } },
      ao: 0, shapes: [{ ty: "gr", it: [
        { ty: "el", s: { a: 0, k: [10, 10] }, p: { a: 0, k: [0, 0] } },
        { ty: "fl", c: { a: 0, k: [0.15, 0.1, 0.05, 1] }, o: { a: 0, k: 100 } },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ]}],
      ip: 0, op: 150, st: 0
    },
    // Right eye
    {
      ddd: 0, ind: 5, ty: 4, nm: "eye-r", sr: 1,
      ks: { o: { a: 0, k: 100 }, r: { a: 0, k: 0 }, p: { a: 0, k: [165, 107, 0] }, a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] } },
      ao: 0, shapes: [{ ty: "gr", it: [
        { ty: "el", s: { a: 0, k: [10, 10] }, p: { a: 0, k: [0, 0] } },
        { ty: "fl", c: { a: 0, k: [0.15, 0.1, 0.05, 1] }, o: { a: 0, k: 100 } },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ]}],
      ip: 0, op: 150, st: 0
    },
    // Smile
    {
      ddd: 0, ind: 6, ty: 4, nm: "smile", sr: 1,
      ks: { o: { a: 0, k: 100 }, r: { a: 0, k: 0 }, p: { a: 0, k: [150, 118, 0] }, a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] } },
      ao: 0, shapes: [{ ty: "gr", it: [
        { ty: "sr", sy: 1, d: 1, pt: { a: 0, k: 3 }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 8 }, or: { a: 0, k: 10 }, os: { a: 0, k: 0 }, ix: 1 },
        { ty: "st", c: { a: 0, k: [0.7, 0.3, 0.2, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 3 }, lc: 2, lj: 2 },
        { ty: "tr", p: { a: 0, k: [0, 2] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 50] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ]}],
      ip: 0, op: 150, st: 0
    },
    // Left arm raised (wave)
    {
      ddd: 0, ind: 7, ty: 4, nm: "arm-l", sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ t: 0, s: [-30] }, { t: 25, s: [10] }, { t: 50, s: [-30] }, { t: 75, s: [10] }, { t: 100, s: [-30] }, { t: 150, s: [-30] }] },
        p: { a: 0, k: [112, 158, 0] }, a: { a: 0, k: [0, 30, 0] }, s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0, shapes: [{ ty: "gr", it: [
        { ty: "rc", r: { a: 0, k: 8 }, s: { a: 0, k: [18, 60] }, p: { a: 0, k: [0, 30] } },
        { ty: "fl", c: { a: 0, k: [0.95, 0.78, 0.60, 1] }, o: { a: 0, k: 100 } },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ]}],
      ip: 0, op: 150, st: 0
    },
    // Right arm
    {
      ddd: 0, ind: 8, ty: 4, nm: "arm-r", sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ t: 0, s: [25] }, { t: 40, s: [-10] }, { t: 80, s: [25] }, { t: 150, s: [25] }] },
        p: { a: 0, k: [188, 158, 0] }, a: { a: 0, k: [0, 30, 0] }, s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0, shapes: [{ ty: "gr", it: [
        { ty: "rc", r: { a: 0, k: 8 }, s: { a: 0, k: [18, 60] }, p: { a: 0, k: [0, 30] } },
        { ty: "fl", c: { a: 0, k: [0.95, 0.78, 0.60, 1] }, o: { a: 0, k: 100 } },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ]}],
      ip: 0, op: 150, st: 0
    },
    // Floating star/sparkle 1
    {
      ddd: 0, ind: 11, ty: 4, nm: "spark1", sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [0] }, { t: 20, s: [100] }, { t: 50, s: [0] }, { t: 150, s: [0] }] },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 50, s: [180] }, { t: 100, s: [360] }, { t: 150, s: [540] }] },
        p: { a: 1, k: [{ t: 0, s: [215, 80, 0], e: [225, 60, 0] }, { t: 50, s: [225, 60, 0] }] },
        a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0, shapes: [{ ty: "gr", it: [
        { ty: "sr", sy: 1, d: 1, pt: { a: 0, k: 4 }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 14 }, or: { a: 0, k: 7 }, os: { a: 0, k: 0 }, ix: 1 },
        { ty: "fl", c: { a: 0, k: [1, 0.85, 0.2, 1] }, o: { a: 0, k: 100 } },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ]}],
      ip: 0, op: 150, st: 0
    },
    // Floating star 2
    {
      ddd: 0, ind: 12, ty: 4, nm: "spark2", sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 30, s: [0] }, { t: 55, s: [100] }, { t: 90, s: [0] }, { t: 150, s: [0] }] },
        r: { a: 1, k: [{ t: 0, s: [45] }, { t: 75, s: [225] }, { t: 150, s: [405] }] },
        p: { a: 0, k: [85, 90, 0] },
        a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [80, 80, 100] }
      },
      ao: 0, shapes: [{ ty: "gr", it: [
        { ty: "sr", sy: 1, d: 1, pt: { a: 0, k: 4 }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 12 }, or: { a: 0, k: 6 }, os: { a: 0, k: 0 }, ix: 1 },
        { ty: "fl", c: { a: 0, k: [0.49, 0.89, 0.85, 1] }, o: { a: 0, k: 100 } },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ]}],
      ip: 0, op: 150, st: 30
    },
    // Floating envelope / message icon
    {
      ddd: 0, ind: 13, ty: 4, nm: "envelope", sr: 1,
      ks: {
        o: { a: 0, k: 90 },
        r: { a: 0, k: -15 },
        p: { a: 1, k: [{ t: 0, s: [215, 175, 0], e: [215, 162, 0] }, { t: 60, s: [215, 162, 0], e: [215, 175, 0] }, { t: 120, s: [215, 175, 0] }] },
        a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0, shapes: [
        { ty: "gr", it: [
          { ty: "rc", r: { a: 0, k: 5 }, s: { a: 0, k: [42, 30] }, p: { a: 0, k: [0, 0] } },
          { ty: "fl", c: { a: 0, k: [1, 0.7, 0.2, 1] }, o: { a: 0, k: 100 } },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ]},
        { ty: "gr", it: [
          { ty: "sh", ks: { a: 0, k: { i: [[0,0],[0,0],[0,0]], o: [[0,0],[0,0],[0,0]], v: [[-21,-12],[0,5],[21,-12]], c: false } } },
          { ty: "st", c: { a: 0, k: [0.98, 0.98, 0.98, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 2.5 }, lc: 2, lj: 2 },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ]}
      ],
      ip: 0, op: 150, st: 0
    },
    // Location pin (Kolkata marker)
    {
      ddd: 0, ind: 14, ty: 4, nm: "pin", sr: 1,
      ks: {
        o: { a: 0, k: 90 },
        r: { a: 0, k: 12 },
        p: { a: 1, k: [{ t: 0, s: [82, 165, 0], e: [82, 155, 0] }, { t: 75, s: [82, 155, 0], e: [82, 165, 0] }, { t: 150, s: [82, 165, 0] }] },
        a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0, shapes: [
        { ty: "gr", it: [
          { ty: "el", s: { a: 0, k: [22, 22] }, p: { a: 0, k: [0, -5] } },
          { ty: "fl", c: { a: 0, k: [0.49, 0.89, 0.85, 1] }, o: { a: 0, k: 100 } },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ]},
        { ty: "gr", it: [
          { ty: "sh", ks: { a: 0, k: { i: [[0,0],[0,0],[0,0]], o: [[0,0],[0,0],[0,0]], v: [[-6,-2],[0,10],[6,-2]], c: true } } },
          { ty: "fl", c: { a: 0, k: [0.49, 0.89, 0.85, 1] }, o: { a: 0, k: 100 } },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ]}
      ],
      ip: 0, op: 150, st: 0
    }
  ]
};

onMounted(() => {
  if (contactElement.value) {
    transitions.contact.setup(contactElement.value);
  }

  if (lottiePersonRef.value) {
    personAnim = lottie.loadAnimation({
      container: lottiePersonRef.value,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: developerAnimData,
    });
  }
});

onUnmounted(() => {
  transitions.contact.destroy();
  personAnim?.destroy();
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
        <!-- Lottie animated person waving -->
        <div class="contact-person" aria-label="Animated developer greeting">
          <div class="contact-person-lottie" ref="lottiePersonRef"></div>
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
    background-image: url("/images/kolkata.jpg");
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

  // ── Lottie person ────────────────────────────────────────────────────
  &-person {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;

    &-lottie {
      width: 120px;
      height: 120px;
    }

    &-label {
      font-size: 1.1rem;
      color: rgba(126,230,215,0.75);
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
</style>
