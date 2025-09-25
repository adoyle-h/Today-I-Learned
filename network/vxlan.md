---
title: vxlan
---


- [什么是VXLAN](https://support.huawei.com/enterprise/zh/doc/EDOC1100087027)
- [vxlan 协议原理简介](https://cizixs.com/2017/09/25/vxlan-protocol-introduction/)

## vxlan 比 vlan 有什么优势

- 突破 vlan ID 数量限制
  - vlan 能支持的二层网络数量有限。vlan Tag 总共 4 个字节，其中有 12bit 用来标识不同的二层网络，这样总共是 4000 多个。
  - vxlan header 有 8 个字节，有 24bit 用来标识不同的二层网络，这样总共是 1600 多万个。

- 突破 TOR 交换机 MAC 地址表限制
  - 之前 TOR（Top Of Rack）交换机的一个端口连接一个物理主机对应一个 MAC 地址
  - 现在交换机的一个端口虽然还是连接一个物理主机但是可能进而连接几十个甚至上百个虚拟机和相应数量的 MAC 地址。

- 突破单条网络链路
  - vlan 协议使用 STP（Spanning Tree Protocol）来管理多条线路，STP 根据优先级和 cost，只会选出一条线路来工作，这样可以避免数据传递的环路。
  - vxlan 因为是通过 UDP 封装，在三层网络上传输。虽然传递的还是二层的 Ethernet Frame，但是 vxlan 可以利用一些基于三层的协议来实现多条线路共同工作（active-active），以实现负载均衡，例如 ECMP，LACP。

## VXLAN 帧结构

![VXLAN 帧结构.svg](https://user-images.githubusercontent.com/1998490/228848231-152a6fc2-d57c-4b06-91af-49f44844e84c.svg)

## VLAN 和 VXLAN 的区别

详见 https://chanjarster.github.io/post/network/vlan-vxlan/ ([链接备份](https://archive.md/WeMtN))
