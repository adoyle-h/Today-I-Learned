---
title: 'console 与 framebuffer'
created: 2025-11-08T21:16:23+0800
updated: 2025-11-08T21:16:27+0800
tags: [终端]
---

Linux conosle tty 是纯命令行界面，不是图形化界面。它可能是 framebuffer 或者 VGA text mode 控制。

## 确认当前终端使用的是 framebuffer 还是 VGA

`cat /proc/fb` 如果有输出说明是 framebuffer，如果没有值则是 VGA text。如果报错没这个文件，说明你不是在 Linux console 里，大概率是在 ssh 连接的终端。

`sudo fbset -i` 查看分辨率等信息。
