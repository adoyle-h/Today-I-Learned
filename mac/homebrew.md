---
title: Homebrew
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## brew update 慢的问题

`brew update --verbose` 看慢在哪里。

## 备份 Homebrew

缅怀已弃用的 [homebrew-backup](https://github.com/rstacruz/homebrew-backup)

现在可以使用官方的 [homebrew-bundle](https://github.com/Homebrew/homebrew-bundle)

执行 `brew bundle dump` 会生成 `Brewfile` 文件。

## 使用 Homebrew 镜像

- Homebrew 镜像: https://lug.ustc.edu.cn/wiki/mirrors/help/brew.git
- Homebrew Bottles 镜像: https://lug.ustc.edu.cn/wiki/mirrors/help/homebrew-bottles
- Homebrew Cask 镜像: https://mirrors.ustc.edu.cn/help/homebrew-cask.git.html

## 使用 ALL_PROXY 代理

例如使用 shadowsocks 的 socks5 代理，端口号为 1080，在终端运行：

`ALL_PROXY=socks5://127.0.0.1:1080 brew install ...`

## 使用 brewfile

`brew bundle dump` 能够将系统已安装的程序到处到 brewfile 中。
通过 `brew bundle install` 可以从 brewfile 安装到当前系统。
但是，bundle dump 会把整个依赖链安装的软件都导出出来，很多事不必要的。所以我建议自己维护一份 brewfile，每次通过 `brew bundle install` 来安装，而不是通过 `brew install` 来安装。

具体看 `brew help bundle`。

## brew bundle 结合 mas

[mas](https://github.com/mas-cli/mas) 可以用命令来操作 Mac App Store。

当你安装了 mas，`brew bundle dump` 会按 `mas` 来备份已安装的 Mac App。
