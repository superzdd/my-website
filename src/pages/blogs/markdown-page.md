# [Vue3] 使用MarkDown文件做页面

分享下如何通过`MarkDown`(.md)文件直接生成页面内容的方法。

## 呈现形式

- 最终实现效果：将写好的xxx.md文件放到项目中，编译，即可通过url访问到，并正确渲染

### 举个栗子

1. 将`xxx.md`放入`/src/pages`文件夹中：

```plaintext
/my-vue3-ts-project
|--- src/
|    |--- pages/
|    |    |--- code-repo-exchange.md      # 将md文件放在这里
|    |--- App.vue
```

2. 编译`nr dev`(即`npm/pnpm/yarn run dev`)，通过`domain/code-repo-exchange`即可访问：

<img style="width:40vw; height:auto;" src="/blogs/code-repo-exchange/url-view.png"/>

[体验地址](https://vocal-florentine-2d647c.netlify.app/code-repo-exchange)
~网站样式没有全部调整完，夜间模式会有小问题~

下面对其实现方式进行说明：

## 项目环境

Vue3 | VueRouter | Vite | vitesse | Typescript

```js
"dependencies": {
    "vue": "^3.3.10",
    "vue-router": "^4.2.5"
  },
```

## 实现方式

接下来我会列出在项目中需要新增的内容，修改点旁的注释如果看不明白可以先跳过。

> 由于新增的内容技术角度不完全一致，详细解释在后续实现思路里再说明

1. 安装依赖

下方提到的内容都要添加：

```js
// package.json
"devDependencies": {
    "@unhead/vue": "^1.8.10",                  // vue中给markdown文件添加header
    "github-markdown-css": "^5.5.0",        // markdown通用样式
    "markdown-it-anchor": "^8.6.7",          // 为Markdown标题生成唯一的ID，实现导航
    "markdown-it-highlightjs": "^4.0.1",     // 代码块高亮样式
    "markdown-it-prism": "^2.3.0",            // 代码块高亮样式，和highlightjs功能一致。用一个就行了，我最终没用这个
    "unplugin-vue-markdown": "^0.25.2", // 实现markdown的核心库，内部分装了markdown-it
  },
```

PS:

- `dependencies`和`devDependencies`两个文件夹，从实现角度装在哪个文件夹都可以
- 我的安装工具是`ni`，原因是我用`npm`,`pnpm`,`yarn`装，要么慢，要么报错。
  也可能项目一开始就是用`ni`装的，只有`ni`才比较顺利。

2. Vite修改配置
   引入`Markdown`及样式，并修改`vue`和`vue router`插件

```js
// vite.config.ts

// Markdown related
import Markdown from "unplugin-vue-markdown/vite";
import MarkdownItAnchor from "markdown-it-anchor";
import markdownItHighlightjs from "markdown-it-highlightjs";

export default defineConfig({
  plugins: [
    // Vue为新增，之前Vue是配置在VueMacros中，现在为了md文件，删除了VueMacros的相关配置
    Vue({
      include: [/\.vue$/, /\.md$/], // <-- allows Vue to compile Markdown files
    }),
    // 整个Markdown都是新增内容
    Markdown({
      headEnabled: true,
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      // A function providing the Markdown It instance gets the ability to apply custom settings/plugins
      markdownItSetup(md) {
        md.use(MarkdownItAnchor)
        md.use(markdownItHighlightjs)
      },
      // Class names for the wrapper div
      wrapperClasses: "markdown-body", // markdown-body是一个class类，将和github-markdown-css包对应
    }),
    // 注释所有VueMacros的配置，VueMacros和Vue两个会起冲突
    // 可能在VueMacros里也能实现Markdown，但又是一个技术，而且当前包含的内容还不多，暂时就不管了
    // VueMacros({
    //   defineOptions: false,
    //   defineModels: false,
    //   plugins: {
    //     vue: Vue({
    //       script: {
    //         propsDestructure: true,
    //         defineModel: true,
    //       },
    //     }),
    //   },
    // }),

    // VueRouter需新增配置{ extensions: [".vue", ".md"] }
    // https://github.com/posva/unplugin-vue-router
    VueRouter({ extensions: [".vue", ".md"] }),
})
```

3. main.ts 新增

```js
import { createHead } from "@unhead/vue";
import "github-markdown-css";
import "highlight.js/styles/default.css";

const head = createHead() // <--
app.use(head) // <--
```

4. pages中添加\*.md文件

```plaintext
/my-vue3-ts-project
|--- src/
|    |--- pages/
|    |    |--- code-repo-exchange.md      # 将md文件放在这里
|    |--- App.vue
```

4.1 在当前组件中渲染`Markdown`

```html
<script setup>
  import HelloWorld from "~/pages/code-repo-exchange.md"
</script>

<template>
  <HelloWorld class="markdown-body" />
</template>
```

上面这几部即所有修改内容，完成后应该就能成功。

## 实现思路

为了实现以上效果，需要集成3个主要技术到项目中：
<img style="width:40vw; height:auto;" src="/blogs/code-repo-exchange/mind.png"/>

### 1. markdown核心

#### unplugin-vue-markdown

这个库是实现markdown的核心库，帮助vue封装markdown-it。
`markdown-it`是一项更泛用的技术，是一个用于解析和转换 Markdown 文档的 JavaScript 库，适用于其他`JavasSript`框架(包含`nodejs`)场景。
`unplugin-vue`是`Vue`官方团队大佬的作品啦，品质有保证。

- [unplugin-vue-markdown Git主页](https://github.com/unplugin/unplugin-vue-markdown?tab=readme-ov-file) ，其中包含了`Vue3`使用中核心引入逻辑
- [markdown-it官网](https://markdown-it.github.io/markdown-it/)，该网站更多是方法论，对本项目语法基本不适用

### 2. markdown样式

样式是单独引入的。一开始我以为`markdown-it`已经足够了，但其实并不包含样式，这点在`markdown`核心提到的相关文档中也没有明确提到，所以一开始走了写弯路。

- github-markdown-css
- markdown-it-prism
- markdown-it-anchor
- markdown-it-highlightjs

这4个库为`markdown`进行解析，提供渲染形式的样式库。没有这几个库的话，`markdown-it`只会渲染到页面上一些平平的文字，并没有字体大小或颜色高亮。

重点在下面这行配置
<img style="width:40vw; height:auto;" src="/blogs/code-repo-exchange/markdown-class.png"/>

```
// vite.config.ts
export default defineConfig({
  plugins: [
    Markdown({
      // Class names for the wrapper div
      wrapperClasses: "markdown-body", // markdown-body是一个class类，将和github-markdown-css包对应
    })
]})
```

上文中的这个`markdown-body`，会伴随整个markdown文档加载到DOM的class中，但并没有为其定义具体的css样式。
![markdown-class.png](https://upload-images.jianshu.io/upload_images/5338196-6760ebd6838e089c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
于是再查找资料后，发现要引入`github-markdown-css`和`markdown-it-highlightjs`，从而才能渲染。
`github-markdown-css`提供文档样式，`markdown-it-highlightjs`则对代码样式进行加强。

同时,`markdown-it-highlightjs`是为`vue`框架而编写的，本身基于`vanillar`。

### 3. VueRouter扩展

`VueRouter`本身是不会引入`*.md`的，好在`vitesse`足够强大，稍微修改就能加入。
需要注意的是，以下内容和官网内容修改方式不同，和[unplugin-vue-markdownGit主页](https://github.com/unplugin/unplugin-vue-markdown?tab=readme-ov-file)中的做法出现了一些不兼容

```js
// vite.config.ts
export default defineConfig({
  plugins: [
    // 注释所有VueMacros的配置，VueMacros和Vue两个会起冲突
    // 可能在VueMacros里也能实现Markdown，但又是一个技术，而且当前包含的内容还不多，暂时就不管了
    // VueMacros({
    //   defineOptions: false,
    //   defineModels: false,
    //   plugins: {
    //     vue: Vue({
    //       script: {
    //         propsDestructure: true,
    //         defineModel: true,
    //       },
    //     }),
    //   },
    // }),

    // VueRouter需新增配置{ extensions: [".vue", ".md"] }
    // https://github.com/posva/unplugin-vue-router
    VueRouter({ extensions: [".vue", ".md"] }),
})
```

Git主页是这样的：

```js
import Vue from "@vitejs/plugin-vue"
import Markdown from "unplugin-vue-markdown/vite"
import Pages from "vite-plugin-pages"

export default {
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Pages({
      extensions: ["vue", "md"],
    }),
    Markdown(),
  ],
}
```

上图中有两个不同：

1. `VueMacros`配置删除。`VueMacros`基于`unplugin-vue-macros`库，但因为和`Vue`节点会产生冲突，具体原因还不清楚，文档内容有些多我就没有继续深究。
2. VueRouter({ extensions: [".vue", ".md"] })修改，基于`unplugin-vue-router`库。和官网指引的库`vite-plugin-pages`写法也有不同，
3. `unplugin-vue-router`配置详见[Github主页](https://github.com/posva/unplugin-vue-router)

我的项目本身基于[vitesse-lite](https://github.com/antfu/vitesse-lite)，可能有更优雅的解法。

- `@unhead/vue`： 这个库是为了给`*.md`加上`<head>`头，但目前我项目里还没用上

## 总结

要方便得将`Markdown`引入到项目中，上述三点（`Markdown`核心，`Markdown`样式，`VueRouter`扩展）缺一不可。实现起来不算简单，但一旦实现以后，对于项目来说是非常方便的，尤其适合个人网站的项目，可以通过`Markdown`快速排版并进行发布，非常节省时间精力。

后续计划对md的`seo`再进行学习。

## 附录

[体验地址](https://vocal-florentine-2d647c.netlify.app/code-repo-exchange)

[项目base->vitesse-lite](https://github.com/antfu/vitesse-lite)

[unplugin-vue-router](https://github.com/posva/unplugin-vue-router)

[unplugin-vue-markdown](https://github.com/unplugin/unplugin-vue-markdown?tab=readme-ov-file)

[antfu大佬个人网站](https://github.com/antfu/antfu.me)
