<script setup lang="ts">
import GitHubStars from './GitHubStars.vue'
</script>

<template>
  <div class="vp-repo-stars">
    <GitHubStars repo="hoochanlon/hamuleite" label="hamuleite" />
    <GitHubStars repo="hoochanlon/fq-book" label="fq-book" />
  </div>
</template>

<style scoped>
.vp-repo-stars {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>
