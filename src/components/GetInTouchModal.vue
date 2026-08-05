<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const copied = ref(false);
const emailAddress = "spyrogypsertech@gmail.com";
const resumeUrl = "/Suraj_Roy_Senior_Mobile_Software_Engineer_Resume-2.pdf";

const handleClose = () => {
  emit("close");
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    handleClose();
  }
};

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(emailAddress);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2500);
  } catch (err) {
    console.error("Failed to copy email", err);
  }
};

const openResume = () => {
  window.open(resumeUrl, "_blank", "noopener,noreferrer");
};

const openMail = () => {
  window.open(`mailto:${emailAddress}`, "_blank");
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
    <transition name="git-fade">
      <div v-if="props.isOpen" class="git-backdrop" @click="handleClose">
        <div class="git-card" @click.stop>
          <!-- Header -->
          <div class="git-header">
            <div class="git-header-title">
              <span class="git-icon">📬</span>
              <div>
                <h2>Get In Touch</h2>
                <p class="git-subtitle">Suraj Kumar Roy · Senior Mobile Software Engineer</p>
              </div>
            </div>
            <button class="git-close" @click="handleClose" aria-label="Close modal">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <!-- Main Actions -->
          <div class="git-body">
            <!-- Action 1: Resume PDF -->
            <div class="git-action-card git-action-card--resume">
              <div class="git-action-icon">📄</div>
              <div class="git-action-info">
                <h3>Official Resume (PDF)</h3>
                <p>Suraj_Roy_Senior_Mobile_Software_Engineer_Resume-2.pdf</p>
              </div>
              <button class="git-btn git-btn--primary" @click="openResume">
                <span>View Resume ↗</span>
              </button>
            </div>

            <!-- Action 2: Email Direct -->
            <div class="git-action-card git-action-card--email">
              <div class="git-action-icon">✉️</div>
              <div class="git-action-info">
                <h3>Direct Email</h3>
                <p>{{ emailAddress }}</p>
              </div>
              <div class="git-btn-group">
                <button class="git-btn git-btn--accent" @click="openMail">
                  <span>Send Mail ✉️</span>
                </button>
                <button class="git-btn git-btn--secondary" @click="copyEmail">
                  <span>{{ copied ? "Copied! ✓" : "Copy Email" }}</span>
                </button>
              </div>
            </div>

            <!-- Contact Details List -->
            <div class="git-details">
              <div class="git-detail-item">
                <span class="git-detail-label">📍 Location:</span>
                <span class="git-detail-value">Kolkata, West Bengal, India 🇮🇳</span>
              </div>
              <div class="git-detail-item">
                <span class="git-detail-label">📞 Phone:</span>
                <span class="git-detail-value">+91 89108 36042 / +91 91237 27623</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped lang="scss">
.git-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(2, 8, 24, 0.82);
  backdrop-filter: blur(16px);
  padding: 16px;
}

.git-card {
  width: 100%;
  max-width: 520px;
  background: rgba(8, 20, 42, 0.95);
  border: 1.5px solid rgba(126, 230, 215, 0.4);
  border-radius: 24px;
  box-shadow: 
    0 24px 60px rgba(0, 0, 0, 0.85),
    0 0 40px rgba(126, 230, 215, 0.2);
  overflow: hidden;
  font-family: 'Urbanist', 'Inter', sans-serif;
  color: #ffffff;
}

.git-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: rgba(14, 34, 68, 0.6);
  border-bottom: 1px solid rgba(126, 230, 215, 0.2);
}

.git-header-title {
  display: flex;
  align-items: center;
  gap: 12px;

  h2 {
    font-size: 18px;
    font-weight: 800;
    margin: 0;
    color: #ffffff;
  }
}

.git-subtitle {
  font-size: 12px;
  color: #7ee6d7;
  margin: 2px 0 0 0;
  font-weight: 600;
}

.git-icon {
  font-size: 28px;
}

.git-close {
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

.git-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.git-action-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(126, 230, 215, 0.2);
  border-radius: 16px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #7ee6d7;
    background: rgba(126, 230, 215, 0.06);
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}

.git-action-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.git-action-info {
  flex: 1;

  h3 {
    font-size: 14px;
    font-weight: 800;
    margin: 0;
    color: #ffffff;
  }

  p {
    font-size: 11.5px;
    color: rgba(243, 237, 227, 0.7);
    margin: 2px 0 0 0;
    word-break: break-all;
  }
}

.git-btn-group {
  display: flex;
  gap: 8px;

  @media (max-width: 480px) {
    width: 100%;
  }
}

.git-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  white-space: nowrap;

  &--primary {
    background: linear-gradient(135deg, #c8231a 0%, #a0150e 100%);
    color: #ffffff;
    box-shadow: 0 4px 14px rgba(200, 35, 26, 0.4);

    &:hover {
      background: linear-gradient(135deg, #e5281e 0%, #c8231a 100%);
      transform: translateY(-1px);
    }
  }

  &--accent {
    background: linear-gradient(135deg, #7ee6d7 0%, #0284c7 100%);
    color: #020c26;
    box-shadow: 0 4px 14px rgba(126, 230, 215, 0.3);

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(126, 230, 215, 0.5);
    }
  }

  &--secondary {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }

  @media (max-width: 480px) {
    flex: 1;
    padding: 10px 12px;
  }
}

.git-details {
  margin-top: 8px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.git-detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
}

.git-detail-label {
  color: #7ee6d7;
  font-weight: 700;
}

.git-detail-value {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
}

/* Modal Transitions */
.git-fade-enter-active,
.git-fade-leave-active {
  transition: all 0.25s ease-out;
}

.git-fade-enter-from,
.git-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
