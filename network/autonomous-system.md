---
title: 自治系统 (Autonomous System)
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


自治系统 (AS) 是指在互联网中，一个或多个实体管辖下的所有 IP 网路和路由器的组合，它们对互联网执行共同的路由策略。

## BGP

每个 AS 都使用 BGP 来宣布它们负责哪些 IP 地址，以及它们连接到哪些其他 AS。
BGP 路由器保存来自世界各地 AS 的所有这些信息，并将其放入称为路由表的数据库，以确定每个 AS 的最快路径。
当数据包到达时，BGP 路由器会参考他们的路由表来决定数据包接下来应该去哪个 AS。

## ASN

用于 BGP 路由中的每个 AS 都被分配一个唯一的自治系统编号 (ASN)。

互联网地址分派机构将 `64512` 到 `65535` 的 ASN 编号保留给私有网络使用。

正式的 ASN 由互联网地址分派机构 (IANA, Internet Assigned Numbers Authority)（该机构也负责分配互联网IP地址）成批地分配给各个区域互联网注册管理机构 (RIR)。
各地区的 RIR 则进一步再从 IANA 分配得到的整批 ASN 里为每一个实体分配一个 ASN。

想获得 ASN 的实体必须按其所属的地区中心规定的程序进行申请，在申请得到批准后才会分配到一个 ASN。最新 IANA 的正式 ASN 分配情况能在 [IANA 的网站](http://www.iana.org/assignments/as-numbers/as-numbers.xhtml)找到。

## ASN 注册

## 单播 (Unicast)

## 任播 (Anycast)

同一个 IP

可用于缓解 DDoS
