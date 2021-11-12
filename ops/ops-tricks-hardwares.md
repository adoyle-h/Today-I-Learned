# 运维小技巧 - 硬件

## TOC

<!-- MarkdownTOC GFM -->

- [关机/重启](#关机重启)
- [生成硬件信息拓扑图](#生成硬件信息拓扑图)
- [dmidecode](#dmidecode)
- [CPU](#cpu)
    - [查看物理 CPU 个数](#查看物理-cpu-个数)
    - [查看逻辑 CPU 个数](#查看逻辑-cpu-个数)
    - [查看单个 CPU 有几个核](#查看单个-cpu-有几个核)
    - [查看 CPU 的主频](#查看-cpu-的主频)
    - [功耗统计](#功耗统计)
- [硬盘](#硬盘)
    - [健康状况](#健康状况)
    - [坏道检测](#坏道检测)
    - [查看是否 4K 对齐](#查看是否-4k-对齐)
    - [查看硬盘分区](#查看硬盘分区)
    - [硬盘休眠](#硬盘休眠)
- [挂载](#挂载)
    - [查看文件挂载](#查看文件挂载)
    - [获取分区 UUID](#获取分区-uuid)
    - [检测谁正在使用挂载目录](#检测谁正在使用挂载目录)
    - [关闭正在使用挂载目录的进程](#关闭正在使用挂载目录的进程)

<!-- /MarkdownTOC -->

## 关机/重启

- 断电关机 `shutdown -h`
- 不断电关机 `halt`
- 重启 `reboot`

## 生成硬件信息拓扑图

终端用户安装 `hwloc-nox` 包，桌面用户安装 `hwloc` 包。

`hwloc-ls`

## dmidecode

dmidecode 的作用是将DMI数据库中的信息解码，以可读的文本方式显示。

- 查看主板上的 PCI 插槽: `dmidecode | grep --color "PCI"`
- 查看所有硬件信息: `dmidecode`
- 查看指定硬件信息 : `dmidecode -t <类型>`，类型见 https://linux.die.net/man/8/dmidecode


## CPU

查看 CPU 信息 `cat /proc/cpuinfo`，或者 `lscpu`

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

### 健康状况

- `smartctl -H /dev/sda`
- `smartctl -A /dev/sda`

### 坏道检测

- `badblocks -s -v /dev/sda`

### 查看是否 4K 对齐

`fdisk -l /dev/sda`

如果显示 `Partition does not start on physical sector boundary.`，就说明没有对齐。

### 查看硬盘分区

`lsblk /dev/sda`

### 硬盘休眠

- `hdparm -C /dev/sda` 查看状态
- `hdparm -y /dev/sda` 休眠 (standby)
- `hdparm -Y /dev/sda` 睡眠 (sleep)
- `fdisk -l /dev/sda` 唤醒硬盘

## 挂载

### 查看文件挂载

`df -h`

### 获取分区 UUID

`blkid /dev/sda1`

### 检测谁正在使用挂载目录

`fuser -v -m /dev/sda`

### 关闭正在使用挂载目录的进程

`fuser -v -k -i -m /dev/sdb1`
