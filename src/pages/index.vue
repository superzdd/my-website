<script setup lang="ts" generic="T extends any, O extends any">
import sourceData from '~/data.json'

// import Counter from '~/components/TheCounter.vue'
import AppLink from '~/components/AppLink.vue'

const { profile } = sourceData
</script>

<template>
  <div text-left>
    <div>
      <h1 font-size-7>
        {{ profile.name }}
      </h1>
    </div>
    <div>
      <p>Hi！你好，我是张辰海</p>
      <p>职业是一名前端开发工程师</p>

      <br>
      <p>曾先后就职于：</p>
      <ul>
        <li>万达信息股份有限公司</li>
        <li>大连东软思维科技发展有限公司上海分公司</li>
        <li>上海亨兹瑞信息科技有限公司</li>
        <li>博世华域转向系统有限公司</li>
      </ul>

      <br>

      <div class="icon-neusoft" />
      <img src="/imgs/final/wonders.png" alt="wonders">
      <img src="/imgs/final/neusoft.png" alt="neusoft">
      <img src="/imgs/final/herdsric.png" alt="herdsric">
      <img src="/imgs/final/bosch.png" alt="bosch">

      <p>
        从事程序员和项目经理的工作。在上海虹桥塔台，复星，阿里巴巴，还有上汽的整车中都留下过我工作的痕迹。
      </p>

      <br>
      <p>
        我目前关注前端领域，熟悉原生和Vue框架，今后会不断探索Stable
        Diffusion以及机器学习的相关技术和项目
      </p>

      <p>
        我平时的兴趣是运动，看书和打游戏。同时我是NBA，任天堂的超级粉丝，如果你也这些方面的话题，我会非常高兴和你聊天。
      </p>

      <p>Find me on</p>
      <p flex="~ gap-3 wrap" class="mt--2!">
        <AppLink
          i-carbon-logo-github
          op75
          icon-btn
          to="https://github.com/superzdd"
        >
          Github
        </AppLink>
      </p>

      <br>
    </div>
  </div>
</template>

<style>
.icon-neusoft {
  background-image: url('/favicon.svg');
  width: 100px;
  height: 100px;
}
</style>
