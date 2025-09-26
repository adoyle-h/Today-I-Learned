---
title: VIM filetype
created: 2021-12-31T18:24:44+0800
updated: 2021-12-31T18:24:44+0800
---


## 查看可用的 filetype 列表

- 查看所有: `:echo getcompletion('', 'filetype')`
- 查看 c 开头的 filetype: `:echo getcompletion('c', 'filetype')`

## ft=messages

看 `/var/log/syslog` 这类日志时，设置 `set ft=messages` 会更方便人类阅读。
