---
title: vim-go 出现问题
created: 2021-12-10T18:51:48+0800
updated: 2021-12-10T18:51:48+0800
---


针对 `no packages returned: packages.Load error` 或者 `vim-go: [info] FAIL` 的问题。
有一种情况是会导致这种情况，当前文件设置了 build tag。即文件头包含了这行注释 `// +build linux`，在 mac 系统下是无法使用的。

尝试用 `:GoBuildTags ""` 取消 build tag。但是依然没用。

解决方案是建个分支，把所有文件的 `// +build linux` 删掉就好了，没有这么多烦恼。
