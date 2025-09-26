---
title: IPMI 与 BMC
created: 2019-12-28T13:14:24+0800
updated: 2019-12-28T13:14:24+0800
---


- https://www.wikiwand.com/en/Intelligent_Platform_Management_Interface
- https://www.wikiwand.com/zh-hans/IPMI
- [IPMI接口和BMC控制器](https://blog.csdn.net/Frank_Abagnale/article/details/78933075)
- Facebook 的开源 [OpenBMC](https://github.com/facebook/openbmc) 设计
  - [Introducing “OpenBMC”: an open software framework for next-generation system management](https://engineering.fb.com/open-source/introducing-openbmc-an-open-software-framework-for-next-generation-system-management/)

## IPMI

Intelligent Platform Management Interface

## ipmitool

https://github.com/ipmitool/ipmitool

- [使用 ipmitool 实现 Linux 系统下对服务器的 ipmi 管理](https://www.ibm.com/developerworks/cn/linux/l-ipmi/?spm=ata.13261165.0.0.a10a3578QqPikR)

## BMC

Baseboard Management Controller

## 频带和频带外

IPMI实作的通常被称作 频带 管理LAN连线，这个连线应用一个介于BMC和基板NIC之间的SMBUS介面。

带内，Side-band
带外，Out-Of-Band，简称 OOB。带外网络是指：通过一套与任何业务数据网络没有关联的独立网络，网络控制中心可以连接到各个服务器或者网络设备的管理接口或者console。此管理流量不会因业务数据网络重大故障而受其影响，故称之为带外网络。与之相对于的则是带内网络。

- [什么是带内管理 带外管理？（转）](https://www.cnblogs.com/bakari/archive/2012/08/05/2623780.html)
- [IT设备的救命稻草-如何正确构建OOB带外网络](https://blog.51cto.com/gingerbeer/1980615)
