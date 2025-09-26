---
title: 忽略 Git submodule
created: 2019-04-13T00:17:20+0800
updated: 2019-04-13T00:17:20+0800
---


首先 `.gitmodules` 文件只是一个初始化配置。当你执行 `git submodule init` 时，git 会从 `.gitmodules` 读取信息来操作 `.git/` 目录下的文件，比如修改 `.git/config` 以及修改 `.git/modules/` 目录等操作。

存在一种使用场景，一个很大的项目下有些 submodule 项目不能让某些开发者访问。那么执行 `git submodule update` 会报错导致中断。

你可以忽略那些没有访问权限的子项目。假设有个名叫 xxx 的 submodule。

那么在 `git submodule init` 之后，修改 `.git/config` 文件，修改 `active=false` 和 `ignore=all` 即可。即：

```
[submodule "xxx"]
        url = git@github.com:zzz/xxx.git
        active = false
        ignore = all
```

之后的 git submodule 操作都会忽略掉 xxx 项目了。

这些配置可以通过 `git help config` 来找到，比如搜索 `submodule.<name>.ignore`。
