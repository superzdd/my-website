<script setup lang="ts" generic="T extends any, O extends any">
import TheHeader from '~/components/TheHeader.vue'
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
    <TheHeader z-99 w-screen flex p-2 />
    <!-- <RouterView flex flex-grow flex-col self-center p-5 /> -->
    <RouterView class="main-content" />
    <TheFooter mt-20 flex />
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
</style>
