---
title: '网心云 OES'
created: 2025-10-22T11:25:44+0800
updated: 2025-10-22T12:05:56+0800
tags: []
---

## 购前须知

1. OES 硬件配置：CPU Amlogic A311D。4GB RAM。8GB EMMC。3 个 SATA 盘位。1 个千兆网口。1 个 USB 口。**无视频输出接口**。
1. OES 其中两块 SATA 硬盘是可拔插的，同时叠的很紧密，散热非常不好。因此要买带风扇版本的。

## 刷机

刷 armbian 系统。刷机教程：https://github.com/ophub/amlogic-s9xxx-armbian/issues/2666

>[!ATTENTION]
> 1. 进入刷机模式的方法我试了，只有开盖短接是有效的，其他方法无效。我的是 OES 第一代带风扇版本。
> 2. usb burning tool 刷机时不要勾选擦除 flash 和擦除 bootloader 选项。有的视频教程勾选了擦除 flash。没必要，这只会削减 emmc 的寿命。
> 3. 不要使用刷机方案 A 的 ubuntu 底包。因为刷入后开机不能通过 IP 连接，无论是 DHCP IP 还是静态 IP 都没有。怀疑启动过程中出错卡住了。
> 4. 使用刷机方案 B 的精简包，体积很小又很方便。OES 只需要刷入 oesp1.img，不需要再刷 oesp2.img。OES Plus 需要在刷 oesp2.img。
> 5. oesp1.img 启动时后不是静态 IP 192.168.1.200。需要到主路由器查看它的 IP。它的主机名就叫 armbian。

## 调整风扇

设置风扇在 45℃  以上开启：`echo 45000 | sudo tee /sys/class/hwmon/hwmon0/device/trip_point_3_temp`

查看风扇温度:

```sh
cat /sys/class/thermal/thermal_zone0/temp
cat /sys/class/thermal/thermal_zone1/temp
```
