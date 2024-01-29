# 代码仓库迁移：从 Github 到 Gitee

我的项目需要从 `Github` 切换到 `Gitee`，因为 `Github` 在国内 push 非常困难（众所周知的原因）

下面记录一下，我 Mac 电脑本地的 `Github` 仓库是如何迁移到 `Gitee` 上的。

## Gitee 仓库准备

首先，需要在 `Gitee` 上新建一个仓库，这里过程略过。

建完了之后，`Gitee` 地址：[https://gitee.com/superzdd/my-website.git](https://gitee.com/superzdd/my-website.git)

同时，`Github` 地址：[https://github.com/superzdd/my-website.git](https://github.com/superzdd/my-website.git)

## 清除本地仓库

先检查，查看本地地址是否是关联 `Github` 的

```bash
git remote -v   # 显示本地关联的远程仓库地址

# 输出内容如下
# 说明我的项目环境内，存在origin的本地仓库名
origin  https://github.com/superzdd/my-website.git (fetch)
origin  https://github.com/superzdd/my-website.git (push)
```

进行清除

```bash
# 注意，origin或者取决于你的本地仓库名叫什么
git remote rm origin
```

清除之后，再查看一次

```bash
git remote -v # 这是如果不输出任何内容，那就是切换成功了
```

## 切换到远端 Gitee 地址

```bash
git remote add my-website https://gitee.com/superzdd/my-website.git
# 后面两个参数要修改成对应的项目
# my-website是仓库名，这个仓库名是本地的，不需要和远端仓库同名
# https://gitee.com/superzdd/my-website.git 是Gitee的地址

# 检查切换是否成功，切换成功后应该会显示这些内容
git remote -v

# 输出如下
my-website      https://gitee.com/superzdd/my-website.git (fetch)
my-website      https://gitee.com/superzdd/my-website.git (push)
```

PS：本地仓库和远端仓库不需要同名

```bash
git remote add origin https://gitee.com/superzdd/my-website.git
git push -u origin "main"
```

## 选择远端分支

切换完地址之后，直接进行 `git pull` 时仍然会报错的，因为还没有选择远端分支：

```bash
# 获取所有分支
git fetch my-website

# 输出如下
From https://gitee.com/superzdd/my-website
* [new branch]      main       -> my-website/main

# 选择分支
# 这里也有两个参数
# my-website是仓库名
# main代表分支名，这个名字需要在Gitee上确认，但一般情况下都是main,main是Gitee上的默认主分支的名字
git branch --set-upstream-to=my-website main
```

## Git pull 拉取代码

这时所有的切换动作已经都做完了，可以尝试拉取代码

```bash
git pull
```

## 错误情况排查

#### 错误日志：切换到远程地址时，仓库名没写

```bash
git remote add https://gitee.com/superzdd/my-website.git

# 输出如下
usage: git remote add [<options>] <name> <url>

    -f, --fetch           fetch the remote branches
    --tags                import all tags and associated objects when fetching
                          or do not fetch any tag at all (--no-tags)
    -t, --track <branch>  branch(es) to track
    -m, --master <branch>
                          master branch
    --mirror[=(push|fetch)]
                          set up remote as a mirror to push to or fetch from
```

这个错误信息表明你使用 `git remote add` 命令时没有提供正确的参数。`git remote add` 命令用于添加一个新的远程仓库地址，其格式为 `git remote add <name> <url>`。

#### 错误日志：pull前未fetch

```bash
git branch --set-upstream-to=my-website main

# 输出如下
error: the requested upstream branch 'my-website' does not exist
hint:
hint: If you are planning on basing your work on an upstream
hint: branch that already exists at the remote, you may need to
hint: run "git fetch" to retrieve it.
hint:
hint: If you are planning to push out a new local branch that
hint: will track its remote counterpart, you may want to use
hint: "git push -u" to set the upstream config as you push.
```

这个错误信息表明你尝试设置一个上游分支，但是远程仓库中没有名为 `main` 的分支。你需要先确保远程仓库中存在你要设置的分支。

你可以通过运行 `git fetch` 命令来获取远程仓库的最新分支信息。这将从远程仓库下载所有分支的信息，但不会自动合并或修改你的本地分支。

```bash
git fetch my-website
```

运行这个命令后，再次尝试执行 `git branch --set-upstream-to=my-website main` 命令，应该就不会再出现这个错误了。

#### 错误日志：pull 前未选择分支

```bash
git pull

# 输出如下
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=<remote>/<branch> main
```

这个错误信息表明你正在尝试从远程仓库拉取代码，但是当前分支没有设置跟踪分支。换句话说，Git 不知道应该从哪个远程分支拉取代码。

要解决这个问题，你可以按照错误信息中的提示，使用 `git branch --set-upstream-to` 命令来设置跟踪分支。你需要将 `<remote>/<branch>` 替换为你要拉取的远程分支的完整名称。

## 附录

### 日志：从 Gitee 反切 Github

```bash
### 下方日志 >>>代表我的输入，其他内容为输出

>>> git remote -v
my-website      https://gitee.com/superzdd/my-website.git (fetch)
my-website      https://gitee.com/superzdd/my-website.git (push)
origin  https://gitee.com/superzdd/my-website.git (fetch)
origin  https://gitee.com/superzdd/my-website.git (push)

>>> git remote rm origin
>>> git remote rm my-website
>>> git remote -v
origin

# 原地有个origin一直清理不掉
# 就打算用这个origin 挂载到github上
>>> git remote rm origin
fatal: No such remote: 'origin'

>>> git remote add origin https://github.com/superzdd/my-website.git
>>> git remote -v
origin  https://github.com/superzdd/my-website.git (fetch)
origin  https://github.com/superzdd/my-website.git (push)
```

切换好分支以后，关闭本地 vpn，然后重启电脑

```bash
git pull # 成功
```

切回来的时候，并没有`fetch`和`branch`就能用了，估计是切到`origin`分支的原因。

至此`Gitee`和`Github`仓库互相切换全部完毕。
