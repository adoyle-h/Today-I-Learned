---
title: 查看进程的环境变量
---


## Linux 系统

`cat /proc/<pid>/environ`

### 更好的阅读换行

`cat /proc/<pid>/environ | tr "\0" "\n"`

## Mac 系统

`ps -Eww -o command= <pid>`
