---
title: Libvirt
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## 挂载块设备

```sh
cat <<EOF > vdc.xml
<disk type='block' device='disk'>
  <driver name='qemu' type='raw' cache='none' />
  <source dev='/dev/sda5' />
  <target dev='vdc' bus='virtio'/>
</disk>
EOF

virsh detach-device $domain ./vdc.xml --persistent
```

- `name='qemu'`，固定就是 qemu。
- `bus='virtio'` 是必须的，最高效的配置。
- `cache='none'` 是为了让 vm 的写磁盘操作在 vm 层面直接落盘，避免重复 cache。

参数详见 [libvirt - Domain XML format](https://libvirt.org/formatdomain.html)。

## 退出 cdrom

```sh
domain=

# 把 cdrom 对应的那段 XML 复制到 cdrom.xml 文件里。
virsh dumpxml $domain
# cdrom 只能在虚拟机关机时退出，因为它说不支持热拔插: This type of device cannot be hot unplugged
virsh shutdown $domain
virsh detach-device $domain ./cdrom.xml --persistent
```

## No more available PCI slots

因为 PCI 插槽不够了，没法挂载新设备。所以需要新增 PCI 插槽。
先看一眼文章 [PCI topology and hotplug](https://libvirt.org/pci-hotplug.html)，了解大概。

需要在 vm 关闭状态下修改 pci 配置。

`virsh edit $domain` 编辑 vm 的配置，

假如当前 pci 最大值为 `index='9'`，那么增加第十个

```xml
<controller type='pci' index='10' model='pcie-root-port'>
  <model name='pcie-root-port'/>
  <target chassis='10' port='0x11'/>
  <address type='pci' domain='0x0000' bus='0x00' slot='0x03' function='0x0'/>
</controller>
```

要保证地址不跟其他的不冲突，PCI 地址计算方法见 [Device Addresses](https://libvirt.org/formatdomain.html#device-addresses) 和 [PCI addresses in domain XML and guest OS](https://libvirt.org/pci-addresses.html)。

> PCI addresses have the following additional attributes: domain (a 2-byte hex integer, not currently used by qemu), bus (a hex value between 0 and 0xff, inclusive), slot (a hex value between 0x0 and 0x1f, inclusive), and function (a value between 0 and 7, inclusive).

然后 attach-device 就成功了。
