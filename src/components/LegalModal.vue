<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { t } from "../i18n/utils/translate";

const props = defineProps<{
  type: "privacy" | "legal" | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

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
    <transition name="modal-fade">
      <div v-if="props.type !== null" class="modal-backdrop" @click="handleClose">
        <div class="modal-card" @click.stop>
          <!-- Header -->
          <div class="modal-header">
            <div class="modal-header-title">
              <span class="modal-icon">{{ props.type === 'privacy' ? '🛡️' : '⚖️' }}</span>
              <h2>{{ props.type === 'privacy' ? t('privacy') : t('legal') }}</h2>
            </div>
            <button class="modal-close" @click="handleClose" aria-label="Close modal">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <!-- Body Content (Scrollable) -->
          <div class="modal-body">
            <!-- Privacy Policy & Hiring Terms -->
            <template v-if="props.type === 'privacy'">
              <div class="modal-section">
                <h3>1. Software Services & Mobile Privacy</h3>
                <p>
                  This Privacy Policy outlines how Suraj Kumar Roy handles data privacy for web platforms, mobile applications (iOS & Android), and custom software solutions built for clients globally.
                </p>
              </div>

              <div class="modal-section">
                <h3>2. Client Confidentiality & Hiring Engagement</h3>
                <p>
                  When hiring Suraj Kumar Roy for full-time, contract, or freelance software engineering services, all client codebases, proprietary algorithms, API keys, and business logic are protected under strict Non-Disclosure Agreements (NDAs). Zero client data or source code is shared, sold, or exposed.
                </p>
              </div>

              <div class="modal-section">
                <h3>3. Mobile Application Telemetry</h3>
                <p>
                  Any mobile software or Web app built by Suraj Kumar Roy collects zero unnecessary personal data. Diagnostic analytics and crash telemetry are used strictly to fix bugs, optimize frame rates, and improve application performance.
                </p>
              </div>

              <div class="modal-section">
                <h3>4. Data Protection Standards</h3>
                <p>
                  All software services adhere to international data security best practices (GDPR / IT Act India standards). Users and clients retain complete ownership and control over their private data.
                </p>
              </div>

              <div class="modal-contact-box">
                <p class="modal-contact-title">Privacy & Hiring Enquiries</p>
                <a href="mailto:spyrogypsertech@gmail.com" class="modal-contact-link">spyrogypsertech@gmail.com</a>
              </div>
            </template>

            <!-- Legal Notice & Copyright Content -->
            <template v-else>
              <div class="modal-section">
                <h3>1. Copyright & Intellectual Property Protection</h3>
                <p>
                  © {{ new Date().getFullYear() }} <strong>Suraj Kumar Roy</strong>. All Rights Reserved.
                </p>
                <p>
                  All source code, 3D graphics, visual assets, software architecture, written content, sound tracks, and portfolio media are the exclusive intellectual property of Suraj Kumar Roy.
                </p>
              </div>

              <div class="modal-section warning-box">
                <h3>2. Strict Anti-Theft & Non-Duplication Clause</h3>
                <p>
                  <strong>No content, source code, or media on this website or mobile software services may be stolen, copied, scraped, reverse-engineered, decompiled, or redistributed</strong> in any form without explicit prior written authorization from Suraj Kumar Roy.
                </p>
              </div>

              <div class="modal-section">
                <h3>3. Software Breach & Legal Enforcement</h3>
                <p>
                  Unauthorized commercial reproduction, copyright infringement, or intellectual property theft will be subject to immediate DMCA takedown notices, software licensing termination, and international legal enforcement.
                </p>
              </div>

              <div class="modal-section">
                <h3>4. Official Legal Contact</h3>
                <p>
                  For official legal notices, licensing requests, or reporting software copyright breaches, please contact:
                </p>
              </div>

              <div class="modal-contact-box">
                <p class="modal-contact-title">Suraj Kumar Roy — Legal Dept / SpyroGypserTech</p>
                <p class="modal-contact-sub">Kolkata, West Bengal, India 🇮🇳</p>
                <a href="mailto:spyrogypsertech@gmail.com" class="modal-contact-link">spyrogypsertech@gmail.com</a>
              </div>
            </template>
          </div>

          <!-- Footer -->
          <div class="modal-footer">
            <button class="modal-btn-ok" @click="handleClose">Understood</button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(2, 8, 20, 0.85);
  backdrop-filter: blur(14px);
  z-index: 999999 !important;
  pointer-events: auto !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-card {
  width: 100%;
  max-width: 620px;
  max-height: 85vh;
  background: linear-gradient(135deg, #020714 0%, #061024 100%);
  border: 1.5px solid rgba(126, 230, 215, 0.5);
  border-radius: 20px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.95), 0 0 35px rgba(126, 230, 215, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #f3ede3;
  font-family: 'Urbanist', sans-serif;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid rgba(126, 230, 215, 0.25);
  background: #030a1c;

  &-title {
    display: flex;
    align-items: center;
    gap: 10px;

    h2 {
      font-size: 20px;
      font-weight: 800;
      color: #ffffff;
      margin: 0;
      letter-spacing: 0.03em;
    }
  }

  .modal-icon {
    font-size: 22px;
  }
}

.modal-close {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
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
    border-color: #ff6b6b;
    transform: rotate(90deg);
  }
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(243, 237, 227, 0.92);
  background: #020714;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(126, 230, 215, 0.4);
    border-radius: 3px;
  }
}

.modal-section {
  background: rgba(8, 22, 48, 0.85);
  border: 1px solid rgba(126, 230, 215, 0.22);
  padding: 14px 18px;
  border-radius: 12px;

  h3 {
    font-size: 15px;
    font-weight: 800;
    color: #7ee6d7;
    margin: 0 0 6px 0;
    letter-spacing: 0.02em;
  }

  p {
    margin: 0 0 8px 0;
    strong {
      color: #ffffff;
    }
  }
}

.warning-box {
  background: rgba(180, 20, 15, 0.25);
  border: 1.5px solid rgba(255, 107, 107, 0.6);
  padding: 14px 18px;
  border-radius: 12px;
  h3 {
    color: #ff6b6b;
  }
}

.modal-contact-box {
  background: rgba(126, 230, 215, 0.08);
  border: 1px solid rgba(126, 230, 215, 0.3);
  padding: 14px 18px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 6px;
}

.modal-contact-title {
  font-weight: 800;
  color: #ffffff;
  margin: 0;
}

.modal-contact-sub {
  font-size: 12px;
  opacity: 0.8;
  margin: 0;
}

.modal-contact-link {
  color: #7ee6d7;
  font-weight: 700;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
    color: #ffb36b;
  }
}

.modal-footer {
  padding: 14px 24px;
  border-top: 1px solid rgba(126, 230, 215, 0.2);
  display: flex;
  justify-content: flex-end;
  background: rgba(4, 14, 30, 0.8);
}

.modal-btn-ok {
  padding: 8px 24px;
  background: linear-gradient(135deg, #7ee6d7 0%, #207cca 100%);
  border: none;
  border-radius: 20px;
  color: #040e1e;
  font-family: 'Urbanist', sans-serif;
  font-size: 13.5px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(126, 230, 215, 0.4);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(126, 230, 215, 0.6);
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
