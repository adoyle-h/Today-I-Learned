---
title: Linux 系统日志
---


- journald
  - journalctl
- klogd
  - klogd 是一个专门截获并记录 Linux 内核消息的守护进程，可以指定输出到控制台，文件或 syslogd 守护进程等，常用情况是把内核消息输出到 syslogd 进程，由 syslogd 统一处理。
- syslogd/rsyslogd
  - rsyslog
- kernel ring buffer
  - dmesg
