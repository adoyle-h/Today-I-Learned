# Termux

Termux 是 Android 手机上的一个终端 App。
不用 root 手机，普通权限就能很方便地使用了。
如果有 root，甚至可以[手机里跑 Docker](https://gist.github.com/FreddieOliveira/efe850df7ff3951cb62d74bd770dce27)。

## 基本设置

- 执行 `termux-change-repo` 设置镜像源，可以选 Cloudflare 源或者最下面四个国内高校的源，速度比较快。
- 执行 `termux-setup-storage` 创建 `~/storage` 目录，用于访问手机内的存储文件。
- 修改 `~/.termux/termux.properties` 文件可以设置底下的快捷按键和开启其他功能。
- 按 `ctrl`-`alt`-`+` 或者 `ctrl`-`alt`-`-` 来调整字体大小。
- 安装 [termux-style](https://github.com/adi1090x/termux-style)，设置终端样式和字体
- 安装 [termux-services](https://github.com/termux/termux-services)，支持服务管理。
  - 服务放置在 $SVDIR 指向的目录
  - 但创建服务很麻烦得创建一堆文件。

然后看一遍文档 https://wiki.termux.com/wiki/Getting_started

## 包管理器

Termux 装有 pkg、apt、dpkg。pkg 是官方推荐的包管理器。
apt、dpkg 和 Debian 的一模一样，尽量少做修改，只用来查询。

## 学习资料

- https://p3terx.com/archives/termux-tutorial-1.html
- https://www.sqlsec.com/2018/05/termux.html
- https://github.com/myfreess/Mytermuxdoc
- https://wiki.termux.com/wiki/Main_Page

## 在 Android 5/6 安装 Termux

根据[官方 WIKI](https://github.com/termux/termux-app/wiki/Termux-on-android-5-or-6) 可知，它在 [Github Workfloww](https://github.com/termux/termux-app/actions/workflows/debug_build.yml?query=branch%3Amaster+event%3Apush) 里编译了支持 Android 5/6 的 Termux App。

点进任意成功的 build。在 Artifacts 有列出所有的构建结果文件。选择文件名包含 `android-5` 的文件，支持 Android 5 或 Android 6。
