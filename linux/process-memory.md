---
title: 进程内存
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## 查看进程内存

- `cat /proc/$pid/status`
- `pmap -x $pid`
- `ps xu --sort %mem`
- `ps -e -o 'pid,comm,args,pcpu,rsz,vsz,stime,user,uid' | sort -k5nr`

## 查看主机内存

- `cat /proc/meminfo`
- `free -h`
