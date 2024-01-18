# zdd-website

个人主页项目

基于 Vue3|TypeScript|[Vitesse Lite](https://github.com/antfu/vitesse-lite)

- node版本 v20.10.0
- vue 3.3.10
- vue-router 4.2.5

## 项目构建

项目使用了[ni](https://github.com/antfu/ni)，可以在终端输入`ni`,`nr`等安装和调试项目，比如:

```bash
ni # 安装依赖，第一次安装成功后就不用再运行了
nr dev --host # 运行调试
```

`ni`可以忽略`npm`,`pnpm`,`yarn`的语法区别，强烈推荐~

如果还没有安装`ni`，请先全局安装：

```bash
npm i -g @antfu/ni
```

可惜发布生产环境`build`还用不了`ni`，仍需要运行`pnpm`：

```bash
# 发布生产环境，生成dist文件夹
pnpm build
```
