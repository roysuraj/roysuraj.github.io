<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';

const emit = defineEmits<{
  (e: 'complete'): void;
}>();

const containerRef = ref<HTMLElement | null>(null);
const trainRef = ref<HTMLElement | null>(null);
const svgPathRef = ref<SVGPathElement | null>(null);
const progressFillRef = ref<HTMLElement | null>(null);

const activeStationIndex = ref(0);
const stationPositions = ref<{ left: number; top: number }[]>([]);

const currentStation = computed((): typeof stations[number] => stations[activeStationIndex.value] ?? stations[0]!);

// Time of Day state: 'dawn' | 'day' | 'sunset' | 'night'
const currentLighting = ref<'dawn' | 'day' | 'sunset' | 'night'>('day');

const stations = [
  {
    year: '2000',
    label: 'Born',
    emoji: '👶',
    ratio: 0.06,
    lighting: 'dawn' as const,
    passengers: '👨‍👩‍👦 Mom & Dad',
    badge: '❤️ Family Blessing',
    giggles: '🥰 Soft lullabies & parents\' unconditional love',
    sceneName: '🌅 Sunrise Mountain'
  },
  {
    year: '2002–05',
    label: 'Nursery & KG',
    emoji: '🎒',
    ratio: 0.22,
    lighting: 'day' as const,
    passengers: '👨‍👩‍👦 + 👶 Childhood Pals',
    badge: '🎈 Toy Games & Giggles',
    giggles: '😄 First friends, innocent laughs & crayon fun',
    sceneName: '☀️ Sunny Valley'
  },
  {
    year: '2005–16',
    label: 'School',
    emoji: '🏫',
    ratio: 0.38,
    lighting: 'day' as const,
    passengers: '🧑‍🤝‍🧑 School Gang',
    badge: '🍱 Lunch Break Laughter',
    giggles: '🤣 Tiffin stealing, classroom pranks & endless giggles',
    sceneName: '🌊 Ocean Coast'
  },
  {
    year: '2016–18',
    label: 'High School',
    emoji: '📚',
    ratio: 0.52,
    lighting: 'sunset' as const,
    passengers: '🎒 Best Friends Squad',
    badge: '😆 Exam Bench Memories',
    giggles: '🏫 Last bench jokes, sports day cheers & high fives',
    sceneName: '🌅 Golden Horizon'
  },
  {
    year: '2018–22',
    label: 'B.Tech',
    emoji: '🎓',
    ratio: 0.68,
    lighting: 'sunset' as const,
    passengers: '🎓 College & Hostel Mates',
    badge: '🎉 Late Night Canteen',
    giggles: '💻 Coding marathons, chai breaks & hostel laughter',
    sceneName: '🎢 Coaster Thrills'
  },
  {
    year: '2022–26',
    label: 'Job',
    emoji: '💼',
    ratio: 0.83,
    lighting: 'night' as const,
    passengers: '💼 Office Mates & Teammates',
    badge: '☕ Coffee & High Fives',
    giggles: '🚀 Team victories, funny Slack chats & coffee breaks',
    sceneName: '⚡ Tech Dusk City'
  },
  {
    year: '2023–25',
    label: 'MBA',
    emoji: '📖',
    ratio: 0.95,
    lighting: 'night' as const,
    passengers: '📖 MBA Batchmates',
    badge: '🌟 Dream & Achieve',
    giggles: '🏆 Group projects, presentation cheers & future goals',
    sceneName: '🌌 Starlit Jungle'
  },
];

// Pre-generate random star positions
const stars = Array.from({ length: 65 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 55,
  size: Math.random() * 2.5 + 0.5,
  delay: Math.random() * 3,
  duration: Math.random() * 2 + 1.5,
}));

let tl: gsap.core.Timeline | null = null;

const handleSkip = () => {
  if (tl) {
    tl.progress(1);
  }
};

