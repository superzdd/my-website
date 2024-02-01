<script setup lang="ts" generic="T extends any, O extends any">
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'

// import Background from "~/components/Background.vue";

const viewShow = ref(false)
onMounted(() => {
  viewShow.value = true
})
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
    <TheHeader z-1 z-99 w-screen flex p-2 />
    <Transition name="fade">
      <RouterView v-show="viewShow" class="main-content" z-1 />
    </Transition>
    <TheFooter z-1 mt-20 flex />
  </main>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  max-width: 95vw;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
