---
title: Libvirt 网络
---


网上的垃圾文字太多，先读[这个](https://wiki.libvirt.org/page/Networking)

## 虚拟网络

libvirt 会默认创建名为 `virbr0` 的网桥。创建 vm 的时候会对应创建一个 `vnetN` 设备。

如果 `ip a` 或者 `brctl show` 发现 `vnetN` 设备没有跟 `virbr0` 桥接。可以用 `brctl addif virbr0 vnetN` 来桥接。

libsh dumpxml 查看 vm 开机状态下是这样的

```xml
<interface type='network'>
  <mac address='52:54:00:b8:38:76'/>
  <source network='default' portid='103961c2-1bc6-4817-87da-7b65640929ef' bridge='virbr0'/>
  <target dev='vnet1'/>
  <model type='virtio'/>
  <alias name='net0'/>
  <address type='pci' domain='0x0000' bus='0x01' slot='0x00' function='0x0'/>
</interface>
```

libsh dumpxml 查看 vm 关机状态下是这样的

```xml
<interface type='network'>
  <mac address='52:54:00:b8:38:76'/>
  <source network='default'/>
  <model type='virtio'/>
  <address type='pci' domain='0x0000' bus='0x01' slot='0x00' function='0x0'/>
</interface>
```

## 桥接

```xml
<interface type='bridge'>
  <source bridge='br0'/>
  <mac address='52:54:00:b8:38:76'/>
  <model type='virtio'/>
</interface>
```
