import { Z_DEFLATED } from 'zlib';
<script setup>
import MyLogo from '~/components/MyLogo.vue'
</script>

<template>
  <div id="header" flex="~" flex-justify-between border-b>
    <div class="container-left" h-12 w-12>
      <router-link to="/">
        <MyLogo />
      </router-link>
    </div>
    <div class="container-right" flex="~" flex-items-center font-size-5>
      <router-link to="/personal/mineSweeper">
        <span i-carbon-game-console>game</span>
      </router-link>
    </div>
  </div>
</template>

<style>
#header {
  /* background-color: #fff; */
}
</style>
