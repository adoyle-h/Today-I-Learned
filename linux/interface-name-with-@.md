---
title: 网络接口名称的 @
created: 2021-12-10T18:51:48+0800
updated: 2021-12-10T18:51:48+0800
---


比如网络接口名称为 `veth97e84578@if3`

```sh
$ cat /sys/class/net/veth97e84578/iflink
3
$ cat /sys/class/net/veth97e84578/ifindex
94
```

[`/sys/class/net/<iface>/iflink` 的定义](https://github.com/torvalds/linux/blob/v5.16-rc4/Documentation/ABI/testing/sysfs-class-net#L199)

> Indicates the system-wide interface unique index identifier a interface is linked to.
> Format is decimal. This attribute is used to resolve interfaces chaining, linking and stacking.
> Physical interfaces have the same 'ifindex' and 'iflink' values.

[`/sys/class/net/<iface>/ifindex` 的定义](https://github.com/torvalds/linux/blob/v5.16-rc4/Documentation/ABI/testing/sysfs-class-net#L188)

> Indicates the system-wide interface unique index identifier as a decimal number.
> This attribute is used for mapping an interface identifier to an interface name.
> It is used throughout the networking stack for specifying the interface specific requests/events.

- if iflink is 0 (apparently for ipip tunnels, which also behave strangely with net namespaces), it will print @NONE
- if iflink doesn't have matching ifindex, it will display @ifXX with XX being ifindex. Not having a matching ifindex is enough to know it's related to an other net namespace, see later.
- if iflink is itself (iflink == ifindex) It will not display any @. That's what should happen with real interfaces (eth0 ...) but can also be a bug (see later).
- if iflink has a matching ifindex, it will display this index' name.

## 查找另一个 veth 网络接口

当出现 `@`，说明另一个 veth 网络接口在别的网络命名空间里。

```sh
# 列出所有网络命名空间
$ lsns -t net
        NS TYPE NPROCS    PID USER    NETNSID NSFS COMMAND
4026532008 net     240      1 root unassigned      /lib/systemd/systemd --system --deserialize 39
4026533163 net       6 803924 root          1      tail -f /dev/null

# 在这些命名空间里用 `nsenter` 命令一个个查，就能找到对应的 `if94`。
$ nsenter -t 803924 -n ip l
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
3: eth0@if94: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DEFAULT group default
    link/ether 7e:32:cc:da:dd:6c brd ff:ff:ff:ff:ff:ff link-netnsid 0
```

## 参考

- https://unix.stackexchange.com/q/444892/373303
