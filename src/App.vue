<script setup lang="ts" generic="T extends any, O extends any">
import TheHeader from '~/components/TheHeader.vue'
</script>

<template>
  <main h-screen flex flex-col font-sans text="center gray-700 dark:gray-200">
    <TheHeader absolute z-99 w-screen flex p-5 />
    <RouterView flex flex-grow flex-col self-center p-5 />
    <TheFooter flex p-5 />
  </main>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
}

/* Media queries for responsive design */
@media screen and (max-width: 600px) {
}
</style>
