---
title: go 交叉编译安卓程序
---


首先需要安装 [NDK](https://developer.android.com/ndk/downloads)。可以直接从官网下载，也可以用 homebrew 安装。

如果从官网下载，Mac 平台的是 dmg 安装包。打开后会有两个文件，AndroidNDK9519653.app 和 source.properties。把前者放到 /Applications 目录下，后者没什么用，就记录了版本信息。

go build 需要加上环境变量 `CGO_ENABLED=1 CC=/Applications/AndroidNDK9519653.app/Contents/NDK/toolchains/llvm/prebuilt/darwin-x86_64/bin/aarch64-linux-android33-clang CXX=/Applications/AndroidNDK9519653.app/Contents/NDK/toolchains/llvm/prebuilt/darwin-x86_64/bin/aarch64-linux-android33-clang++ GOOS=android GOARCH=arm64`。

CC 是用来编译 C 的，CXX 编译 C++。具体查阅 `go help environment`。

## _cgo_export.c:3:10: fatal error: 'stdlib.h' file not found

如果用的是 `toolchains/llvm/prebuilt/darwin-x86_64/bin/clang` 可能会碰到这个错。试试 `toolchains/llvm/prebuilt/darwin-x86_64/bin/aarch64-linux-android33-clang`。
