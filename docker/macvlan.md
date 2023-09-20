# docker macvlan

## 使用场景

给容器分配局域网 IP 和独立 Mac 地址。

## 前置要求

1. `sudo modprobe macvlan` 开启 macvlan 内核模块。
2. 物理网卡支持 macvlan。
3. 物理网卡开启混杂模式。

## 注意

1. podman、nerdctl、docker 在 rootless 模式下都不支持 macvlan。
2. nerdctl 的 macvlan 子网不支持跟宿主机的网段有重合。就没法获取宿主机的局域网 IP。docker 可以。

## mac_address

mac_address 的地址不能随意填。需要匹配物理网卡的 mac 地址的前缀。

## 排查问题

可以自己手动创建 macvlan 来排查问题。`sudo ip link add link eth0 name macvlan0 type macvlan mode bridge`
如果显示 `Unknown device type.` 那就是内核模块没开启。