onMounted(() => {
  if (!containerRef.value || !trainRef.value || !svgPathRef.value) return;

  const pathEl = svgPathRef.value;
  const totalLen = pathEl.getTotalLength();

  // Position stations along exact SVG path coordinates (percentage of 1000x650 viewBox)
  stationPositions.value = stations.map(st => {
    const pt = pathEl.getPointAtLength(st.ratio * totalLen);
    return {
      left: (pt.x / 1000) * 100,
      top: (pt.y / 650) * 100,
    };
  });

  const stationEls = containerRef.value.querySelectorAll('.tj__station');
  gsap.set(trainRef.value, { xPercent: -50, yPercent: -50 });
  gsap.set(stationEls, { xPercent: -50, yPercent: -100 });

  const trainProgress = { value: 0 };

  const updateTrainOnPath = () => {
    if (!pathEl || !trainRef.value) return;
    const currentLen = trainProgress.value * totalLen;
    const pt = pathEl.getPointAtLength(currentLen);
    const lookAhead = Math.min(totalLen, currentLen + 6);
    const nextPt = pathEl.getPointAtLength(lookAhead);

    const angleRad = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x);
    const angleDeg = angleRad * (180 / Math.PI);

    gsap.set(trainRef.value, {
      left: (pt.x / 1000) * 100 + '%',
      top: (pt.y / 650) * 100 + '%',
      rotation: angleDeg,
    });
  };

  // Initial position calculation
  updateTrainOnPath();

  const timeline = gsap.timeline({
    onUpdate() {
      if (progressFillRef.value) {
        progressFillRef.value.style.transform = `scaleX(${this.progress()})`;
      }
    },
    onComplete() {
      emit('complete');
    },
  });
  tl = timeline;

  /* ───────── Phase 1 : Scene intro ───────── */
  timeline.from(containerRef.value, { opacity: 0, duration: 0.4 }, 0);

  // Header & Profile Photo
  timeline.from(containerRef.value.querySelector('.tj__header')!, {
    opacity: 0,
    y: -25,
    duration: 0.6,
    ease: 'power2.out',
  }, 0.2);

  timeline.from(containerRef.value.querySelector('.tj__profile')!, {
    opacity: 0,
    scale: 0.6,
    duration: 0.6,
    ease: 'back.out(1.7)',
  }, 0.25);

  // Full-screen SVG Track draws in
  timeline.from(svgPathRef.value, {
    strokeDashoffset: totalLen,
    strokeDasharray: totalLen,
    duration: 0.8,
    ease: 'power2.out',
  }, 0.2);

  /* ───────── Phase 2 & 3: Ultra-Slow 0.025x Train Journey with Station Pauses (~38s Total) ───────── */
  timeline.fromTo(trainRef.value, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.5);

  let currentTime = 0.6;
  let currentPos = 0;

  stations.forEach((st, i) => {
    // 1. Move train slowly from currentPos to station.ratio
    const travelTime = (st.ratio - currentPos) * 36; // Ultra-slow 0.025x speed
    timeline.to(trainProgress, {
      value: st.ratio,
      duration: Math.max(2.5, travelTime),
      ease: 'power1.inOut',
      onUpdate: updateTrainOnPath,
    }, currentTime);

    currentTime += Math.max(2.5, travelTime);

    // 2. Active station trigger & reveal
    const revealTime = currentTime;
    timeline.call(() => {
      activeStationIndex.value = i;
      currentLighting.value = st.lighting;
    }, undefined, revealTime);

    const el = stationEls[i];
    if (el) {
      timeline.fromTo(
        el,
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        revealTime,
      );
    }

    // 3. Station Pause (2.5 seconds gentle pause at each station so user can easily read memory bubble & carriage text!)
    const pauseDuration = 2.5;
    timeline.to(trainProgress, {
      value: st.ratio + 0.008,
      duration: pauseDuration,
      ease: 'none',
      onUpdate: updateTrainOnPath,
    }, currentTime);

    currentTime += pauseDuration;
    currentPos = st.ratio + 0.008;
  });

  // Final stretch to end of track
  timeline.to(trainProgress, {
    value: 1,
    duration: 2.0,
    ease: 'power1.out',
    onUpdate: updateTrainOnPath,
  }, currentTime);

  currentTime += 2.0;

  /* ───────── Phase 4 : Final Celebration & Fade out ───────── */
  timeline.to(trainRef.value, {
    scale: 1.1,
    duration: 0.25,
    yoyo: true,
    repeat: 3,
    ease: 'power1.inOut',
  }, currentTime);

  timeline.to(containerRef.value, {
    opacity: 0,
    duration: 1.0,
    ease: 'power2.in',
  }, currentTime + 0.5);
});

