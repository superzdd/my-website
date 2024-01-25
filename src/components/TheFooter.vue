<script setup>
import { DotLineConfig } from '~/composables/canvas-dot-lines/DotLineConfig'

function darkChange() {
  toggleDark()
  // console.log(isDark.value)
  DotLineConfig.refreshDotColor()
}
</script>

<template>
  <nav inline-flex gap-2 p-2 pb-5 text-xl>
    <button icon-btn @click="darkChange">
      <div i-carbon-sun dark:i-carbon-moon />
    </button>

    <a
      i-carbon-logo-github
      icon-btn
      rel="noreferrer"
      href="https://github.com/superzdd"
      target="_blank"
      title="GitHub"
    />
  </nav>
</template>

<style lang="css">
nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
