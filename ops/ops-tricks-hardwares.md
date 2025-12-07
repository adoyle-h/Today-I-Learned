---
title: 运维小技巧 - 硬件
created: 2021-11-03T03:58:59+0800
updated: 2025-12-05T22:40:35+0800
---

## 关机/重启

- 断电关机 `shutdown -h`
- 不断电关机 `halt`
- 重启 `reboot`

## 查看内核消息

`dmesg -H`

详见 [linux/dmesg.md](../linux/dmesg.md)。

## 查看 PCI 设备信息

`lspci -tv`。`-t` 是树形结构查看，`-v` 是详细信息，可以是 `-vv` 或 `-vvv`。

## 生成硬件信息拓扑图

终端用户安装 `hwloc-nox` 包，桌面用户安装 `hwloc` 包。

`hwloc-ls`

## dmidecode

dmidecode 的作用是将 DMI 数据库中的信息解码，以可读的文本方式显示。

- 查看主板上的 PCI 插槽: `dmidecode | grep --color "PCI"`
- 查看所有硬件信息: `dmidecode`
- 查看指定硬件信息 : `dmidecode -t <类型>`，类型见 https://linux.die.net/man/8/dmidecode


## CPU

查看 CPU 信息 `cat /proc/cpuinfo`，或者 `lscpu`。

```
Architecture:        x86_64
CPU op-mode(s):      32-bit, 64-bit
Byte Order:          Little Endian
Address sizes:       39 bits physical, 48 bits virtual
CPU(s):              6                                           逻辑 CPU 个数
On-line CPU(s) list: 0-5
Thread(s) per core:  1                                           每个 CPU 的线程数
Core(s) per socket:  1                                           每个插槽的 CPU 核数
Socket(s):           6                                           CPU 插槽数
Vendor ID:           GenuineIntel
CPU family:          6                                           CPU 产品系列代号
Model:               158                                         CPU 属于其系列代号中哪一代的代号
Model name:          Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz    CPU 属于的名字及其编号、标称主频
Stepping:            10                                          CPU 步进
CPU MHz:             2600.000
BogoMIPS:            5200.00
L1d cache:           32K
L1i cache:           32K
L2 cache:            256K
L3 cache:            12288K
Flags:               fpu vme ...
```

### 查看物理 CPU 个数

`cat /proc/cpuinfo |grep "physical id"|sort |uniq|wc -l`

### 查看逻辑 CPU 个数

`cat /proc/cpuinfo |grep "processor"|wc -l`

### 查看单个 CPU 有几个核

`cat /proc/cpuinfo |grep "cores"|uniq`

### 查看 CPU 的主频

`cat /proc/cpuinfo |grep MHz|uniq`

### 功耗统计

- 实时查询 `powertop`
- 统计报告 `powertop --csv=report.csv`

## 硬盘

### 查看硬盘列表

`fdisk -l`

### 查看硬盘信息

- `hdparm -I /dev/sda`
- `smartctl -A /dev/sda`
- `smartctl -i /dev/sda`

### 查看硬盘分区

`lsblk /dev/sda`

### 获取分区 uuid

`sudo blkid /dev/sda1`

### 健康状况

- `smartctl -H /dev/sda`
- `smartctl -A /dev/sda`

### 坏道检测

- `badblocks -s -v /dev/sda`

### 查看是否 4K 对齐

`fdisk -l /dev/sda`

如果显示 `Partition does not start on physical sector boundary.`，就说明没有对齐。

### 硬盘待机

- `hdparm -I /dev/sda` 查看详细信息
- `hdparm -C /dev/sda` 查看待机状态。`active/idle` 表示运行中，`standby` 表示待机。
- `hdparm -y /dev/sda` 待机 (standby/spindown)，降低硬盘转速
- `hdparm -Y /dev/sda` 睡眠 (sleep)，完全停止硬盘转动
- `fdisk -l /dev/sda` 唤醒硬盘

- `hdparm -B` 设置硬盘的 APM（Advanced Power Management，高级电源管理）等级。
  - 这是 HDD 固件本身的电源管理策略，会影响是否容易休眠、噪音、性能、头部停靠策略等。
  - APM 级别范围为 1–255，但不是线性关系。
    | 数值范围    | 硬盘行为   | 典型效果                          |
    | ------- | ------ | ----------------------------- |
    | 1–127   | 省电优先   | 更容易休眠，更快停转，旋转速度可能降低，噪音低，但性能下降 |
    | 128–254 | 性能优先   | 不易休眠，读写更积极，噪音略高，性能更稳定         |
    | 255     | 关闭 APM | 不会自动休眠，始终全速运行                 |


- `hdparm -S` 设置空闲多少时间后待机
  - 1–240 表示每单位 5 秒。120 = 10 分钟。240 = 20 分钟。 241–246 表示 30–960 分钟。
  - 255：关闭 APM

对于 hdparm `-B` 和 `-S` 选项无效的情况。可以试试 [https://github.com/adelolmo/hd-idle](https://github.com/adelolmo/hd-idle)。

## 挂载

### 查看文件挂载

`df -h`

### 获取分区 UUID

`blkid /dev/sda1`

### 检测谁正在使用挂载目录

`fuser -v -m /dev/sda`

### 关闭正在使用挂载目录的进程

`fuser -v -k -i -m /dev/sdb1`

## 内存

### 检测内存正确性

`memtester 1000M 5`

### 检测内存读写速度

`sysbench --test=memory run`

### 带宽测试

`mbw`
