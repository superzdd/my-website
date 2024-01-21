import type { ICanvasInfo, IPoint } from './Interface'

export class CommonTool {
  public static newID(): string {
    return Math.random().toString(36).substr(3) + Date.now().toString(36)
  }

  public static random255() {
    // return Math.floor(Math.random() * 256);
    return 255
  }

  public static color(): string {
    return `rgba(${this.random255()},${this.random255()},${this.random255()},0.5)`
  }

  public static distance(p1: IPoint, p2: IPoint) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y)
  }

  public static rect(canvasInfo: ICanvasInfo, x = 0, y = 0) {
    const { ctx } = canvasInfo
    ctx.clearRect(0, 0, canvasInfo.width, canvasInfo.height)
    ctx.fillStyle = `rgba(255,255,255,0.5)`
    ctx.fillRect(x, y, canvasInfo.width, canvasInfo.height)
  }

  public static line(
    canvasInfo: ICanvasInfo,
    p1: IPoint,
    p2: IPoint,
    lineWidth: number,
    alpha: number,
    color = [0, 0, 0],
  ) {
    const { ctx } = canvasInfo
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha})`
    ctx.beginPath()
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
  }
}
