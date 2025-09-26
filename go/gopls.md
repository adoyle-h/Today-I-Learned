---
title: gopls
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


gopls 在跨平台开发时，会有点问题。比如当我在 MacOS 电脑进行开发，gopls 就会省略 `//go:build linux` 的文件。当我期望是能包括这些文件内容的。

解决方法是增加环境变量 `GOFLAGS=-tags=windows,linux,darwin,test,unittest`。这里的 tags 根据你的实际需要填写。
具体看 `go help build` 和 `go help buildconstraint`。

不同的编辑器设置方法不一样，详见 https://github.com/golang/go/issues/29202 里的讨论。

## lspconfig.nvim

```sh
lspconfig.gopls.setup {
    settings = {
        gopls = {
            env = {
                GOFLAGS = "-tags=windows,linux,darwin,test,unittest"
            }
        }
    }
}
```
