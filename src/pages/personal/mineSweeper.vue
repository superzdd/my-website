<!-- eslint-disable no-alert -->
<script setup lang="ts" generic="T extends any, O extends any">
import type { BlockState } from '~/composables/mine-sweeper/blockState'
import { GameState } from '~/composables/mine-sweeper/gameStat'
import { GameManager } from '~/composables/mine-sweeper/gameManager'
import { Env } from '~/composables/env'

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
  if (block.flagged)
    return 'bg-gray-600/10'

  if (!block.revealed)
    return 'bg-gray-600/40 hover:bg-gray/50'

  if (block.mine)
    return 'bg-red-500'
  else return numberColors[block.adjacentMines]
}

function getResetClass() {
  const state = GM.gameState
  let resetClass = ''

  switch (state) {
    case GameState.WIN:
      resetClass = 'bg-green-600/40 hover:bg-green/50'
      break
    case GameState.CHEAT:
      resetClass = 'bg-red-600/40 hover:bg-red/50'
      break
    default:
      resetClass = 'bg-white-600/40 hover:bg-white/50'
      break
  }

  return resetClass
}

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
}

function onDigClick() {
  if (!currentEnv.isMobile) {
    // console.log("[onDigClick] desktop mode, quit")
    return
  }

  digNow.value = !digNow.value
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

/**
 * @click="onClick(block)"
        @contextmenu.prevent="onRightClick(block)"
        @dblclick="onDBLClick(block)"
 */
</script>

<template>
  <div class="game-container" flex="~" flex-col items-center justify-center>
    <!-- 标题 -->
    <h1 p-2 font-size-5 font-bold>
      来玩扫雷吧~
    </h1>
    <div
      class="info-container"
      flex="~"
      items-center
      justify-between
      font-size-4
    >
      <div class="info-left" flex="~" w-35 items-center justify-left>
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
      <div
        class="info-center"
        flex="~"

        w-10 flex-grow-1 items-center justify-center border-l border-r border-gray-50
      >
        <button
          class="reset-btn"
          :class="getResetClass()"
          flex="~"
          h-10
          w-10
          items-center
          justify-center
          border-b-2
          border-r-2
          border-rd
          shadow-sm
          @click="onResetClick()"
        >
          <template v-if="GM.gameState === GameState.WIN">
            <span i-carbon-face-wink />
          </template>
          <template
            v-else-if="
              GM.gameState === GameState.LOSE
                || GM.gameState === GameState.CHEAT
            "
          >
            <span i-carbon-face-dizzy />
          </template>
          <template v-else>
            <span i-carbon-face-satisfied />
          </template>
        </button>
      </div>
      <div class="info-right" w-35>
        <div flex="~" items-center justify-right>
          <!-- 手机端切换按钮 -->
          <button
            flex="~"
            ml
            h-8
            w-8
            items-center
            justify-center
            border-b-3
            border-r-3
            border-rd
            shadow-sm
            :class="getToggleDigClass()"
            @click="onDigClick()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="16"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M208 64a48 48 0 1 1 96 0a48 48 0 1 1-96 0M9.8 214.8c5.1-12.2 19.1-18 31.4-12.9l19.5 8.1l22.9-38.1C99.9 144.6 129.3 128 161 128c51.4 0 97 32.9 113.3 81.7l34.6 103.7l79.3 33.1l34.2-45.6c6.4-8.5 16.6-13.3 27.2-12.8s20.3 6.4 25.8 15.5l96 160c5.9 9.9 6.1 22.2.4 32.2S555.5 512 544 512H288c-11.1 0-21.4-5.7-27.2-15.2s-6.4-21.2-1.4-31.1l16-32c5.4-10.8 16.5-17.7 28.6-17.7h32l22.5-30L22.8 246.2c-12.2-5.1-18-19.1-12.9-31.4zm82.8 91.8l112 48c11.8 5 19.4 16.6 19.4 29.4v96c0 17.7-14.3 32-32 32s-32-14.3-32-32v-74.9l-60.6-26l-37 111c-5.6 16.8-23.7 25.8-40.5 20.2s-25.8-23.7-20.3-40.4l48-144l11-33z"
              />
            </svg>
          </button>

          <button
            flex="~"
            ml-1
            h-8
            w-8
            items-center
            justify-center
            border-b-3
            border-r-3
            border-rd
            shadow-sm
            :class="getToggleFlagClass()"
            @click="onDigClick()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="16"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32v448c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 游戏配置按钮区 -->
    <div flex="~" mt-1 items-center justify-center>
      <span>剩余</span>
      <span i-mdi-mine inline-block h-5 w-5 />
      <span ml-2>{{ flaggedCount }}</span>
    </div>
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
          v-touch-options="{ touchHoldTolerance: 600 }"
          m="0.5"
          class="reset-btn"
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
              text-red
            >
              <!-- 大叉 -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="M20 20L4 4m16 0L4 20"
                />
              </svg>
            </div>
            <div v-else text-red>
              <!-- 旗杆 -->
              <!-- <span block i-carbon-flag-filled></span> -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6 20.5V5h7.192l.4 2H19v8h-5.192l-.4-2H7v7.5H6Z"
                />
              </svg>
            </div>
          </template>
          <template v-else-if="block.revealed || dev">
            <div v-if="block.mine">
              <!-- 炸弹 -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M23 13v-2h-3.07a7.988 7.988 0 0 0-1.62-3.9l2.19-2.17l-1.43-1.43l-2.17 2.19A7.988 7.988 0 0 0 13 4.07V1h-2v3.07c-1.42.18-2.77.74-3.9 1.62L4.93 3.5L3.5 4.93L5.69 7.1A7.988 7.988 0 0 0 4.07 11H1v2h3.07c.18 1.42.74 2.77 1.62 3.9L3.5 19.07l1.43 1.43l2.17-2.19c1.13.88 2.48 1.44 3.9 1.62V23h2v-3.07c1.42-.18 2.77-.74 3.9-1.62l2.17 2.19l1.43-1.43l-2.19-2.17a7.988 7.988 0 0 0 1.62-3.9H23M12 8a4 4 0 0 0-4 4H6a6 6 0 0 1 6-6v2Z"
                />
              </svg>
            </div>
            <div v-else>
              <!-- 展示数字 -->
              {{ block.adjacentMines }}
            </div>
          </template>
        </button>
      </div>
    </div>
    <div class="desc-container" flex="~" items-left flex-col justify-left>
      <div flex="~" items-left flex-col text-left font-size-4>
        <h1 p1 font-size-5 font-italic>
          操作说明：
        </h1>
        <template v-if="!currentEnv.isMobile">
          <h2 p1>
            <span i-mdi-mouse-left-click-outline w-20 />&nbsp;翻开格子,
          </h2>
          <h2 p1>
            <span i-mdi-mouse-right-click-outline w-20 />&nbsp;标记地雷
          </h2>
          <h2 p1>
            <span i-mdi-mouse-left-click-outline /><span
              i-mdi-mouse-left-click-outline
            />&nbsp;翻开一圈
          </h2>
        </template>
        <template v-else>
          <h2 p1 flex="~">
            <div flex="~" w-12 items-center justify-center>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23.5"
                height="20"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M208 64a48 48 0 1 1 96 0a48 48 0 1 1-96 0M9.8 214.8c5.1-12.2 19.1-18 31.4-12.9l19.5 8.1l22.9-38.1C99.9 144.6 129.3 128 161 128c51.4 0 97 32.9 113.3 81.7l34.6 103.7l79.3 33.1l34.2-45.6c6.4-8.5 16.6-13.3 27.2-12.8s20.3 6.4 25.8 15.5l96 160c5.9 9.9 6.1 22.2.4 32.2S555.5 512 544 512H288c-11.1 0-21.4-5.7-27.2-15.2s-6.4-21.2-1.4-31.1l16-32c5.4-10.8 16.5-17.7 28.6-17.7h32l22.5-30L22.8 246.2c-12.2-5.1-18-19.1-12.9-31.4zm82.8 91.8l112 48c11.8 5 19.4 16.6 19.4 29.4v96c0 17.7-14.3 32-32 32s-32-14.3-32-32v-74.9l-60.6-26l-37 111c-5.6 16.8-23.7 25.8-40.5 20.2s-25.8-23.7-20.3-40.4l48-144l11-33z"
                />
              </svg>
            </div>
            <span flex-grow-1>翻开格子</span>
          </h2>
          <h2 p1 flex="~">
            <div flex="~" w-12 items-center justify-center>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.5"
                height="20"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32v448c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48z"
                />
              </svg>
            </div>
            <span flex-grow-1>标记地雷</span>
          </h2>
          <h2 p1 flex="~">
            <div flex="~" w-12 items-center justify-center>
              <span i-mdi-gesture-tap-hold font-size-5 />
            </div>
            <span flex-grow-1>翻开周围</span>
          </h2>
        </template>
      </div>
    </div>
  </div>
</template>

<style>
.game-container {
  margin-top: 7rem;
}

.info-container,
.desc-container {
  width: 100%;
  padding: 0 1.25rem;
}

span {
  display: inline-block;
}

.reset-btn {
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  user-select: none;
}
</style>
