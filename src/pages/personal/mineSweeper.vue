<!-- eslint-disable no-alert -->
<script setup lang="ts" generic="T extends any, O extends any">
import type { BlockState } from '~/composables/mine-sweeper/blockState'
import { GameState } from '~/composables/mine-sweeper/gameStat'
import { GameManager } from '~/composables/mine-sweeper/gameManager'
import { Env } from '~/composables/env'

import SvgDig from '~/components/SvgDig.vue'
import SvgFlag from '~/components/SvgFlag.vue'
import SvgCross from '~/components/SvgCross.vue'

const dictChnDifficulty = {
  Easy: '简单',
  Normal: '普通',
  Hard: '困难',
}

const selectedDifficulty: ref<'Easy' | 'Normal' | 'Hard'> = ref('Easy')

const dev = false
const currentEnv = Env.getEnv()
const GM = reactive(
  new GameManager(selectedDifficulty.value, currentEnv.isMobile),
)

const flaggedCount = computed(() => {
  const totalMines = GM.current_diff_config.mineCount
  const blocks = GM.blocks.flat() as BlockState[]
  return totalMines - blocks.filter(e => e.flagged).length
})

const numberColors = [
  'text-transparent',
  'text-blue-500',
  'text-green-500',
  'text-yellow-500',
  'text-orange-500',
  'text-red-500',
  'text-purple-500',
  'text-pink-500',
  'text-black-500',
]

const digNow = ref(true)

function getBlockClass(block: BlockState) {
  if (block.mine && block.flagged)
    return 'bg-gray-600/10'

  if (!block.revealed)
    return 'bg-gray-600/40 hover:bg-gray/50'

  if (block.mine || (!block.mine && block.flagged))
    return 'bg-red-500'
  else return numberColors[block.adjacentMines]
}

function getResetClass() {
  const state = GM.gameState
  let resetClass = 'c-black/80 '

  switch (state) {
    case GameState.WIN:
      resetClass += 'bg-yellow-400/80 hover:bg-yellow-500/80'
      break
    case GameState.LOSE:
      resetClass += 'bg-green-400/80 hover:bg-green-500/80'
      break
    case GameState.CHEAT:
      resetClass += 'bg-red-400/80 hover:bg-red-500/80'
      break
    default:
      resetClass += 'bg-yellow-400/80 hover:bg-yellow-500/80'
      break
  }

  return resetClass
}

const faceClass = computed(() => {
  const state = GM.gameState
  let strClass = ''
  switch (state) {
    case GameState.WIN:
      strClass += 'i-carbon-face-wink'
      break
    case GameState.CHEAT:
      strClass += 'i-carbon-face-dissatisfied'
      break
    case GameState.LOSE:
      strClass += 'i-carbon-face-dizzy'
      break
    default:
      strClass += 'i-carbon-face-satisfied'
      break
  }

  return strClass
})

function getToggleDigClass() {
  let resetClass = ''

  if (digNow.value)
    resetClass = 'bg-green-600/40 hover:bg-green/50'
  else resetClass = 'bg-gray-600/40 hover:bg-gray/50'

  return resetClass
}

function getToggleFlagClass() {
  let resetClass = ''

  if (!digNow.value)
    resetClass = 'bg-green-600/40 hover:bg-green/50'
  else resetClass = 'bg-gray-600/40 hover:bg-gray/50'

  return resetClass
}

function onClick(block: BlockState) {
  if (currentEnv.isMobile) {
    // console.log("[onClick] mobile mode, quit")
    return
  }

  GM.revealBlock(block)
}

function onRightClick(block: BlockState) {
  // 手机端长按按钮，也会触发右键事件
  // 这里选择忽略手机的右键事件
  if (currentEnv.isMobile) {
    // console.log("[onRightClick] mobile mode, quit")
    return
  }
  GM.flag(block)
}

function onDBLClick(block: BlockState) {
  if (currentEnv.isMobile) {
    // console.log("[onDBLClick] mobile mode, quit")
    return
  }
  GM.expend(block)
}

function onResetClick() {
  GM.gameReset()
  digNow.value = true
}

function onDigClick(dig: boolean) {
  if (!currentEnv.isMobile) {
    // console.log("[onDigClick] desktop mode, quit")
    return
  }

  digNow.value = dig
}

function onTap(block: BlockState) {
  return function () {
    if (!currentEnv.isMobile)
      return
    // console.log(`[onTap], digNow: ${digNow.value}`)
    if (digNow.value)
      GM.revealBlock(block)
    else GM.flag(block)
  }
}

function onHoldTap(block: BlockState) {
  return function (mouseEvent) {
    if (!currentEnv.isMobile)
      return
    mouseEvent.preventDefault()
    // console.log("[onHoldTap]")
    GM.expend(block)
  }
}

watchEffect(() => {
  switch (GM.gameState) {
    case GameState.CHEAT:
    case GameState.LOSE:
      GM.showAll()
      break
    case GameState.WIN:
      GM.showAll()
      break
    default:
      break
  }
})

watchEffect(() => {
  GM.updateConfig(selectedDifficulty.value)
})
</script>

