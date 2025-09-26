---
title: 网关 gateway
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


以下解说针对的是 Debian 系统和 systemd。

假设网关 IP 是 `192.168.1.1`，而主机 IP 是 `192.168.1.101`。
主机必须要设定对应的路由规则，才能访问 `192.168.1.0/24` 同网段下的其他 IP。

## 临时修改

使用 ip route 命令的修改在主机重启或者网络服务重启后，就会重置。

```sh
# `onlink` 假设下一跳地址是能够在链路层连通的，即使实际不连通也没关系，还是会发布 ARP 之类的请求。
$ ip route add default via 192.168.1.1 dev enp1s0 onlink
# 如果没有下面这条规则，外部请求会收不到响应，导致 HTTP 请求 Connection reset by peer
# `src 192.168.1.101` 表示发送给下一跳的包，IP 源改成 `192.168.1.101` 这个地址。
$ ip route add 192.168.1.0/24 src 192.168.1.101 dev enp1s0
```

查看结果

```sh
$ ip route
default via 192.168.1.1 dev enp1s0 onlink
192.168.1.0/24 dev enp1s0 scope link src 192.168.1.101
```

## 持久化配置

修改 interface 配置，保证在主机重启或者网络服务重启后，配置依然有效。

```sh
$ cat <<EOF > /etc/network/interfaces.d/enp1s0
# The primary network interface
auto enp1s0
allow-hotplug enp1s0
iface enp1s0 inet static
  address 192.168.1.101
  broadcast 192.168.1.155
  netmask 255.255.255.0
  gateway 192.168.1.1
EOF

systemctl restart networking
```

查看结果

```sh
$ ip route
default via 192.168.1.1 dev enp1s0 onlink
192.168.1.0/24 dev enp1s0 proto kernel scope link src 192.168.1.101
```

`proto kernel` 意味着这个路由规则是由 linux 内核自动配置的。具体查阅 `man ip-route` 里的 `protocol RTPROTO`。
