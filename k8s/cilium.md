---
title: Cilium
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## 安装 Cilium

目前只有通过 helm 来安装这一种方式。默认选项是基于 iptables 的不是基于 eBPF。得改设置。

https://arthurchiao.art/blog/cilium-life-of-a-packet-pod-to-service/

安装后记得 `kubectl logs` 检查 cilium-agent 的日志。

## 两个 cilium

存在两个同名的 cilium 可执行程序。

一个是 [cilium](https://github.com/cilium/cilium/tree/master/cilium)，是 cilium 服务端的 CLI 工具，[官方 CLI 文档](https://docs.cilium.io/en/v1.11/cmdref/cli_index/) 描述的是这个命令。这个工具有 `cilium bpf` 和 `cilium cleanup` 等子命令。

一个是 [cilium-cli](https://github.com/cilium/cilium-cli)，是用来和 K8S 里的 cilium 服务交互的 CLI 工具。这个工具没有 `cilium bpf` 和 `cilium cleanup` 等子命令。

官方解释见[这个 issue](https://github.com/cilium/cilium/issues/17098#issuecomment-895049182)。

## Cilium 网络拓扑

参考资料

- [Life of a Packet in Cilium: Discovering the Pod-to-Service Traffic Path and BPF Processing Logics](https://archive.ph/55Aou)

## 检查网络链路

### 举个例子

当 cilium 出现问题，导致 K8S 的 coredns 连不上外部的 DNS 服务。
假设外部的 DNS 服务是 `192.168.1.100:53`。宿主机 IP 是 `192.168.1.3`。

### 复现问题

```sh
# 查询得到 POD ID
$ sudo crictl ps --name coredns
CONTAINER           IMAGE               CREATED             STATE               NAME                ATTEMPT             POD ID
5a9e848f25468       8d147537fb7d1       3 hours ago         Running             coredns             0                   f7c44073c6765

# 这个 PID 是 POD 的 infra 容器（一般来说是 pause 镜像的容器）的 PID
$ sudo crictl inspectp f7c44073c6765 | grep 'pid":'
          "pid": "CONTAINER",
    "pid": 1888931,
            "pid": 1

# 根据 hostname 确认就是对应的 Pod
$ sudo nsenter -t 1888931 -u hostname
coredns-85cb69466-6kzld

# 检查网络是否连通
$ sudo nsenter -t 1888931 -n ping 192.168.1.100
$ sudo nsenter -t 1888931 -n nc -vz 192.168.1.100 53
```

### 检查 POD 至 HOST 的网络链路

```sh
# 容器的 netns 默认只有 lo 和 eth0 接口
$ sudo nsenter -t 1888931 -n ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
386: eth0@if387: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether 5a:06:77:1b:91:4a brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 10.42.44.205/32 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::5806:77ff:fe1b:914a/64 scope link
       valid_lft forever preferred_lft forever

# 可以在宿主机用 ip a 找到 ifindex 是 387 的网络接口。得到接口名 lxc565680fc6b77
$ ip a | grep 387: -A 3
387: lxc565680fc6b77@if386: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether 12:be:84:d8:11:50 brd ff:ff:ff:ff:ff:ff link-netns cni-bb3db0b1-362b-e728-7939-f14058980607
    inet6 fe80::10be:84ff:fed8:1140/64 scope link
       valid_lft forever preferred_lft forever

# Cilium 使用 TC BPF 将 lxc* 网络接口的 ingress 流量转发到宿主机的 cilium_host 网络接口
# 检查是否有这个 filter。得到 BPF prog id 25228
$ sudo tc filter show dev lxc565680fc6b77 ingress
filter protocol all pref 1 bpf chain 0
filter protocol all pref 1 bpf chain 0 handle 0x1 bpf_lxc.o:[from-container] direct-action not_in_hw id 25228 tag f97c1323b33039cd jited

# 检查是否有这个 BPF prog 和 BPF map
# bps 程序要自己安装 https://github.com/iovisor/bcc
$ sudo bps 25228
      BID TYPE                 UID  #MAPS LoadTime     NAME
    25228 sched cls              0      2 Jan11/12:10  handle_xgress

     MID TYPE            FLAGS         KeySz  ValueSz  MaxEnts NAME
    4468 prog array      0x0               4        4       25 cilium_calls_01
    4120 percpu hash     0x1               8       16     1024 cilium_metrics

# cilium_net 不用管，没有用。得到 cilium_host 的 IP
$ ip a show cilium_host
378: cilium_host@cilium_net: <BROADCAST,MULTICAST,NOARP,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether 52:58:bc:f3:51:3e brd ff:ff:ff:ff:ff:ff
    inet 10.42.48.115/32 scope link cilium_host
       valid_lft forever preferred_lft forever
    inet6 fe80::5058:bcff:fef3:513e/64 scope link
       valid_lft forever preferred_lft forever

# 检查本机的路由表
# 这里假设宿主机是能连通外部 DNS 服务的，就不列出默认网关了
$ ip route
10.42.0.0/16 via 10.42.48.115 dev cilium_host src 10.42.48.115
10.42.48.115 dev cilium_host scope link

# 检查容器的路由表，是否到 cilium_host 的 ip
$ sudo nsenter -t 1888931 -n ip route
default via 10.42.48.115 dev eth0 mtu 1450
10.42.48.115 dev eth0 scope link

# 检查容器的 ARP 表，是否是 lxc* 接口的 MAC 地址
$ sudo nsenter -t 1888931 -n ip neigh
10.42.48.115 dev eth0 lladdr 12:be:84:d8:11:50 REACHABLE
```

以上都是正常情况的结果，便于和异常情况做对比。


## Cilium 的 Flow 数据存哪里？
