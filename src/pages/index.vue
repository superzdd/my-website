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
      <p>Hi，你好，我是张辰海</p>
      <p>职业是一名前端开发工程师</p>
      <p>曾先后就职于</p>
      <p>万达信息股份有限公司</p>
      <p>大连东软思维科技发展有限公司上海分公司</p>
      <p>上海亨兹瑞信息科技有限公司</p>
      <p>博世华域转向系统有限公司</p>

      <p>
        Find me on
      </p>
      <p flex="~ gap-3 wrap" class="mt--2!">
        <AppLink i-carbon-logo-github op75 icon-btn to="https://github.com/superzdd">
          Github
        </AppLink>
      </p>

      <!-- <Counter :initial="1" /> -->

      <!-- <a i-simple-icons-github op75 href="https://github.com/superzdd" target="_blank">GitHub</a> -->
      <!-- <p>2010年从上海海事大学毕业后，</p>
      <p>2010-2015，从事c#开发windows桌面程序</p>
      <p>2015-2021，从事web前端,开发移动端html5</p>
      <p>2021-2023，从事项目经理，但发现自己不擅长，所以决心回到技术中来</p> -->

      <br>
    </div>
  </div>
</template>
