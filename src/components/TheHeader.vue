<script setup>
import MyLogo from '~/components/MyLogo.vue'

// function getLinkClass() {
//   return "bg-white-600/40 hover:bg-gray-100"
// }
</script>

<template>
  <div id="header" flex="~" flex-justify-between border-b>
    <div class="container-left" h-12 w-12>
      <router-link to="/">
        <MyLogo />
      </router-link>
    </div>
    <div class="container-right" flex="~" flex-items-center font-size-6>
      <router-link to="/personal/mineSweeper">
        <span class="icon-link" i-carbon-game-console>game</span>
      </router-link>
    </div>
  </div>
</template>

<style>
.icon-link {
  transition: 0.5s;
}

.icon-link:hover {
  /* color: rgba(200, 0, 0, 1); */
  /* transform: scale(1.1); */
}

.router-link-exact-active {
  color: rgba(200, 0, 0, 1);
}
</style>
