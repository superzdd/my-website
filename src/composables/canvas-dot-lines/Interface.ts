/**
 * CanvasInfo 画布基本信息
 */
export interface ICanvasInfo {
  //
  /** canvas的实例对象 */
  ctx: any
  /**
   * createjs的canvas实例对象
   * 如果用原生canvas对象，那这个createjs对象可以为空
   */
  stage: any
  /**
   * 画布的宽度，指的是画布的逻辑宽度，即屏幕宽度像素数量 * ratio（每像素包含的实际像素）
   */
  width: number
  /**
   * 画布的高度，指的是画布的逻辑高度，即屏幕高度像素数量 * ratio（每像素包含的实际像素）
   */
  height: number
  /** 画布中心点x */
  centerX: number
  /** 画布中心点y */
  centerY: number
  /** 左上角到中心点的距离 */
  distanceToCenter: number
}

export interface IPoint {
  x: number
  y: number
}
