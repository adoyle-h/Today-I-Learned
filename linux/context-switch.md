---
title: 上下文切换
---

## 进程上下文切换

「待补充」

## 线程上下文切换

「待补充」

## 中断上下文切换

「待补充」


## 切换的触发条件



## 查看进程的上下文切换状态

- vmstat
  - r: 就绪队列长度（正在运行或正在等待 CPU 的进程数）
  - b: 不可中断睡眠进程数
  - cs: 每秒上下文切换次数
  - in: 每秒中断数
  - us: 用户态 CPU 使用率
  - sy: 系统 CPU 使用率，一般为内核占用
- pidstat
  - cswch: 每秒自愿上下文切换。进程运行时由于系统资源不足，如 IO，内存等原因不得不进行切换。
  - nvcswch: 每秒非自愿上下文切换。比如时间片用完，系统调度让其他任务运行，或者竞争 CPU 的时候也会发生。

## 相关资料

- [Context Switch Definition](http://www.linfo.org/context_switch.html) ([链接备份](https://web.archive.org/web/20230115003331/http://www.linfo.org/context_switch.html))
- [进程/线程上下文切换会用掉你多少CPU？](https://zhuanlan.zhihu.com/p/79772089) ([链接备份](https://archive.md/uGxnO))
