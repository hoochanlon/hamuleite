<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    repo: string
    label?: string
  }>(),
  { label: '' },
)

const stars = ref<string | null>(null)

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '')}k`
  return String(n)
}

onMounted(async () => {
  try {
    const res = await fetch(`https://api.github.com/repos/${props.repo}`)
    if (!res.ok) return
    const data = await res.json()
    if (typeof data.stargazers_count === 'number') {
      stars.value = formatCount(data.stargazers_count)
    }
  } catch {
    /* 离线或限流时静默跳过 */
  }
})
</script>

<template>
  <a
    class="vp-github-stars"
    :href="`https://github.com/${repo}`"
    target="_blank"
    rel="noopener noreferrer"
    :title="stars ? `${label || repo} Stars: ${stars}` : (label || repo)"
  >
    <span v-if="label" class="vp-github-stars__label">{{ label }}</span>
    <span class="vp-github-stars__icon" aria-hidden="true">
      <svg viewBox="0 0 16 16" width="14" height="14">
        <path
          fill="currentColor"
          d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
        />
      </svg>
    </span>
    <span v-if="stars" class="vp-github-stars__count">{{ stars }}</span>
  </a>
</template>

<style scoped>
.vp-github-stars {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
  padding: 0 10px;
  height: 30px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s, border-color 0.2s, background-color 0.2s;
}

.vp-github-stars:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
}

.vp-github-stars__label {
  color: inherit;
  line-height: 1;
}

.vp-github-stars__icon {
  display: inline-flex;
  color: var(--vp-c-brand-1);
}

.vp-github-stars__count {
  font-variant-numeric: tabular-nums;
  line-height: 1;
}
</style>