<template>
  <div class="game-container" flex="~" flex-col items-center justify-center>
    <!-- 标题&信息展示 -->
    <h1 p-2 font-size-5 font-bold>
      来玩扫雷吧~
    </h1>
    <div
      class="info-container b-coolgray/40"
      flex="~"
      items-center
      justify-between
      b-b
      p-2
      font-size-4
    >
      <div
        class="info-left"
        flex="~"
        w-35
        flex-grow-1
        items-center
        justify-right
      >
        <!-- 选择难度 -->
        <!-- <span>难度：</span> -->
        <div>
          <select
            id="selDifficult"
            v-model="selectedDifficulty"
            name="sel"
            h-8
            w-26
            border-rd
            border="1 gray-500/20"
          >
            <option
              v-for="x in Object.keys(dictChnDifficulty)"
              :key="x"
              :value="x"
            >
              {{
                `地雷: ${
                  currentEnv.isMobile
                    ? GM.CONFIG_MOBILE_DIFFICULTY_LEVELS[x].mineCount
                    : GM.CONFIG_DIFFICULTY_LEVELS[x].mineCount
                }`
              }}
            </option>
          </select>
        </div>
      </div>
      <div class="info-center" flex="~" w-20 items-center justify-center>
        <button
          v-touch:tap="onResetClick"
          class="reset-btn"
          :class="getResetClass()"
          flex="~"
          h-10
          w-10
          items-center
          justify-center
          border-b-1
          border-r-1
          border-coolgray
          border-rd
          font-size-6
        >
          <div :class="faceClass" />
        </button>
      </div>
      <div class="info-right" w-35 flex-grow-1>
        <div v-show="currentEnv.isMobile" flex="~" items-center justify-left>
          <!-- 手机端切换按钮 -->
          <button
            class="dig-btn"
            flex="~"
            h-8
            w-8
            items-center
            justify-center
            border-b-1
            border-r-1
            border-coolgray
            :class="getToggleDigClass()"
            @click="onDigClick(true)"
          >
            <SvgDig />
          </button>

          <button
            class="dig-btn"
            flex="~"
            ml-1
            h-8
            w-8
            items-center
            justify-center
            border-b-1
            border-r-1
            border-coolgray
            :class="getToggleFlagClass()"
            @click="onDigClick(false)"
          >
            <SvgFlag />
          </button>
        </div>
      </div>
    </div>

    <!-- 配置区 -->
    <div flex="~" items-center justify-center p-2>
      <span>剩余</span>
      <span i-mdi-mine inline-block h-5 w-5 />
      <span ml-2>{{ flaggedCount }}</span>
    </div>

    <!-- 游戏区 -->
    <div p5>
      <div
        v-for="(row, y) in GM.blocks"
        :key="y"
        flex="~"
        items-center
        justify-center
      >
        <!-- 每个地雷 -->
        <button
          v-for="block in row"
          :key="block.id"
          v-touch:tap="onTap(block)"
          v-touch:hold="onHoldTap(block)"
          v-touch-options="{ touchHoldTolerance: 500 }"
          m="0.5"
          class="mine-block"
          :class="getBlockClass(block)"
          flex="~"
          h-7
          w-7
          items-center
          justify-center
          border="1 gray-500/20"
          @click="onClick(block)"
          @contextmenu.prevent="onRightClick(block)"
          @dblclick="onDBLClick(block)"
        >
          <template v-if="block.flagged">
            <div
              v-if="
                !block.mine && GM.gameState === GameState.LOSE && block.revealed
              "
            >
              <SvgCross h-5 w-5 />
            </div>
            <div v-else text-red>
              <!-- 旗杆 -->
              <div i-mdi-flag h-5 w-5 />
            </div>
          </template>
          <template v-else-if="block.revealed || dev">
            <div v-if="block.mine">
              <!-- 炸弹 -->
              <div i-mdi-mine h-4 w-4 />
            </div>
            <div v-else>
              <!-- 展示数字 -->
              {{ block.adjacentMines }}
            </div>
          </template>
        </button>
      </div>
    </div>

    <!-- 操作说明 -->
    <div class="desc-container" flex="~" items-left flex-col justify-left>
      <div flex="~" items-left flex-col text-left font-size-4>
        <h1 p1 font-size-5 font-italic>
          操作说明：
        </h1>
        <!-- 桌面端 -->
        <template v-if="!currentEnv.isMobile">
          <h2 p1 flex="~">
            <div w-12 flex items-center justify-left>
              <span i-mdi-mouse-left-click-outline />
            </div>
            <span flex-grow-1>翻开格子</span>
          </h2>
          <h2 p1 flex="~">
            <div w-12 flex items-center justify-left>
              <span i-mdi-mouse-right-click-outline />
            </div>
            <span flex-grow-1>标记地雷</span>
          </h2>
          <h2 flex p1>
            <div w-12 flex items-center justify-left>
              <span i-mdi-mouse-left-click-outline />
              <span i-mdi-mouse-left-click-outline m-l--1 />
            </div>
            <span flex-grow-1>翻开一圈</span>
          </h2>
        </template>
        <!-- 手机端 -->
        <template v-else>
          <h2>“翻开格子”和“标记地雷”请通过<b>右上方</b>按钮切换</h2>
          <h2 flex p1>
            <div w-14 flex items-center justify-start>
              <SvgDig />
            </div>
            <span flex-grow-1>翻开格子</span>
          </h2>
          <h2 p1 flex="~">
            <div w-14 flex items-center justify-start>
              <SvgFlag />
            </div>
            <span flex-grow-1>标记地雷</span>
          </h2>
          <h2 flex p1>
            <div w-14 flex items-center justify-start>
              <div i-mdi-gesture-tap-hold h-5 w-5 />
              1s
            </div>
            <span flex-grow-1>翻开周围，请注意误爆地雷</span>
          </h2>
        </template>
      </div>
    </div>
  </div>
</template>

<style>
.game-container {
  margin-top: 1rem;
  width: 100vw;
  max-width: 80rem;
}

.info-container {
  /* width: 100%; */
}

.desc-container {
  width: auto;
  max-width: 70vw;
}

/* span {
  display: inline-block;
} */

.reset-btn,
.mine-block {
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  user-select: none;
}

.reset-btn:active,
.dig-btn:active {
  transition: 0.2s;
  transform: scale(1.1);
}
</style>
