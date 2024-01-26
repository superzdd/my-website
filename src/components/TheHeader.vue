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
      <router-link to="/blog">
        <div class="icon-link" i-carbon-document h-7 w-7 />
      </router-link>
      <router-link to="/personal/mineSweeper">
        <div class="icon-link" i-carbon-game-console h-7 w-7 />
      </router-link>
    </div>
  </div>
</template>

<style>
.icon-link {
  padding: 0 0.5rem;
  transition: 0.5s;
}

.icon-link:hover {
  color: rgba(200, 200, 200, 1);
}
.router-link-exact-active {
  color: rgba(200, 0, 0, 1);
}
</style>
