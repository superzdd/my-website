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

    for (const b of dots) b.rendered = false

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i]
      if (dot.needDestory) {
        dots.splice(i, 1)
        i--
        continue
      }
      else {
        dot.render(dots)
      }
    }
  }
  requestAnimationFrame(startRender)
}

function createNewDot(e) {
  const { clientX: x, clientY: y } = e
  let s_x
    = DotLineConfig.dotSpeedBasic
    - Math.random() * DotLineConfig.dotSpeedBasic * 2
  if (s_x <= 1 && s_x >= -1)
    s_x = s_x > 0 ? 1 : -1

  let s_y
    = DotLineConfig.dotSpeedBasic
    - Math.random() * DotLineConfig.dotSpeedBasic * 2
  if (s_y <= 1 && s_y >= -1)
    s_y = s_y > 0 ? 1 : -1

  const d = new Dot(x, y, DotLineConfig.dotRadius, s_x, s_y)
  dots.push(d)
  return d
}

function initBackground() {
  resizeCanvas(dotLineConfig.initCanvas(app.value))

  const { dotRadius, totalDots, canvasInfo } = DotLineConfig
  const dotDiameter = dotRadius * 2
  for (let i = 0; i < totalDots; i++) {
    let clientX = ((Math.random() * 100 + 1) / 100) * canvasInfo.width

    if (clientX < dotDiameter)
      clientX = dotDiameter
    else if (clientX > canvasInfo.width - dotDiameter)
      clientX = canvasInfo.width - dotDiameter

    let clientY = Math.random() * canvasInfo.height

    if (clientY < dotDiameter)
      clientY = dotDiameter
    else if (clientY > canvasInfo.height - dotDiameter)
      clientY = canvasInfo.height - dotDiameter

    createNewDot({
      clientX,
      clientY,
    })
  }

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
