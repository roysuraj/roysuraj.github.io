<script setup lang="ts">
import Github from "./icons/Github.vue";
import Linkedin from "./icons/Linkedin.vue";
import Instagram from "./icons/Instagram.vue";
import Youtube from "./icons/Youtube.vue";
import Mail from "./icons/Mail.vue";
import X from "./icons/X.vue";
import Link from "./Link.vue";
import { t } from "../i18n/utils/translate";
import ButtonRound from "./ButtonRound.vue";

import { social } from "../content/social";

const props = defineProps<{
  variant?: "theme" | "background";
}>();

// map icon names to components
const icons = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  x: X,
  instagram: Instagram,
  "youtube-music": Youtube,
  "youtube-tech": Youtube,
} as const;

const getAriaLabel = (name: string) => {
  if (name === "youtube-music") return "Pianist Music YouTube Channel";
  if (name === "youtube-tech") return "SpyroGypserTech YouTube Channel";
  return `${t("go-to")} ${name.charAt(0).toUpperCase() + name.slice(1)}`;
};
</script>

<template>
  <div class="social">
    <Link
      v-for="item in social"
      :key="item.name"
      external
      :href="item.url"
      :aria-label="getAriaLabel(item.name)"
      :title="getAriaLabel(item.name)"
      class="social-link"
      data-cursor="circle-white"
    >
      <ButtonRound
        renderAs="div"
        :variant="props.variant ?? 'theme'"
        class="children-unclickable"
        data-hoversound="hover"
      >
        <component :is="icons[item.name]" :aria-label="getAriaLabel(item.name)" external />
      </ButtonRound>
    </Link>
  </div>
</template>

<style scoped lang="scss">
.social {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);

  @include mixins.mq("md") {
    gap: var(--space-md);
  }
}
</style>
