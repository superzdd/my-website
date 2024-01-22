import type { ICanvasInfo } from './Interface'
import { RemTool } from '~/composables/RemTool'

export class DotLineConfig {
  /**
   * 上一次的渲染时间
   */
  public static lastRenderTime = 0
  /**
   * 渲染间隔
   */
  public static renderInterval = Math.round(1000 / 60)
  /**
   * 默认第一次总共点的数量
   */
  public static totalDots = 100
  /** 每个点的半径 */
  public static dotRadius = 2 * window.devicePixelRatio
  /** 每个点的颜色 */
  public static dotColor = `rgba(0,0,0,0.5)`
  /** 红点半径 */
  public static redDotRadius = 4
  /** 每个点的初始速度 */
  public static dotSpeedBasic = 2.5
  /** 两点之间连线阈值 */
  public static distanceThreshold = 200
  /** 全局唯一canvasInfo */
  public static canvasInfo: ICanvasInfo

  public static refreshDotColor() {
    let dark = false
    if (isDark !== null && isDark !== undefined)
      dark = isDark.value

    DotLineConfig.dotColor = dark ? `rgba(100,100,100,0.5)` : `rgba(0,0,0,0.5)`
  }

  public initCanvas(canvas: HTMLCanvasElement) {
    const canvasInfo: ICanvasInfo = {
      ctx: canvas.getContext('2d'),
      stage: null,
      width: 0,
      height: 0,
      centerX: 0,
      centerY: 0,
      distanceToCenter: 0,
    }

    DotLineConfig.refreshDotColor()
    DotLineConfig.canvasInfo = canvasInfo
    return this.updateCanvas()
  }

  public updateCanvas() {
    const windowSizeInfo = RemTool.getWindowSize()
    const ratio = window.devicePixelRatio

    const { canvasInfo } = DotLineConfig
    canvasInfo.width = windowSizeInfo.width * ratio
    canvasInfo.height = windowSizeInfo.height * ratio
    canvasInfo.centerX = canvasInfo.width / 2
    canvasInfo.centerY = canvasInfo.height / 2
    canvasInfo.distanceToCenter = Math.sqrt(
      canvasInfo.centerX * canvasInfo.centerX
      + canvasInfo.centerY * canvasInfo.centerY,
    )

    const cssWidth = windowSizeInfo.width
    const cssHeight = windowSizeInfo.height

    return {
      cWidth: canvasInfo.width,
      cHeight: canvasInfo.height,
      width: cssWidth,
      height: cssHeight,
      left: (windowSizeInfo.width - cssWidth) / 2,
      top: (windowSizeInfo.height - cssHeight) / 2,
    }
  }
}
