---
title: Podman netns
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


Podman 使用 [slirp4netns](https://github.com/rootless-containers/slirp4netns) 来实现 rootless 容器。

执行 `ps -ef | grep netns` 会看到

```
podman   3042657       1  0 18:46 pts/5    00:00:00 /usr/bin/slirp4netns --disable-host-loopback --mtu=65520 --enable-sandbox --enable-seccomp --enable-ipv6 -c -r 3 --netns-type=path /run/user/1000/netns/rootless-netns-0f5e9301cae49369572e tap0
```

你在宿主机上 `ip a` 是看不到 tap0 的。需要执行 `podman unshare nsenter --net=/run/user/1000/netns/rootless-netns-0f5e9301cae49369572e` 进入进程所在。
`podman unshare` 实际上调用 [unshare](../linux/unshare.md) 命令来创建子网。
因为每个用户所操作的 podman 区间是不一样的。

然后再执行 `ip a` 你就能看到所有 pod 相关的虚拟网络设备。

```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: tap0: <BROADCAST,UP,LOWER_UP> mtu 65520 qdisc pfifo_fast state UNKNOWN group default qlen 1000
    link/ether 2a:05:eb:55:67:12 brd ff:ff:ff:ff:ff:ff
    inet 10.0.2.100/24 brd 10.0.2.255 scope global tap0
       valid_lft forever preferred_lft forever
    inet6 fd00::2805:ebff:fe55:6712/64 scope global dynamic mngtmpaddr
       valid_lft 86125sec preferred_lft 14125sec
    inet6 fe80::2805:ebff:fe55:6712/64 scope link
       valid_lft forever preferred_lft forever
3: cni-podman1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether ea:4c:ad:e1:92:2b brd ff:ff:ff:ff:ff:ff
    inet 10.89.0.1/24 brd 10.89.0.255 scope global cni-podman1
       valid_lft forever preferred_lft forever
    inet6 fe80::e84c:adff:fee1:922b/64 scope link
       valid_lft forever preferred_lft forever
4: vethd15490c0@if3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master cni-podman1 state UP group default
    link/ether 42:da:15:77:d9:f8 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet6 fe80::40da:15ff:fe77:d9f8/64 scope link
       valid_lft forever preferred_lft forever
10: vethf735a2dc@if3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master cni-podman1 state UP group default
    link/ether ca:05:68:9e:e4:4a brd ff:ff:ff:ff:ff:ff link-netnsid 1
    inet6 fe80::c805:68ff:fe9e:e44a/64 scope link
       valid_lft forever preferred_lft forever
```

## 获取不到真实 ip

详见 [在 rootless podman 获取不到真实远端 ip](./wrong-remote-ip-in-rootless-podman.md)
