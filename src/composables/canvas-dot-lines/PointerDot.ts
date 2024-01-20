// import { ICanvasInfo, IPoint } from "./Interface";
// import { Dot } from "./Dot";
// import { CommonTool } from "./CommonTool";
// import { DotLineConfig } from "./DotLineConfig";

// /**
//  * 在点击位置上，生成一个点
//  */
// class PointerDot {
//   private dot: Dot;
//   private rad: number;

//   /**
//    *
//    * @param canvasInfo 画布基本信息
//    * @param x 圆心横坐标
//    * @param y 圆心纵坐标
//    * @param s_x x轴的速度
//    * @param s_y y轴的速度
//    * @param distanceThreshold 两点之间连线阈值
//    */
//   constructor(canvasInfo: ICanvasInfo, x = 0, y = 0) {
//     this.rad = DotLineConfig.redDotRadius;
//     this.dot = new Dot(x, y, this.rad);
//   }

//   /**
//    * 设定初始位置
//    * @param x 圆心x
//    * @param y 圆心y
//    */
//   public updatePosition(x: number, y: number) {
//     const { rad } = this;
//     const canvasInfo = DotLineConfig.canvasInfo;

//     if (x < rad) {
//       x = rad;
//     } else if (x + rad > canvasInfo.width) {
//       x = canvasInfo.width - rad;
//     }

//     if (y < rad) {
//       y = rad;
//     } else if (y + rad > canvasInfo.height) {
//       y = canvasInfo.height - rad;
//     }

//     this.dot.org_x = x + this.rad * 2;
//     this.dot.org_y = y + this.rad * 2;
//   }

//   /**
//    * 小球逐帧运动
//    * @param dotList 屏幕上所有的小球集合
//    */
//   public render(dotList: [Dot]) {
//     const { org_x: act_x, org_y: act_y } = this.dot;
//     const distanceThreshold = DotLineConfig.distanceThreshold;

//     for (let p of dotList) {
//       let p1 = {
//         x: act_x,
//         y: act_y,
//       };

//       let p2 = {
//         x: p.org_x + p.d_x + p.s_x,
//         y: p.org_y + p.d_y + p.s_y,
//       };

//       let dis = CommonTool.distance(p1, p2);
//       let disPercent = Math.round((dis / distanceThreshold) * 100) / 100;
//       if (disPercent <= 1) {
//         CommonTool.line(
//           DotLineConfig.canvasInfo,
//           p1,
//           p2,
//           (1 - disPercent) * 3,
//           1 - disPercent,
//           [255, 0, 0]
//         );
//       }
//     }
//   }
// }
