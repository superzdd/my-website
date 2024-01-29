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
    <div class="container-right" flex="~" flex-items-center font-size-5 font-100>
      <router-link to="/blog">
        <div i-carbon-document w-9 class="icon-link"/>
      </router-link>
      <router-link to="/personal/mineSweeper">
        <div i-carbon-game-console w-9 class="icon-link"/>
      </router-link>
    </div>
  </div>
</template>

<style>
.icon-link {
  padding: 0 0.5rem;
  font-weight: 100;
  transition: 0.5s;
}

.icon-link:hover {
  color: rgba(200, 200, 200, 1);
}
.router-link-exact-active {
  color: rgba(200, 0, 0, 1);
}
</style>
