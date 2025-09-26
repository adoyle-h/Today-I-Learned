---
title: 硬盘电源管理
created: 2024-03-29T03:03:53+0800
updated: 2024-03-29T03:03:53+0800
---


英文名 Advanced Power Management，简称 APM。

## hdparm

## SG_IO: bad/missing sense data

```sh
> sudo hdparm -S 241 /dev/sda

/dev/sda:
 setting standby to 241 (30 minutes)
SG_IO: bad/missing sense data, sb[]:
```

解决方法：使用 [hd-idle](https://github.com/adelolmo/hd-idle) 或者 [sdparm](https://linux.die.net/man/8/sdparm)。

## 西部数据绿盘的电源管理

https://wiki.archlinuxcn.org/zh/Hdparm#%E8%A5%BF%E9%83%A8%E6%95%B0%E6%8D%AE%E7%BB%BF%E7%9B%98%E7%9A%84%E7%94%B5%E6%BA%90%E7%AE%A1%E7%90%86
