// 获取尺寸
export class RemTool {
  public static width = 0
  public static height = 0
  public static remUnit = 0

  public static getWindowSize() {
    /**
     * 分别用三组数据获取页面的宽高，分别是
     * window.innerWidth window.innerHeight
     * document.body.clientWidth document.body.clientHeight
     * document.documentElement.clientWidth document.documentElement.clientHeight
     * 优先级依次是 document.body.clientWidth > document.documentElement.clientWidth > window.innerWidth
     * 优先级的原因在于，window.innerWidth会包含视口滚动条的宽度，document.documentElement不包含滚动条，指的是<html>渲染区域的高度，document.body也不包含滚动条，指的是<body>渲染区域的高度
     * 而由于我们代码都是写在<body>当中，拿到body的高度是更精确的，而body和html之间的差异基本没有，更多的考虑是在于浏览器兼容，所以才有了这样的排序
     */

    // wBody,hBody -> document.body 宽高
    // wDocument, hDocument -> document.documentElement宽高
    // wWindow,hWindow -> window 宽高
    let [wBody, hBody, wDocument, hDocument, wWindow, hWindow] = [
      0,
      0,
      0,
      0,
      0,
      0,
    ]

    if (document.body) {
      wBody = document.body.clientWidth
      hBody = document.body.clientHeight
    }

    if (document.documentElement) {
      wDocument = document.documentElement.clientWidth
      hDocument = document.documentElement.clientHeight
    }

    if (window) {
      wWindow = window.innerWidth
      hWindow = window.innerHeight
    }

    if (wBody) {
      this.width = wBody
      this.height = hBody
    }
    else if (wDocument) {
      this.width = wDocument
      this.height = hDocument
    }
    else {
      this.width = wWindow
      this.height = hWindow
    }

    return {
      width: this.width,
      height: this.height,
    }
  }
}
