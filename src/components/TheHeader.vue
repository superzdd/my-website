<template>
  <div id="header">
    <div class="container-left">
      <router-link to="/">
        Logo
      </router-link>
    </div>
    <div class="container-right">
      <router-link to="/personal/profile">
        工作经历
      </router-link>
      <router-link to="/personal/collection">
        个人作品合集
      </router-link>
    </div>
  </div>
</template>

<style lang="css">
#header {
  /* position: fixed;
  top: 0;
  left: 0; */
  height: 3rem;
  width: 100vw;
  background-color: blue;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
