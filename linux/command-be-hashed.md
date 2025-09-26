---
title: linux 命令被 hash 缓存
created: 2018-03-19T20:56:21+0800
updated: 2018-03-19T20:56:21+0800
---


假设有个叫 xxx 的程序，当你执行 `type xxx` 会看到这样。

```
$ type xxx
xxx 已被录入哈希表 (/usr/local/bin/xxx)
```

是因为 linux 会记录并缓存你使用过的命令的路径，假设原先这个命令在 `/usr/local/bin/xxx`，后来你把它移到了另外的路径，例如 `/bin/xxx`。
那么当你再次执行 `xxx` 会找不到对应程序，因为 hash 缓存的路径还是在 `/usr/local/bin/xxx`。
你需要清空缓存，执行 `hash -d xxx` 即可。

参考:

- [Linux上的各种命令本质上都是小程序吗？](https://www.zhihu.com/question/34609277/answer/59455055) ([链接备份](https://archive.md/3inuw))
