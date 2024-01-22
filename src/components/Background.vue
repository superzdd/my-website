<script setup>
import { onMounted, ref } from 'vue'
import { DotLineConfig } from '~/composables/canvas-dot-lines/DotLineConfig'
import { CommonTool } from '~/composables/canvas-dot-lines/CommonTool'
import { Dot } from '~/composables/canvas-dot-lines/Dot'

const app = ref()
const dotLineConfig = new DotLineConfig()

const canvasWidth = ref(0)
const canvasHeight = ref(0)
const cssWidth = ref(0)
const cssHeight = ref(0)
const cssLeft = ref(0)
const cssTop = ref(0)

const dots = []

function resizeCanvas(ele) {
  const { cWidth, cHeight, width, height, left, top } = ele
  canvasWidth.value = cWidth
  canvasHeight.value = cHeight
  cssWidth.value = width
  cssHeight.value = height
  cssLeft.value = left
  cssTop.value = top

  startRender()
}

function startRender() {
  // setTimeout(() => {
  //   CommonTool.rect(DotLineConfig.canvasInfo);
  // }, 1);
  const now = Date.now()
  const canvasInfo = DotLineConfig.canvasInfo
  if (now - DotLineConfig.lastRenderTime >= DotLineConfig.renderInterval) {
    DotLineConfig.lastRenderTime = now
    CommonTool.rect(canvasInfo)

    if (dots.length < 30 && Math.random() < 0.2)
      createNewDot()

    for (const b of dots) b.rendered = false

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i]
      if (dot.needDestory) {
        dots.splice(i, 1)
        i--
        continue
      }
      else {
        dot.render(dots, now)
      }
    }
  }
  requestAnimationFrame(startRender)
}

function createNewDot() {
  const { x, y, s_x, s_y } = initRandomBorn()
  const d = new Dot(x, y, DotLineConfig.dotRadius, s_x, s_y)
  dots.push(d)
  return d
}

/** 定义点的出生位置以及初始速度 */
function initRandomBorn() {
  // 为了让点不显得特别乱，点需要从屏幕边缘弹射出来，并且是慢慢地，随机地飞出来
  const canvasInfo = DotLineConfig.canvasInfo
  const bornXs = [0, canvasInfo.width / 2, canvasInfo.width]
  const bornYs = [0, canvasInfo.height / 2, canvasInfo.height]

  let rdmXSeed = Math.floor(Math.random() * 3)
  let rdmYSeed = Math.floor(Math.random() * 3)

  if (rdmXSeed === 1 && rdmYSeed === 1) {
    if (Math.random() < 0.5)
      rdmXSeed = Math.round(Math.random()) * 2
    else
      rdmYSeed = Math.round(Math.random()) * 2
  }

  const x = bornXs[rdmXSeed]
  const y = bornYs[rdmYSeed]

  let s_x = 1 + Math.random() * DotLineConfig.dotSpeedBasic
  let s_y = 1 + Math.random() * DotLineConfig.dotSpeedBasic

  switch (rdmXSeed) {
    case 1:
      s_x *= 0.3
      break
    case 2:
      s_x *= -1
      break
    case 0:
    default:
      break
  }

  switch (rdmYSeed) {
    case 1:
      s_y *= 0.3
      break
    case 2:
      s_y *= -1
      break
    case 0:
    default:
      break
  }

  return {
    x,
    y,
    s_x,
    s_y,
  }
}

function initBackground() {
  resizeCanvas(dotLineConfig.initCanvas(app.value))
  startRender()
}

onMounted(() => {
  initBackground()
})
</script>

<template>
  <canvas
    ref="app"
    :width="canvasWidth"
    :height="canvasHeight"
    :style="{
      width: `${cssWidth}px`,
      height: `${cssHeight}px`,
      left: `${cssLeft}px`,
      top: `${cssTop}px`,
    }"
  />
</template>

<style></style>
