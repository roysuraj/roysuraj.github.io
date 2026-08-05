<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  badge: string;
  type: string;
  description: string;
  skills: string[];
}

const experiences: Experience[] = [
  {
    company: "Inland World Pvt Ltd",
    role: "Assistant Manager – Mobile Engineering",
    period: "Mar 2024 – Present",
    location: "Kolkata, India",
    badge: "Current Role 🏆",
    type: "Full-Time",
    description: "Leading a team of 5–6 engineers delivering enterprise logistics & fleet mobility applications (Inland Operations, Driver, and Sales apps). Architected end-to-end docket token workflows, real-time GPS tracking, and native Bluetooth hardware pairing for docket-token printing.",
    skills: ["Flutter", "Native Android (Java)", "Native iOS (Swift)", "React Native", "Bluetooth", ".NET Core", "GPS Tracking"]
  },
  {
    company: "Ionio AI Solutions",
    role: "Senior Mobile Engineer",
    period: "Nov 2023 – Feb 2024",
    location: "Delaware, USA (Remote)",
    badge: "US Remote 🌐",
    type: "Full-Time",
    description: "Architected Amazon Seller SaaS application with high-performance barcode scanning using Google ML Kit (Android) and AV Foundation (iOS) within a Flutter & Node.js ecosystem.",
    skills: ["Flutter", "Node.js", "PostgreSQL", "Google ML Kit", "AV Foundation", "Barcode OCR", "CI/CD"]
  },
  {
    company: "Cloudcraftz Solutions",
    role: "Software Development Engineer",
    period: "May 2022 – Nov 2023",
    location: "Kolkata, India",
    badge: "EdTech & Cloud ☁️",
    type: "Full-Time",
    description: "Led end-to-end mobile development for OptiqueSutra School (published on Google Play). Built backend cloud microservices using Java (Micronaut), TypeScript Cloud Functions, Python (Flask), GCP (BigQuery, Cloud Run), and OpenAI model integrations.",
    skills: ["OptiqueSutra School", "Flutter", "Java (Micronaut)", "TypeScript", "Python (Flask)", "GCP", "OpenAI", "GA4"]
  },
  {
    company: "Craftveda Technology",
    role: "Software Engineering Intern",
    period: "Jan 2022 – Mar 2022",
    location: "Kolkata, India",
    badge: "MedTech 🩺",
    type: "Internship",
    description: "Developed Careplix Vitals MedTech mobile application in React Native featuring real-time Bluetooth health metrics analysis, patient monitoring, and Highcharts JS data visualization.",
    skills: ["React Native", "Bluetooth Vitals", "Highcharts JS", "MedTech Analytics", "Google Play"]
  },
  {
    company: "Distarise",
    role: "Flutter Developer",
    period: "Jan 2021 – Jul 2021",
    location: "Mysore, India",
    badge: "Mobile Apps 📱",
    type: "Full-Time",
    description: "Collaborated on production Flutter applications, implementing Clean Architecture, MVVM principles, BLoC state management, and writing high-efficiency, testable Dart code.",
    skills: ["Flutter", "Dart", "Clean Architecture", "MVVM", "BLoC", "REST APIs"]
  }
];

const selectedCompany = ref<number>(0);
const currentExp = computed((): Experience => experiences[selectedCompany.value] || experiences[0]!);

const handleClose = () => {
  emit("close");
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    handleClose();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <Teleport to="body">
    <transition name="exp-fade">
      <div v-if="props.isOpen" class="exp-backdrop" @click="handleClose">
        <div class="exp-card" @click.stop>
          <!-- Header -->
          <div class="exp-header">
            <div class="exp-header-title">
              <span class="exp-icon">💼</span>
              <div>
                <h2>Work Experience & Career History</h2>
                <p class="exp-subtitle">Suraj Kumar Roy · 5+ Years Senior Mobile Software Engineer</p>
              </div>
            </div>
            <button class="exp-close" @click="handleClose" aria-label="Close modal">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <!-- Company Tabs Bar -->
          <div class="exp-chips-bar">
            <button
              v-for="(exp, index) in experiences"
              :key="exp.company"
              class="exp-chip"
              :class="{ 'exp-chip--active': selectedCompany === index }"
              @click="selectedCompany = index"
            >
              <span class="exp-chip__name">{{ exp.company }}</span>
              <span class="exp-chip__period">{{ exp.period.split(' – ')[0] }}</span>
            </button>
          </div>

          <!-- Active Experience Content -->
          <div class="exp-body">
            <div class="exp-detail-box">
              <div class="exp-detail-header">
                <div>
                  <h3 class="exp-role">{{ currentExp.role }}</h3>
                  <p class="exp-company">
                    🏢 <strong>{{ currentExp.company }}</strong>
                    <span class="exp-location">📍 {{ currentExp.location }}</span>
                  </p>
                </div>
                <div class="exp-badge-group">
                  <span class="exp-badge">{{ currentExp.badge }}</span>
                  <span class="exp-period">{{ currentExp.period }}</span>
                </div>
              </div>

              <p class="exp-desc">{{ currentExp.description }}</p>

              <!-- Skills tags -->
              <div class="exp-skills-group">
                <p class="exp-skills-label">Technologies & Frameworks:</p>
                <div class="exp-skills-tags">
                  <span
                    v-for="skill in currentExp.skills"
                    :key="skill"
                    class="exp-skill-pill"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer button -->
          <div class="exp-footer">
            <button class="exp-btn-close" @click="handleClose">
              Done / Close
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped lang="scss">
.exp-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(2, 8, 24, 0.85);
  backdrop-filter: blur(16px);
  padding: 16px;
}

