---
title: Netfilter
created: 2022-01-11T21:20:13+0800
updated: 2022-01-11T21:20:13+0800
---


## 概念

![Netfilter-components](https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Netfilter-components.svg/800px-Netfilter-components.svg.png?1641810317565)

![](https://people.netfilter.org/pablo/nf-hooks.png)

![Netfilter-packet-flow](https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Netfilter-packet-flow.svg/1920px-Netfilter-packet-flow.svg.png?1641810289286)

- iptables
- nftables
- xtables
- nf_tables
- conntrack
- netfilter hook
  - Ingress: Linux kernel 4.2 加入
  - PREROUTING
  - INPUT
  - OUTPUT
  - FORWARD
  - POSTROUTING
  - Egress: Linux kernel 4.2 加入
- NAT
- CT (Connection Tracking)
- 网络协议栈


- 表 (Table): （优先级 raw > mangle > nat > filter）
  - raw: 决定数据包是否被状态跟踪机制处理
    - Chains: OUTPUT、PREROUTING
    - 内核模块: iptable_raw
  - mangle: 修改数据包的信息
    - Chains: PREROUTING、POSTROUTING、INPUT、OUTPUT、FORWARD
    - 内核模块: iptable_mangle
  - nat: 用于网络地址转换（IP、端口）
    - Chains: PREROUTING、POSTROUTING、OUTPUT
    - 内核模块: iptable_nat
  - filter: 过滤数据包
    - Chains: INPUT、FORWARD、OUTPUT
    - 内核模块: iptables_filter.
- 链 (Chain)
  - PREROUTING: 处理刚进入系统路由前的数据包，可进行 DNAT
  - INPUT: 处理输入本地的数据包
  - OUTPUT: 处理本地输出的数据包
  - FORWARD: 处理转发到其他机器的数据包
  - POSTROUTING: 处理从系统出去路由后的数据包，可进行 SNAT
- 规则 (Rule)

## 参考资料

- [Netfilter-iptables报文过滤框架](https://archive.ph/NA2OL)
