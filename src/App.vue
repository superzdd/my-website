<script setup lang="ts" generic="T extends any, O extends any">
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'
// import Background from "~/components/Background.vue";
</script>

<template>
  <main
    h-screen
    flex
    flex-col
    items-center
    font-sans
    text="center gray-700 dark:gray-200"
    style="background-color: rgba(0, 0, 0, 0)"
  >
    <div class="bg-container" pointer-events-none fixed left-0 top-0 z--1>
      <Background />
    </div>
    <TheHeader z-99 w-screen flex p-2 z-1 />
    <RouterView class="main-content" z-1 />
    <TheFooter mt-20 flex z-1 />
  </main>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  /* flex: 1;
  display: flex;
  flex-direction: column;
  align-self: center;
  padding: 1.25rem; */
  max-width: 95vw;
  /* min-height: 10vh; */
  /* overflow-x: hidden; */
}

.bg-container canvas {
  mask-image: radial-gradient(circle, transparent, transparent 40%, black);
  -moz-mask-image: radial-gradient(circle, transparent, transparent 40%, black);
  -ms-mask-image: radial-gradient(circle, transparent, transparent 40%, black);
  -webkit-mask-image: radial-gradient(
    circle,
    transparent,
    transparent 40%,
    black
  );
  mask-mode: alpha;
  -webkit-mask-mode: alpha;
  -moz-mask-mode: alpha;
  -ms-mask-mode: alpha;
}
</style>
