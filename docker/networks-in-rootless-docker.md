# rootless docker 网络

<!-- MarkdownTOC GFM -->

- [安装](#安装)
- [网络](#网络)
- [rootlesskit --net=vpnkit](#rootlesskit---netvpnkit)
    - [源码分析](#源码分析)
- [rootlesskit --net=slirp4netns](#rootlesskit---netslirp4netns)
    - [10.0.2.3](#10023)
- [CNI](#cni)

<!-- /MarkdownTOC -->

## 安装

注意，在执行 `dockerd-rootless-setuptool.sh install` 之前，你需要先安装 [`slirp4netns`](https://github.com/rootless-containers/slirp4netns)。
如果没安装，rootless docker 默认会使用 [`vpnkit`](https://github.com/moby/vpnkit)。vpnkit 缺点是不支持 ICMP 包。

> Docker with rootless mode uses slirp4netns as the default network stack if slirp4netns v0.4.0 or later is installed. If slirp4netns is not installed, Docker falls back to VPNKit.

## 网络

当使用 rootless docker，会发现在宿主机中执行 `ip a` 看不到 docker 相关的 bridge。而当运行普通的 docker 服务时，可以看到 docker0 这个虚拟 bridge。

这是因为 rootless docker 的 docker0 创建在独立的 netns 下。

## rootlesskit --net=vpnkit

```sh
$ docker_pid=$(pidof dockerd)
# 进入到 dockerd 所在的 namespace
$ sudo nsenter -a -t $docker_pid bash
# 查看网卡
$ ip a
4: tap0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq state UP group default qlen 1000
    link/ether 02:50:00:00:00:01 brd ff:ff:ff:ff:ff:ff
    inet 192.168.65.3/24 scope global tap0
       valid_lft forever preferred_lft forever
    inet6 fe80::50:ff:fe00:1/64 scope link
       valid_lft forever preferred_lft forever
5: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    link/ether 02:42:69:3c:bd:cc brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:69ff:fe3c:bdcc/64 scope link
       valid_lft forever preferred_lft forever

# 查看路由表
$ ip route
default via 192.168.65.1 dev tap0
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1
192.168.65.0/24 dev tap0 proto kernel scope link src 192.168.65.3
```

192.168.65.1 是 [vpnkit 配置的默认网关 ip](https://github.com/moby/vpnkit/blob/dc331cb22850be0cdd97c84a9cfecaf44a1afb6e/src/hostnet/configuration.ml#L96)。通过 tap0 设备可以访问到。

在 []()

当系统没有安装 slirp4netns，rootlesskit 会启动 vpnkit 来作为默认网关代理。
vpnkit 的作用有三个：[网关，端口转发，HTTP 透明代理](https://github.com/moby/vpnkit#design)。

```sh
$ ps -ef | grep vpnkit
adoyle      1186    1079  0 00:11 ?       00:00:03 rootlesskit --net=vpnkit --mtu=1500 --slirp4netns-sandbox=auto --slirp4netns-seccomp=auto --disable-host-loopback --port-driver=builtin --copy-up=/etc --copy-up=/run --propagation=rslave /home/adoyle/bin/dockerd-rootless.sh
# /proc/self/exe 是指 rootlesskit 本身
adoyle      1199    1186  0 00:11 ?       00:04:41 /proc/self/exe --net=vpnkit --mtu=1500 --slirp4netns-sandbox=auto --slirp4netns-seccomp=auto --disable-host-loopback --port-driver=builtin --copy-up=/etc --copy-up=/run --propagation=rslave /home/adoyle/bin/dockerd-rootless.sh
# vpnkit 监听 socket /tmp/rootlesskit2453325839/vpnkit-ethernet.sock
adoyle      1223    1186  0 00:11 ?       00:06:20 vpnkit --ethernet /tmp/rootlesskit2453325839/vpnkit-ethernet.sock --mtu 1500 --host-ip 0.0.0.0
```

在 [rootlesskit docs/network.md](https://github.com/rootless-containers/rootlesskit/blob/master/docs/network.md) 的 `--net=vpnkit` 文档如此写到：

> Supports only TCP and UDP packets. No support for ICMP Echo (ping) unlike --net=slirp4netns, even if /proc/sys/net/ipv4/ping_group_range is configured.

**说明 vpnkit 不支持 ICMP 包，因此不支持 ping。**

```sh
$ lsof /tmp/rootlesskit2453325839/vpnkit-ethernet.sock
COMMAND  PID   USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
vpnkit  1223 adoyle    9u  unix 0x0000000000000000      0t0 8359 /tmp/rootlesskit2453325839/vpnkit-ethernet.sock type=STREAM
vpnkit  1223 adoyle   12u  unix 0x0000000000000000      0t0 8358 /tmp/rootlesskit2453325839/vpnkit-ethernet.sock type=STREAM

$ ss | grep /tmp/rootlesskit2453325839/vpnkit-ethernet.sock
u_str ESTAB 0  0  /tmp/rootlesskit2453325839/vpnkit-ethernet.sock 8364   * 11268

$ ss -p | grep 11268
u_str ESTAB 0  0  /tmp/rootlesskit2453325839/vpnkit-ethernet.sock 8364   * 11268
u_str ESTAB 0  0                                                         * 11268   * 8364  users:(("exe",pid=1199,fd=7))
```

vpnkit 监听 `/tmp/rootlesskit2453325839/vpnkit-ethernet.sock`，而这个 socket 连接着 192.168.65.1。

### 源码分析

在 rootlesskit 的 [pkg/network/vpnkit/vpnkit.go 文件中的 ConfigureNetwork 函数](https://github.com/rootless-containers/rootlesskit/blob/5410f69cf58d07bf0ebd1d517e590606c12345e0/pkg/network/vpnkit/vpnkit.go#L88)创建了 vpnkit-ethernet.sock，并且与子网络空间的 ip 相连。

```go
func (d *parentDriver) ConfigureNetwork(childPID int, stateDir, detachedNetNSPath string) (*messages.ParentInitNetworkDriverCompleted, func() error, error) {
	var cleanups []func() error
	vpnkitSocket := filepath.Join(stateDir, "vpnkit-ethernet.sock")
	vpnkitCtx, vpnkitCancel := context.WithCancel(context.Background())
	vpnkitCmd := exec.CommandContext(vpnkitCtx, d.binary, "--ethernet", vpnkitSocket, "--mtu", strconv.Itoa(d.mtu))
  // 省略
  vmnet, err := waitForVPNKit(ctx, vpnkitSocket)
  // 省略
  vif, err := vmnet.ConnectVif(vifUUID)
  // 省略
}
```

这里的 vmnet 作用是将虚拟机 ip 收到的请求转发到 socket，进而让监听 socket 的进程获得网络包。
详见 https://github.com/moby/vpnkit/blob/master/go/pkg/vmnet/vmnet.go

[Using vpnkit as a default gateway](https://github.com/moby/vpnkit/blob/master/docs/ethernet.md) 文档也可以作为参考。

## rootlesskit --net=slirp4netns

当系统安装了 slirp4netns，rootlesskit 的 --net 参数会是 slirp4netns。

```sh
$ ps -ef | grep slirp4netns
adoyle     19367    1079  0 00:51 ?        00:00:00 rootlesskit --net=slirp4netns --mtu=65520 --slirp4netns-sandbox=auto --slirp4netns-seccomp=auto --disable-host-loopback --port-driver=builtin --copy-up=/etc --copy-up=/run --propagation=rslave /home/adoyle/bin/dockerd-rootless.sh
adoyle     19377   19367  0 00:51 ?        00:00:00 /proc/self/exe --net=slirp4netns --mtu=65520 --slirp4netns-sandbox=auto --slirp4netns-seccomp=auto --disable-host-loopback --port-driver=builtin --copy-up=/etc --copy-up=/run --propagation=rslave /home/adoyle/bin/dockerd-rootless.sh
adoyle     19394   19367  0 00:51 ?        00:00:00 slirp4netns --mtu 65520 -r 3 --disable-host-loopback --enable-sandbox --enable-seccomp 19377 tap0
```

`slirp4netns ... 19377 tap0` 这里的 `19377` 是 pid。slirp4netns 会在 19377 进程所在的 namespace 下创建 tap0。
因此在宿主机执行 `ip a` 是看不到 tap0 虚拟设备的。需要执行 `sudo nsenter -n -t 19377 bash` 进入到它的 namespace，或者执行 `sudo nsenter -n -t 19377 ip a` 才能看到 tap0。

```sh
$ ip a
4: tap0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 65520 qdisc fq state UP group default qlen 1000
    link/ether ea:3d:3d:83:fb:dc brd ff:ff:ff:ff:ff:ff
    inet 10.0.2.100/24 scope global tap0
       valid_lft forever preferred_lft forever
    inet6 fe80::e83d:3dff:fe83:fbdc/64 scope link
       valid_lft forever preferred_lft forever
5: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    link/ether 02:42:fe:08:cc:b7 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:feff:fe08:ccb7/64 scope link
       valid_lft forever preferred_lft forever
```

```sh
$ ip route
default via 10.0.2.2 dev tap0
10.0.2.0/24 dev tap0 proto kernel scope link src 10.0.2.100
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1

$ cat /etc/resolv.conf
nameserver 10.0.2.3
```

这里的网关 10.0.2.2 指向的是什么？其实它是宿主机的 IP。[slirp4netns 的 vhost 默认配置](https://github.com/rootless-containers/slirp4netns/blob/462be177a5282a7dc76b2308a55b745ef9d50d2d/slirp4netns.1.md#description)。
子命名空间通过这个 IP 将网络包发给宿主机。

### 10.0.2.3

10.0.2.3 是 slirp4netns 自带的 DNS 服务，监听 53 端口。

## CNI

rootless 模式，CNI conflist 存储在 `~/.config/cni/net.d/*.conflist`。
root 模式，CNI conflist 存储在 `/etc/cni/net.d/*.conflist`。
