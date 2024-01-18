import { Z_DEFLATED } from 'zlib';
<template>
  <div id="header" flex="~" flex-justify-between>
    <div class="container-left" h-12 w-12>
      <router-link to="/">
        <img src="/imgs/final/zdd.svg" h-full w-full alt="zdd">
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

<style lang="css">
/* #header {
  height: 3rem;
  width: 100vw;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
} */
</style>
