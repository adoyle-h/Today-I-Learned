---
title: dig 命令
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


macos 内置的 dig 命令不支持 `+tls` 与 `+https` 参数请求 DoT/DoH。

可以通过 `brew install bind` 安装最新的 dig。虽然这个包主要是安装 bind 服务器，有点多余。
