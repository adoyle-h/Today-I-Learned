---
title: grafted commit
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


git log 看到 grafted 标签时，意味着 git clone 时用了 `--depth` 参数，当前仓库是 shadow 的，即 commit 历史不完整的。
使用 `git fetch origin --unshallow` 来拉取完整 commit 历史。

参考[文章](https://noiseyou99.medium.com/git-%E4%BD%BF%E7%94%A8unshallow%E4%BE%86%E8%A7%A3%E9%99%A4grafted%E7%8B%80%E6%85%8B-%E4%BE%86%E8%A7%A3%E6%B1%BA%E4%BD%BF%E7%94%A8depth%E7%9A%84%E5%95%8F%E9%A1%8C-6bb9dfbb554c)
