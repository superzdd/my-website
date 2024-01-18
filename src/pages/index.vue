<script setup lang="ts" generic="T extends any, O extends any">
import sourceData from '~/data.json'
import type { Company } from '~/composables/company'
import AppLink from '~/components/AppLink.vue'
import CompanyLogo from '~/components/CompanyLogo.vue'

const companies: Company[] = [
  { name: '万达信息股份有限公司', imgSrc: '/imgs/final/wonders.png' },
  {
    name: '大连东软思维科技发展有限公司上海分公司',
    imgSrc: '/imgs/final/neusoft.png',
  },
  { name: '上海亨兹瑞信息科技有限公司', imgSrc: '/imgs/final/herdsric.png' },
  { name: '博世华域转向系统有限公司', imgSrc: '/imgs/final/bosch.png' },
  // 可以继续添加更多的公司对象
]

const { profile } = sourceData
</script>

<template>
  <div class="profile" text-left>
    <div class="my-name">
      <h1 font-size-7 font-bold>
        {{ profile.name }}
      </h1>
    </div>
    <div class="article">
      <p>Hi！你好，我是张辰海,是一名前端开发工程师。曾就职于：</p>
      <div flex="~" flex-col>
        <CompanyLogo
          v-for="company in companies"
          :key="company.name"
          :ele="company"
        />
      </div>

      <p>
        作为一名前端开发者，我常用原生和<span

          i-simple-icons-vuedotjs inline-block
        />框架。今后想不断探索AI技术领域，现在兴趣在Stable
        Diffusion和机器学习上。
      </p>

      <p>
        我喜欢球类运动，看书和打游戏。但玻璃人体质使我看得多动得少。我也是NBA，任天堂的超级粉丝，如果你也这些方面的话题，我会非常高兴和你聊天。
      </p>
    </div>
    <div class="collection">
      <p>代码仓库及博客</p>
      <p flex="~ gap-3 wrap">
        <AppLink to="https://github.com/superzdd">
          <span i-simple-icons-github />&nbsp;GitHub
        </AppLink>
        <AppLink to="https://gitee.com/superzdd">
          <span i-simple-icons-gitee />&nbsp;Gitee
        </AppLink>
        <AppLink to="https://www.jianshu.com/u/88883a723899">
          <span class="jianshu" />&nbsp;简书
        </AppLink>
      </p>
    </div>
  </div>
</template>

<style>
.profile {
  max-width: 1024px;
  line-height: 1.75;
}

.profile p {
  margin-top: 1.5rem;
}

.profile a {
  font-weight: inherit;
  text-decoration: none;
  border-bottom: 1px solid rgba(125, 125, 125, 0.3);
  transition: border 0.3s ease-in-out;

  display: flex;
  align-items: center;
}

.profile .collection {
  margin-top: 2.5rem;
}

.jianshu {
  --un-icon: url('/imgs/final/jianshu.svg');
  -webkit-mask: var(--un-icon) no-repeat;
  mask: var(--un-icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
  color: inherit;
  width: 1.2em;
  height: 1.2em;
}

.collection {
}
</style>