onUnmounted(() => {
  tl?.kill();
  tl = null;
});
</script>

<template>
  <div class="tj" :class="['tj--' + currentLighting]" ref="containerRef">
    <!-- ── Dynamic Day & Night Sky Backdrop ── -->
    <div class="tj__sky-bg" />

    <!-- ── Sun & Moon ── -->
    <div class="tj__celestial">
      <div class="tj__sun" />
      <div class="tj__moon" />
    </div>

    <!-- ── Daytime Clouds ── -->
    <div class="tj__clouds">
      <div class="tj__cloud tj__cloud--1">☁️</div>
      <div class="tj__cloud tj__cloud--2">☁️</div>
    </div>

    <!-- ── Starfield (Night) ── -->
    <div class="tj__stars">
      <div
        v-for="star in stars"
        :key="star.id"
        class="tj__star"
        :style="{
          left: star.x + '%',
          top: star.y + '%',
          width: star.size + 'px',
          height: star.size + 'px',
          animationDelay: star.delay + 's',
          animationDuration: star.duration + 's',
        }"
      />
    </div>

    <!-- ── Organized Realistic Scenery Backdrop ── -->
    <div class="tj__scenes">
      <!-- Mountain Range Backdrop (Left) -->
      <div class="tj__mountains">
        <div class="tj__mountain-peak tj__mountain-peak--1" />
        <div class="tj__mountain-peak tj__mountain-peak--2" />
      </div>

      <!-- Ocean & Water (Right) -->
      <div class="tj__sea">
        <div class="tj__sea-water">
          <div class="tj__sea-wave tj__sea-wave--1" />
          <div class="tj__sea-wave tj__sea-wave--2" />
        </div>
      </div>
    </div>

    <!-- ── Full-Screen Winding SVG Railway Track & Bridge Pillars ── -->
    <svg class="tj__track-svg" viewBox="0 0 1000 650" preserveAspectRatio="none">
      <!-- Steel Bridge Support Girders & Pillars -->
      <g stroke="rgba(126, 230, 215, 0.15)" stroke-width="2" fill="none">
        <line x1="300" y1="310" x2="300" y2="460" />
        <line x1="520" y1="310" x2="520" y2="460" />
        <line x1="720" y1="310" x2="720" y2="460" />
        <line x1="180" y1="460" x2="180" y2="600" />
        <line x1="480" y1="460" x2="480" y2="600" />
        <line x1="680" y1="460" x2="680" y2="600" />
      </g>

      <!-- Track Outer Glow -->
      <path
        d="M -80,310 C 20,310 60,310 100,310 C 300,310 400,310 520,310 C 720,310 840,310 900,320 C 980,330 990,410 940,440 C 880,470 780,460 680,460 C 480,460 280,460 180,460 C 80,460 40,520 80,550 C 140,580 340,570 500,570 C 680,570 800,570 880,570 C 960,570 1000,570 1080,570"
        fill="none"
        stroke="rgba(126, 230, 215, 0.22)"
        stroke-width="14"
      />
      <!-- Wooden Railway Ties / Sleepers -->
      <path
        d="M -80,310 C 20,310 60,310 100,310 C 300,310 400,310 520,310 C 720,310 840,310 900,320 C 980,330 990,410 940,440 C 880,470 780,460 680,460 C 480,460 280,460 180,460 C 80,460 40,520 80,550 C 140,580 340,570 500,570 C 680,570 800,570 880,570 C 960,570 1000,570 1080,570"
        fill="none"
        stroke="rgba(90, 65, 45, 0.85)"
        stroke-width="10"
        stroke-dasharray="4,8"
      />
      <!-- Main Steel Rails -->
      <path
        ref="svgPathRef"
        d="M -80,310 C 20,310 60,310 100,310 C 300,310 400,310 520,310 C 720,310 840,310 900,320 C 980,330 990,410 940,440 C 880,470 780,460 680,460 C 480,460 280,460 180,460 C 80,460 40,520 80,550 C 140,580 340,570 500,570 C 680,570 800,570 880,570 C 960,570 1000,570 1080,570"
        fill="none"
        stroke="#e8820c"
        stroke-width="3.5"
      />
    </svg>

    <!-- ── Stations (Path-Anchored Clean Boxed Cards) ── -->
    <div
      v-for="(station, index) in stations"
      :key="station.label"
      class="tj__station"
      :style="stationPositions[index] ? { left: stationPositions[index].left + '%', top: stationPositions[index].top + '%' } : {}"
    >
      <div class="tj__station-card">
        <span class="tj__station-emoji">{{ station.emoji }}</span>
        <div class="tj__station-info">
          <span class="tj__station-label">{{ station.label }}</span>
          <span class="tj__station-year">{{ station.year }}</span>
        </div>
      </div>
      <div class="tj__station-pole" />
      <div class="tj__station-marker" />
    </div>

    <!-- ── Realistic Multi-Car Express Train ── -->
    <div class="tj__train" ref="trainRef">
      <!-- Dynamic Memory Bubble -->
      <div class="tj__bubble">
        <span class="tj__bubble-icon">💬</span>
        <span class="tj__bubble-text">{{ currentStation.giggles }}</span>
      </div>

      <!-- Carriage 1: Family Coach (Mom & Dad) -->
      <div class="tj__coach tj__coach--family">
        <div class="tj__coach-roof" />
        <div class="tj__coach-body">
          <span class="tj__coach-title">FAMILY</span>
          <div class="tj__coach-windows">
            <div class="tj__win"><span class="tj__pass">👨‍👩‍👦</span></div>
          </div>
        </div>
        <div class="tj__wheel tj__wheel--c1" />
        <div class="tj__wheel tj__wheel--c2" />
      </div>

      <div class="tj__coupler" />

      <!-- Carriage 2: Milestone Friends & Mates Coach -->
      <div class="tj__coach tj__coach--milestone">
        <div class="tj__coach-roof" />
        <div class="tj__coach-body">
          <span class="tj__coach-title">{{ currentStation.badge }}</span>
          <div class="tj__coach-windows">
            <div class="tj__win"><span class="tj__pass">{{ currentStation.passengers }}</span></div>
          </div>
        </div>
        <div class="tj__wheel tj__wheel--c3" />
        <div class="tj__wheel tj__wheel--c4" />
      </div>

      <div class="tj__coupler" />

      <!-- Locomotive Engine -->
      <div class="tj__engine">
        <div class="tj__smoke">
          <div class="tj__smoke-puff" />
          <div class="tj__smoke-puff" />
          <div class="tj__smoke-puff" />
        </div>
        <div class="tj__headlight" />
        <div class="tj__chimney" />
        <div class="tj__cab">
          <div class="tj__win"><span style="font-size: 10px;">👦</span></div>
        </div>
        <div class="tj__boiler">
          <div class="tj__boiler-stripe" />
        </div>
        <div class="tj__grill" />
        <div class="tj__wheel tj__wheel--e1" />
        <div class="tj__wheel tj__wheel--e2" />
        <div class="tj__wheel tj__wheel--e3" />
      </div>
    </div>

    <!-- ── Compact Top Header Bar ── -->
    <div class="tj__header">
      <h1 class="tj__name">
        SURAJ KUMAR ROY
        <span class="tj__badge">🚂 The Career Express</span>
      </h1>
      <div class="tj__contact">
        <a href="tel:+918910836042" class="tj__contact-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          <span>+91 89108 36042</span>
        </a>
        <span class="tj__contact-dot">•</span>
        <a href="tel:+919123727623" class="tj__contact-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          <span>+91 91237 27623</span>
        </a>
        <span class="tj__contact-dot">•</span>
        <a href="mailto:spyrogypsertech@gmail.com" class="tj__contact-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          <span>spyrogypsertech@gmail.com</span>
        </a>
      </div>
    </div>

    <!-- ── Top Left Skip Button ── -->
    <button class="tj__skip" @click="handleSkip">Skip →</button>

    <!-- ── Top Right Profile Photo ── -->
    <div class="tj__profile">
      <img src="/images/code3.jpg" alt="Suraj Kumar Roy" class="tj__profile-photo" />
      <span class="tj__profile-status" />
    </div>

    <!-- ── Bottom Progress bar ── -->
    <div class="tj__progress">
      <div class="tj__progress-fill" ref="progressFillRef" />
    </div>
  </div>
