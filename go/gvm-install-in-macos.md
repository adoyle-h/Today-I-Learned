---
title: 在 MacOS 上使用 gvm install
created: 2021-12-06T21:49:14+0800
updated: 2021-12-06T21:49:14+0800
---


## 问题描述

当系统里没有安装过 go 时，用 [gvm](https://github.com/moovweb/gvm) 来安装会报错。

```sh
$ gvm install go1.17.4
Downloading Go source...
Installing go1.17.4...
 * Compiling...
Users/adoyle/.gvm/scripts/install:行84: go：未找到命令
ERROR: Failed to compile. Check the logs at /Users/adoyle/.gvm/logs/go-go1.17.4-compile.log
ERROR: Failed to use installed version

$ cat /Users/adoyle/.gvm/logs/go-go1.17.4-compile.log
ERROR: Cannot find /Users/adoyle/go1.4/bin/go.
Set $GOROOT_BOOTSTRAP to a working Go tree >= Go 1.4.
```

这个错在 gvm 的 README 有解释，见 A Note on Compiling Go 1.5+。

> Go 1.5+ removed the C compilers from the toolchain and replaced them with one written in Go. Obviously, this creates a bootstrapping problem if you don't already have a working Go install. In order to compile Go 1.5+, make sure Go 1.4 is installed first.

但是按照它说的先安装 1.4 版本时也会报错。

```sh
$ gvm install go1.4 -B
Installing go1.4 from binary source
ERROR: Binary Go unavailable for this platform
```

## 解决方案

```sh
brew install go
gvm install go1.17.4
gvm use go1.17.4 --default
brew uninstall go
```
