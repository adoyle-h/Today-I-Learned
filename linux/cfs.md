---
title: CFS (Completely Fair Scheduler)
---


## 参考资料

- [Google - CPU bandwidth control for CFS](https://landley.net/kdocs/ols/2010/ols2010-pages-245-254.pdf)
- https://www.kernel.org/doc/Documentation/scheduler/sched-bwc.txt


## Docker 的 CFS 设置

参数

- --cpus
- --cpu-shares
- --cpu-period
- --cpu-quota
- --cpuset-cpus

https://docs.docker.com/config/containers/resource_constraints/#configure-the-default-cfs-scheduler

> To modify the proportion from the default of 1024, use the -c or --cpu-shares flag to set the weighting to 2 or higher. If 0 is set, the system will ignore the value and use the default of 1024.

https://docs.docker.com/engine/reference/run/#cpu-share-constraint
