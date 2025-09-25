---
title: Armbian 关闭 swap
---


如果 `systemctl status armbian-zram-config.service` 看到是在运行的。那么就编辑 `/etc/default/armbian-zram-config`，把 `SWAP=false` 这行注释取消。

如果 armbian-zram-config 没运行，则 `sudo sysctl -w vm.swappiness=0`，或者编辑 `/etc/sysctl.conf`，设置 `vm.swappiness = 0`。
