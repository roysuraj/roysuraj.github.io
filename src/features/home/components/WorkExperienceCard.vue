<script setup lang="ts">
import { ref, computed } from 'vue';

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
    description: "Leading a team of 5–6 engineers building enterprise logistics & fleet mobility platforms (Inland Ops, Driver & Sales apps) with real-time GPS tracking and Bluetooth printing.",
    skills: ["Flutter", "Native Android (Java)", "Native iOS (Swift)", "React Native", "Bluetooth", ".NET Core", "GPS Tracking"]
  },
  {
    company: "Ionio AI Solutions",
    role: "Senior Mobile Engineer",
    period: "Nov 2023 – Feb 2024",
    location: "Delaware, USA (Remote)",
    badge: "US Remote 🌐",
    type: "Full-Time",
    description: "Architected Amazon Seller SaaS app featuring high-performance barcode scanning using Google ML Kit (Android) and AV Foundation (iOS) with Flutter & Node.js.",
    skills: ["Flutter", "Node.js", "PostgreSQL", "Google ML Kit", "AV Foundation", "Barcode OCR"]
  },
  {
    company: "Cloudcraftz Solutions",
    role: "Software Development Engineer",
    period: "May 2022 – Nov 2023",
    location: "Kolkata, India",
    badge: "EdTech & Cloud ☁️",
    type: "Full-Time",
    description: "Led development of OptiqueSutra School app (Flutter/Firebase) & backend cloud functions in Java Micronaut, Python Flask, GCP BigQuery, and OpenAI model integrations.",
    skills: ["OptiqueSutra School", "Flutter", "Java (Micronaut)", "TypeScript", "Python (Flask)", "GCP", "OpenAI", "GA4"]
  },
  {
    company: "Craftveda Technology",
    role: "Software Engineering Intern",
    period: "Jan 2022 – Mar 2022",
    location: "Kolkata, India",
    badge: "MedTech 🩺",
    type: "Internship",
    description: "Built Careplix Vitals MedTech mobile application in React Native with real-time Bluetooth health metric analysis and Highcharts JS data visualization.",
    skills: ["React Native", "Bluetooth Vitals", "Highcharts JS", "MedTech Analytics", "Google Play"]
  },
  {
    company: "Distarise",
    role: "Flutter Developer",
    period: "Jan 2021 – Jul 2021",
    location: "Mysore, India",
    badge: "Mobile Apps 📱",
    type: "Full-Time",
    description: "Collaborated on production Flutter applications, applying Clean Architecture principles and writing high-efficiency, testable Dart code.",
    skills: ["Flutter", "Dart", "Clean Architecture", "MVVM", "REST APIs"]
  }
];

const selectedCompany = ref<number>(0);
const currentExp = computed((): Experience => experiences[selectedCompany.value] || experiences[0]!);
</script>

<template>
  <div class="exp-card">
    <div class="exp-card__header">
      <div class="exp-card__title-group">
        <span class="exp-card__icon">💼</span>
        <div>
          <h3 class="exp-card__title">Work Experience & Career Journey</h3>
          <p class="exp-card__subtitle">5+ Years · Senior Mobile Engineer & Technical Lead</p>
        </div>
      </div>
    </div>

    <!-- Company Tabs / Chips -->
    <div class="exp-card__chips">
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

    <!-- Active Selected Experience Details -->
    <div class="exp-card__body">
      <div class="exp-detail">
        <div class="exp-detail__top">
          <div>
            <h4 class="exp-detail__role">{{ currentExp.role }}</h4>
            <p class="exp-detail__company">
              🏢 {{ currentExp.company }}
              <span class="exp-detail__location">📍 {{ currentExp.location }}</span>
            </p>
          </div>
          <div class="exp-detail__badge">
            <span>{{ currentExp.badge }}</span>
            <span class="exp-detail__period">{{ currentExp.period }}</span>
          </div>
        </div>

        <p class="exp-detail__desc">{{ currentExp.description }}</p>

        <!-- Tech Skills Used -->
        <div class="exp-detail__skills">
          <span
            v-for="skill in currentExp.skills"
            :key="skill"
            class="exp-skill-tag"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.exp-card {
  width: 100%;
  max-width: 580px;
  background: rgba(4, 18, 44, 0.92);
  border: 1.5px solid rgba(126, 230, 215, 0.4);
  border-radius: 20px;
  box-shadow: 
    0 16px 40px rgba(0, 0, 0, 0.65),
    0 0 25px rgba(126, 230, 215, 0.15);
  padding: 16px 20px;
  font-family: 'Urbanist', 'Inter', sans-serif;
  color: #ffffff;
  backdrop-filter: blur(14px);
  margin-top: 12px;

  &__header {
    margin-bottom: 12px;
  }

  &__title-group {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__icon {
    font-size: 26px;
  }

  &__title {
    font-size: 15px;
    font-weight: 800;
    margin: 0;
    color: #ffffff;
    letter-spacing: 0.02em;
  }

  &__subtitle {
    font-size: 11px;
    color: #7ee6d7;
    margin: 2px 0 0 0;
    font-weight: 600;
  }

  &__chips {
    display: flex;
    gap: 6px;
    overflow-x: auto;
    padding-bottom: 8px;
    margin-bottom: 12px;
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

  &__body {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(126, 230, 215, 0.2);
    border-radius: 14px;
    padding: 14px 16px;
  }
}

.exp-chip {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 6px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(126, 230, 215, 0.2);
  color: rgba(255, 255, 255, 0.8);
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &__name {
    font-size: 11.5px;
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
    background: linear-gradient(135deg, rgba(200, 35, 26, 0.85) 0%, rgba(140, 20, 15, 0.85) 100%);
    border-color: #ff554d;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(200, 35, 26, 0.4);

    .exp-chip__period {
      color: #ffb36b;
    }
  }
}

.exp-detail {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;

    @media (max-width: 480px) {
      flex-direction: column;
    }
  }

  &__role {
    font-size: 13.5px;
    font-weight: 800;
    margin: 0;
    color: #ffffff;
  }

  &__company {
    font-size: 11.5px;
    font-weight: 700;
    color: #7ee6d7;
    margin: 3px 0 0 0;
  }

  &__location {
    font-weight: 500;
    color: rgba(255, 255, 255, 0.65);
    margin-left: 6px;
  }

  &__badge {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 10.5px;
    font-weight: 700;
    color: #ffb36b;

    @media (max-width: 480px) {
      align-items: flex-start;
    }
  }

  &__period {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 600;
  }

  &__desc {
    font-size: 11.5px;
    line-height: 1.45;
    color: rgba(255, 255, 255, 0.88);
    margin: 0;
  }

  &__skills {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 4px;
  }
}

.exp-skill-tag {
  display: inline-block;
  padding: 3px 8px;
  background: rgba(126, 230, 215, 0.12);
  border: 1px solid rgba(126, 230, 215, 0.3);
  border-radius: 100px;
  font-size: 9.5px;
  font-weight: 700;
  color: #7ee6d7;
}
</style>
