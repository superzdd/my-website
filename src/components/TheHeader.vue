import { Z_DEFLATED } from 'zlib';
<script setup>
import MyLogo from '~/components/MyLogo.vue'
</script>

<template>
  <div id="header" flex="~" flex-justify-between>
    <div class="container-left" h-12 w-12>
      <router-link to="/">
        <MyLogo />
      </router-link>
    </div>
    <div class="container-right">
      <!-- <router-link to="/personal/profile"> 工作经历 </router-link> -->
      <router-link to="/personal/collection">
        作品集
      </router-link>
    </div>
  </div>
</template>