</template>

<style scoped lang="scss">
/* ═════════════════════════════════════════════
   Train Journey — Clean Boxed Cards & Day/Night
   ═════════════════════════════════════════════ */

.tj {
  position: absolute;
  inset: 0;
  overflow: hidden;
  font-family: 'Urbanist', sans-serif;
  transition: background 1.5s ease;

  /* ── Sky Gradients (Day & Night) ── */
  &--dawn {
    .tj__sky-bg {
      background: linear-gradient(180deg, #ff7e5f 0%, #feb47b 40%, #1c2b42 100%);
    }
    .tj__sun { opacity: 0.85; transform: translate(-50%, 25%); }
    .tj__moon { opacity: 0; }
    .tj__clouds { opacity: 0.6; }
    .tj__stars { opacity: 0; }
  }

  &--day {
    .tj__sky-bg {
      background: linear-gradient(180deg, #1e5799 0%, #2989d8 45%, #207cca 70%, #152d4a 100%);
    }
    .tj__sun { opacity: 1; transform: translate(-50%, 0); }
    .tj__moon { opacity: 0; }
    .tj__clouds { opacity: 1; }
    .tj__stars { opacity: 0; }
  }

  &--sunset {
    .tj__sky-bg {
      background: linear-gradient(180deg, #e65c00 0%, #F9D423 45%, #2a0845 100%);
    }
    .tj__sun { opacity: 0.95; transform: translate(-50%, 50%); filter: drop-shadow(0 0 35px #e65c00); }
    .tj__moon { opacity: 0; }
    .tj__clouds { opacity: 0.4; }
    .tj__stars { opacity: 0.3; }
  }

  &--night {
    .tj__sky-bg {
      background: linear-gradient(180deg, #070e17 0%, #0f1c2e 65%, #070e17 100%);
    }
    .tj__sun { opacity: 0; transform: translate(-50%, 100%); }
    .tj__moon { opacity: 1; }
    .tj__clouds { opacity: 0.1; }
    .tj__stars { opacity: 1; }
  }
}

.tj__sky-bg {
  position: absolute;
  inset: 0;
  transition: background 1.5s ease;
}

/* ── Sun & Moon ── */
.tj__celestial {
  position: absolute;
  top: 14%;
  right: 14%;
  width: 55px;
  height: 55px;
  pointer-events: none;
}

.tj__sun {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(circle, #fffbe6 35%, #ffd194 75%, #ff7e5f 100%);
  box-shadow: 0 0 40px #ffd194, 0 0 80px rgba(255, 209, 148, 0.6);
  transition: transform 1.5s ease, opacity 1.5s ease;
}

.tj__moon {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #f5ede0, #d4c4a8);
  box-shadow: 0 0 20px rgba(245, 237, 224, 0.4), 0 0 50px rgba(245, 237, 224, 0.15);
  transition: opacity 1.5s ease;
}

/* ── Clouds ── */
.tj__clouds {
  position: absolute;
  top: 12%;
  left: 0;
  width: 100%;
  pointer-events: none;
  transition: opacity 1.5s ease;
}

.tj__cloud {
  position: absolute;
  font-size: 28px;
  opacity: 0.7;

  &--1 { top: 10px; left: 15%; animation: tj-cloud-fly 25s linear infinite; }
  &--2 { top: 35px; left: 60%; animation: tj-cloud-fly 35s linear infinite reverse; }
}

@keyframes tj-cloud-fly {
  0% { transform: translateX(0); }
  100% { transform: translateX(60px); }
}

/* ── Starfield ── */
.tj__stars {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: opacity 1.5s ease;
}

.tj__star {
  position: absolute;
  border-radius: 50%;
  background: #fff;
  animation: tj-twinkle 2s ease-in-out infinite alternate;
}

@keyframes tj-twinkle {
  0%   { opacity: 0.15; transform: scale(0.7); }
  100% { opacity: 1;    transform: scale(1.3); }
}

/* ── Organized Scenery Backdrop ── */
.tj__scenes {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.tj__mountains {
  position: absolute;
  bottom: 26%;
  left: 0;
  width: 40%;
  height: 25%;

  .tj__mountain-peak {
    position: absolute;
    bottom: 0;
    &--1 {
      left: 0; width: 100%; height: 100%;
      background: rgba(18, 38, 65, 0.75);
      clip-path: polygon(0 100%, 0 40%, 25% 10%, 50% 60%, 75% 20%, 100% 70%, 100% 100%);
    }
    &--2 {
      left: 10%; width: 80%; height: 75%;
      background: rgba(10, 22, 42, 0.9);
      clip-path: polygon(0 100%, 20% 30%, 45% 80%, 70% 20%, 100% 60%, 100% 100%);
    }
  }
}

.tj__sea {
  position: absolute;
  bottom: 20%;
  right: 0;
  width: 45%;
  height: 16%;

  .tj__sea-water {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(41, 128, 185, 0.4), rgba(15, 76, 129, 0.8));
    border-radius: 8px 0 0 0;
  }
  .tj__sea-wave {
    position: absolute;
    width: 100%;
    height: 6px;
    background: repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0px, transparent 15px, transparent 30px);

    &--1 { top: 8px; animation: tj-wave-move 3s linear infinite; }
    &--2 { top: 24px; animation: tj-wave-move 4s linear infinite reverse; }
  }
}

@keyframes tj-wave-move {
  0% { transform: translateX(0); }
  100% { transform: translateX(-30px); }
}

/* ── Full-Screen Winding SVG Track ── */
.tj__track-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

/* ── Stations (Clean Boxed Cards, Path Anchored) ── */
.tj__station {
  position: absolute;
  text-align: center;
  opacity: 0;
  z-index: 12;
  pointer-events: none;
  transform: translate(-50%, -100%);
}

.tj__station-card {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(8, 20, 42, 0.92);
  padding: 6px 14px;
  border-radius: 12px;
  border: 1.5px solid rgba(126, 230, 215, 0.55);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.65), 0 0 16px rgba(126, 230, 215, 0.2);
  backdrop-filter: blur(10px);
}

.tj__station-emoji { font-size: 18px; line-height: 1; }

.tj__station-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
}

.tj__station-label {
  font-size: 12px;
  font-weight: 800;
  color: #ffffff;
  white-space: nowrap;
  letter-spacing: 0.02em;
}

.tj__station-year {
  font-family: 'ProFontWindows', monospace;
  font-size: 10px;
  font-weight: bold;
  color: #7ee6d7;
  white-space: nowrap;
}

.tj__station-pole {
  width: 2px;
  height: 14px;
  background: linear-gradient(180deg, #7ee6d7, transparent);
  margin: 1px auto 0;
}

.tj__station-marker {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #7ee6d7;
  margin: 0 auto;
  box-shadow: 0 0 12px #7ee6d7;
}

/* ── Realistic Express Train (Path Follower) ── */
.tj__train {
  position: absolute;
  display: flex;
  align-items: flex-end;
  z-index: 15;
  will-change: left, top, transform;
  pointer-events: none;
}

/* Dynamic Floating Giggles Bubble */
.tj__bubble {
  position: absolute;
  top: -55px;
  left: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px;
  background: rgba(6, 16, 34, 0.96);
  border: 2px solid #7ee6d7;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(126, 230, 215, 0.5), 0 10px 30px rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 25;
  white-space: nowrap;
  animation: tj-bubble-float 2.5s ease-in-out infinite alternate;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 35px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid #7ee6d7;
  }
}

@keyframes tj-bubble-float {
  0% { transform: translateY(0); }
  100% { transform: translateY(-5px); }
}

.tj__bubble-icon { font-size: 15px; }
.tj__bubble-text { font-size: 13px; font-weight: 800; color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.8); }

/* Coaches */
.tj__coach {
  position: relative;
  height: 38px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.2), 0 4px 10px rgba(0, 0, 0, 0.5);

  &--family {
    width: 82px;
    background: linear-gradient(180deg, #b8231a, #6c120c);
    border: 1px solid rgba(255, 120, 110, 0.4);
  }

  &--milestone {
    width: 120px;
    background: linear-gradient(180deg, #1c3b88, #0a1c4b);
    border: 1px solid rgba(126, 230, 215, 0.4);
  }
}

.tj__coach-roof {
  width: 104%;
  height: 4px;
  background: #333;
  border-radius: 2px 2px 0 0;
}

.tj__coach-body {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1px 3px;
}

.tj__coach-title {
  font-family: 'Urbanist', sans-serif;
  font-size: 9px;
  font-weight: 800;
  color: #ffe099;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.tj__coach-windows {
  width: 94%;
  height: 15px;
  margin-top: 1px;
  background: rgba(235, 248, 255, 0.25);
  border: 1px solid rgba(126, 230, 215, 0.6);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 6px rgba(126, 230, 215, 0.3);
}

.tj__pass { font-size: 11px; font-weight: bold; white-space: nowrap; }

/* Coupler */
.tj__coupler {
  width: 7px;
  height: 4px;
  background: #444;
  margin-bottom: 8px;
  border-top: 1px solid #777;
  border-bottom: 1px solid #222;
}

/* Engine Locomotive */
.tj__engine {
  position: relative;
  width: 88px;
  height: 50px;
}

.tj__boiler {
  position: absolute;
  bottom: 8px;
  left: 20px;
  right: 0;
  height: 24px;
  background: linear-gradient(180deg, #d98e0c, #9c6304);
  border-radius: 2px 9px 2px 2px;
  border: 1px solid rgba(255, 200, 100, 0.3);
}

.tj__boiler-stripe {
  position: absolute;
  left: 30%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: rgba(255, 255, 255, 0.25);
}

.tj__cab {
  position: absolute;
  bottom: 8px;
  left: 0;
  width: 24px;
  height: 33px;
  background: linear-gradient(180deg, #c42318, #88160e);
  border-radius: 3px 3px 2px 2px;
  display: flex;
  justify-content: center;
  padding-top: 3px;

  .tj__win {
    width: 14px;
    height: 11px;
    background: rgba(100, 200, 255, 0.3);
    border: 1px solid rgba(100, 200, 255, 0.5);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.tj__chimney {
  position: absolute;
  bottom: 32px;
  right: 10px;
  width: 9px;
  height: 13px;
  background: #444;
  border-radius: 2px 2px 0 0;
}

.tj__headlight {
  position: absolute;
  bottom: 20px;
  right: -1px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #fffbe6;
  box-shadow: 0 0 10px #fffbe6, 0 0 20px rgba(255, 251, 230, 0.6);

  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: 5px;
    width: 34px;
    height: 13px;
    background: linear-gradient(90deg, rgba(255, 251, 230, 0.25), transparent);
    clip-path: polygon(0 25%, 100% 0, 100% 100%, 0 75%);
  }
}

.tj__grill {
  position: absolute;
  bottom: 8px;
  right: -5px;
  width: 0;
  height: 0;
  border-left: 6px solid #9c6304;
  border-top: 6px solid transparent;
  border-bottom: 4px solid transparent;
}

.tj__smoke {
  position: absolute;
  bottom: 45px;
  right: 12px;
  pointer-events: none;
}

.tj__smoke-puff {
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(220, 220, 220, 0.4);
  animation: tj-smoke 1.8s ease-out infinite;

  &:nth-child(2) { animation-delay: 0.6s; }
  &:nth-child(3) { animation-delay: 1.2s; }
}

@keyframes tj-smoke {
  0% { transform: translate(0, 0) scale(1); opacity: 0.5; }
  100% { transform: translate(-18px, -40px) scale(3.5); opacity: 0; }
}

.tj__wheel {
  position: absolute;
  bottom: -4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 40%, #ccc, #333);
  border: 1.5px solid #666;
  animation: tj-wheel-spin 0.25s linear infinite;

  &::after {
    content: '+';
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 7px;
    font-weight: bold;
    color: #eee;
  }

  &--c1 { left: 6px; }
  &--c2 { right: 6px; }
  &--c3 { left: 10px; }
  &--c4 { right: 10px; }
  &--e1 { left: 3px; }
  &--e2 { left: 26px; }
  &--e3 { right: 5px; }
}

@keyframes tj-wheel-spin {
  to { transform: rotate(360deg); }
}

/* ── Top Header Bar ── */
.tj__header {
  position: absolute;
  top: 3%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  text-align: center;
  z-index: 25;
  width: 90%;
  max-width: 680px;
}

.tj__name {
  font-size: clamp(20px, 3.5vw, 30px);
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: linear-gradient(135deg, #ffffff 0%, #7ee6d7 45%, #ffb36b 80%, #ffffff 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  filter: drop-shadow(0 0 14px rgba(126, 230, 215, 0.4));
  animation: tj-shimmer 5s linear infinite;
  margin: 0;
  line-height: 1.1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.tj__badge {
  font-size: 11px;
  font-weight: 700;
  color: rgba(243, 237, 227, 0.85);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: rgba(10, 22, 42, 0.8);
  padding: 3px 10px;
  border-radius: 12px;
  border: 1px solid rgba(126, 230, 215, 0.35);
  -webkit-text-fill-color: initial;
}

@keyframes tj-shimmer {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

.tj__contact {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px 12px;
  padding: 5px 18px;
  background: rgba(8, 18, 36, 0.85);
  border: 1px solid rgba(126, 230, 215, 0.35);
  border-radius: 30px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.tj__contact-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: rgba(243, 237, 227, 0.9);
  font-size: clamp(10px, 1.3vw, 12px);
  font-weight: 600;
  text-decoration: none;

  svg { color: #7ee6d7; }
  &:hover { color: #ffb36b; }
}

.tj__contact-dot { color: rgba(126, 230, 215, 0.4); font-size: 9px; }

/* ── Top Left Skip Button (Clean, Non-overlapping) ── */
.tj__skip {
  position: absolute;
  top: 18px;
  left: 20px;
  background: rgba(8, 18, 36, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: rgba(243, 237, 227, 0.85);
  font-family: 'Urbanist', sans-serif;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 20px;
  cursor: pointer;
  z-index: 30;
  transition: all 0.2s ease;

  &:hover {
    color: #fff;
    border-color: #7ee6d7;
    background: rgba(8, 18, 36, 0.95);
  }
}

/* ── Top Right Profile Photo ── */
.tj__profile {
  position: absolute;
  top: 16px;
  right: 20px;
  z-index: 25;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tj__profile-photo {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
  border: 2px solid rgba(126, 230, 215, 0.9);
  box-shadow: 0 0 0 3px rgba(126, 230, 215, 0.2), 0 0 20px rgba(126, 230, 215, 0.4), 0 6px 20px rgba(0, 0, 0, 0.6);
}

.tj__profile-status {
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #34d399;
  border: 2px solid #070a10;
  box-shadow: 0 0 6px #34d399;
}

/* ── Progress bar ── */
.tj__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.05);
  z-index: 30;
}

.tj__progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #7ee6d7, #ffb36b);
  transform: scaleX(0);
  transform-origin: left center;
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .tj__skip { top: 10px; left: 10px; padding: 4px 10px; font-size: 10px; }
  .tj__profile { top: 10px; right: 10px; }
  .tj__profile-photo { width: 38px; height: 38px; }
  .tj__header { top: 1.5%; gap: 3px; }
  .tj__name { font-size: 15px; flex-direction: column; gap: 3px; }
  .tj__contact { padding: 3px 6px; flex-direction: column; gap: 1px; }
  .tj__contact-item { font-size: 9px; }
  .tj__contact-dot { display: none; }

  .tj__train { scale: 0.7; transform-origin: center center; }
  .tj__celestial { width: 35px; height: 35px; top: 4%; right: 5%; }
  .tj__sun { width: 30px; height: 30px; }
}
</style>