.exp-card {
  width: 100%;
  max-width: 620px;
  background: rgba(8, 20, 42, 0.96);
  border: 1.5px solid rgba(126, 230, 215, 0.45);
  border-radius: 24px;
  box-shadow: 
    0 24px 60px rgba(0, 0, 0, 0.85),
    0 0 40px rgba(126, 230, 215, 0.2);
  overflow: hidden;
  font-family: 'Urbanist', 'Inter', sans-serif;
  color: #ffffff;
}

.exp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  background: rgba(14, 34, 68, 0.7);
  border-bottom: 1px solid rgba(126, 230, 215, 0.2);
}

.exp-header-title {
  display: flex;
  align-items: center;
  gap: 12px;

  h2 {
    font-size: 17px;
    font-weight: 800;
    margin: 0;
    color: #ffffff;
  }
}

.exp-subtitle {
  font-size: 11.5px;
  color: #7ee6d7;
  margin: 2px 0 0 0;
  font-weight: 600;
}

.exp-icon {
  font-size: 26px;
}

.exp-close {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(200, 35, 26, 0.8);
    border-color: #c8231a;
  }
}

.exp-chips-bar {
  display: flex;
  gap: 8px;
  padding: 14px 24px;
  background: rgba(4, 12, 28, 0.6);
  border-bottom: 1px solid rgba(126, 230, 215, 0.15);
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(126, 230, 215, 0.4) transparent;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(126, 230, 215, 0.4);
    border-radius: 4px;
  }
}

.exp-chip {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 6px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(126, 230, 215, 0.2);
  color: rgba(255, 255, 255, 0.8);
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &__name {
    font-size: 12px;
    font-weight: 700;
  }

  &__period {
    font-size: 9.5px;
    color: #7ee6d7;
    margin-top: 1px;
  }

  &:hover {
    background: rgba(126, 230, 215, 0.15);
    border-color: #7ee6d7;
    color: #ffffff;
  }

  &--active {
    background: linear-gradient(135deg, #c8231a 0%, #a0150e 100%);
    border-color: #ff554d;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(200, 35, 26, 0.4);

    .exp-chip__period {
      color: #ffb36b;
    }
  }
}

.exp-body {
  padding: 20px 24px;
}

.exp-detail-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(126, 230, 215, 0.2);
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.exp-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
}

.exp-role {
  font-size: 15px;
  font-weight: 800;
  margin: 0;
  color: #ffffff;
}

.exp-company {
  font-size: 12.5px;
  color: #7ee6d7;
  margin: 4px 0 0 0;
}

.exp-location {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.65);
  margin-left: 6px;
  font-size: 11.5px;
}

.exp-badge-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 11px;
  font-weight: 700;
  color: #ffb36b;

  @media (max-width: 480px) {
    align-items: flex-start;
  }
}

.exp-badge {
  background: rgba(255, 179, 107, 0.12);
  border: 1px solid rgba(255, 179, 107, 0.3);
  padding: 2px 8px;
  border-radius: 100px;
  white-space: nowrap;
}

.exp-period {
  font-size: 10.5px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 3px;
  font-weight: 600;
}

.exp-desc {
  font-size: 12.5px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.exp-skills-group {
  margin-top: 6px;
  padding-top: 10px;
  border-top: 1px dashed rgba(126, 230, 215, 0.2);
}

.exp-skills-label {
  font-size: 11px;
  font-weight: 700;
  color: #7ee6d7;
  margin: 0 0 6px 0;
}

.exp-skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.exp-skill-pill {
  padding: 3px 10px;
  background: rgba(126, 230, 215, 0.12);
  border: 1px solid rgba(126, 230, 215, 0.35);
  border-radius: 100px;
  font-size: 10.5px;
  font-weight: 700;
  color: #ffffff;
}

.exp-footer {
  padding: 14px 24px;
  background: rgba(4, 12, 28, 0.6);
  border-top: 1px solid rgba(126, 230, 215, 0.15);
  display: flex;
  justify-content: flex-end;
}

.exp-btn-close {
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 100px;
  color: #ffffff;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(126, 230, 215, 0.25);
    border-color: #7ee6d7;
  }
}

/* Modal Transitions */
.exp-fade-enter-active,
.exp-fade-leave-active {
  transition: all 0.25s ease-out;
}

.exp-fade-enter-from,
.exp-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
