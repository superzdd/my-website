import { CommonTool } from './CommonTool'
import { DotLineConfig } from './DotLineConfig'

/**
 * 在canvas画布上画一个动来动去的点
 */
export class Dot {
  /**
   * 点的ID
   * 每个点都有一个ID，方便对象查找
   */
  public id: string // this.id();
  /**
   * 初始圆心横坐标
   */
  public org_x = 0 //
  /** 初始圆心纵坐标 */
  public org_y = 0 //
  /**
   * 初始圆心横坐标在整张画布中的相对百分比
   */
  private org_x_percent: number
  /**
   * 初始圆心纵坐标在整张画布中的相对百分比
   */
  private org_y_percent: number
  /** 半径 */
  private rad: number

  /**
   * 水平方向运动距离
   */
  public d_x: number = 0

  /**
   * 垂直方向运动距离
   */
  public d_y: number = 0
  /**
   * // 水平方向运动速度
   */
  public s_x: number
  /** 垂直方向运动速度 */
  public s_y: number
  /**
   * 点的颜色
   */
  private color: string
  /**
   * 声明周期 单位ms
   */
  private life: number
  /** 出生时间，Date.now()的数字 */
  private born: number
  /**
   * 销毁标志位
   * false -> 不销毁， true -> 销毁
   * 默认是false不销毁
   */
  public needDestory = false
  /**
   * 是否渲染完毕标志位
   */
  private rendered = false

  /**
   * @param x 圆心横坐标
   * @param y 圆心纵坐标
   * @param rad 圆的半径
   * @param s_x x轴的速度
   * @param s_y y轴的速度
   */
  constructor(x = 0, y = 0, rad = 0, s_x = 1, s_y = 1) {
    const canvasInfo = DotLineConfig.canvasInfo
    this.id = CommonTool.newID()

    // 修正x和y,以防出生点位于屏幕内部，导致圆会在边缘里反复弹跳出不来的情况
    if (x < rad)
      x = rad
    else if (x + rad > canvasInfo.width)
      x = canvasInfo.width - rad

    if (y < rad)
      y = rad
    else if (y + rad > canvasInfo.height)
      y = canvasInfo.height - rad

    this.org_x = x
    this.org_y = y
    this.org_x_percent = x / canvasInfo.width
    this.org_y_percent = y / canvasInfo.height
    this.rad = rad // 半径
    this.s_x = s_x // 水平方向运动速度
    this.s_y = s_y // 垂直方向运动速度
    this.color = CommonTool.color()
    this.life = 10000
    this.born = Date.now()
    this.needDestory = false
    this.rendered = false
  }

  public render(dotList: [Dot]) {
    this.d_x += this.s_x
    this.d_y += this.s_y

    // 碰撞检测
    // 如果球触碰到了屏幕边缘，对应方向速度取反
    // 获取当前圆心坐标
    const act_x = this.org_x + this.d_x
    const act_y = this.org_y + this.d_y

    const canvasInfo = DotLineConfig.canvasInfo

    if (act_x - this.rad <= 0 || act_x + this.rad >= canvasInfo.width)
      this.s_x *= -1

    if (act_y - this.rad <= 0 || act_y + this.rad >= canvasInfo.height)
      this.s_y *= -1

    const ctx = canvasInfo.ctx
    ctx.beginPath()
    ctx.arc(act_x, act_y, this.rad, 0, 2 * Math.PI, true)
    ctx.fillStyle = this.color
    ctx.fill()

    if (dotList) {
      for (const p of dotList) {
        if (p.id === this.id || p.rendered)
          continue

        const p1 = {
          x: act_x,
          y: act_y,
        }

        const p2 = {
          x: p.org_x + p.d_x + p.s_x,
          y: p.org_y + p.d_y + p.s_y,
        }

        const dis = CommonTool.distance(p1, p2)
        const disPercent
          = Math.round((dis / DotLineConfig.distanceThreshold) * 100) / 100
        if (disPercent <= 1) {
          CommonTool.line(
            canvasInfo,
            p1,
            p2,
            (1 - disPercent) * 2,
            1 - disPercent,
          )
        }
      }
    }
    this.rendered = true
  }
}
