---
title: shebang
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


例如 `#!/usr/bin/env bash`

执行文件有很多方式，例如

- `source <script>`
- `sh <script>`
- `./<script>`

由 source 启动的文件，shabang 会无效。因为 source 表示“在当前 shell 中执行一个文件中的命令”，
当前 shell 是固定的，所以不需要用 shabang 解释。
