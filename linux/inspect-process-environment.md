---
title: 查看进程的环境变量
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## Linux 系统

`cat /proc/<pid>/environ`

### 更好的阅读换行

`cat /proc/<pid>/environ | tr "\0" "\n"`

## Mac 系统

`ps -Eww -o command= <pid>`
