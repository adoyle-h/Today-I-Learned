## BIOS

### TOC

<!-- MarkdownTOC GFM -->

- [启动顺序](#启动顺序)
- [BIOS 芯片](#bios-芯片)
- [CMOS 芯片](#cmos-芯片)
- [POST](#post)
- [查看 BIOS 信息](#查看-bios-信息)
- [BIOS 唤醒](#bios-唤醒)
- [来电唤醒](#来电唤醒)

<!-- /MarkdownTOC -->

### 启动顺序

- 按下电源开关。
- CPU 从地址 `FFFF0000H` 处开始执行 JUMP 指令，跳转到固化在 BIOS ROM 的自检程序代码。
- 读取 Flash ROM 加载 BIOS 程序。
- 读取 CMOS RAM 加载 BIOS 设置。
- BIOS 执行 POST 进行开机自检。
- BIOS 根据 CMOS 中设置的启动顺序 (Boot Sequence) 搜寻可引导的存储设备（比如硬盘、U 盘、光盘等）的第一个扇区是否有 bootloader，如有则读入内存地址为 `0000:7C00H` 处，将系统控制权交给 bootloader。
  - 检查地址 `0000:01FEH-0000:01FFH`（MBR 的结束标志位）是否等于 `55AAH`。若不等于则尝试搜索下一个启动设备，如果没有启动设备满足要求，则死机。
- 当检测到有启动设备满足要求后，BIOS 将控制权交给相应启动设备。启动设备的 MBR 将自己复制到内存 `0000:0600H` 处，然后继续执行。根据 MBR 中的引导代码启动引导程序。
- [进入 bootloader](./boot-loader.md#启动顺序)

### BIOS 芯片

BIOS 程序存储在 Flash ROM 芯片上，容量一般为 1~8M。

### CMOS 芯片

CMOS (Complementary Metal Oxide Semiconductor) 是可读写的 RAM 芯片，存储主板的重要参数, 包括系统时间、CPU 电压与频率、BIOS 设置。由主板上的纽扣电池供电，断电会丢失数据。

如果 BIOS 设置出问题导致无法开机，终极解决方案是取下 CMOS 电池重置 BIOS 设置。

### POST

POST (Power-On Self-Test) 过程会非常快速，用户几乎感觉不出来。

POST 之后会有峰鸣声表示检查结果。一声简短的 beep 声表示系统正常。如果在 POST 过程中系统设备存在致命的问题，BIOS 会发出不同含义的蜂鸣声来报告检测过程中出现的错误，同时启动中止，声音的长短及次数对应着系统的错误类型。不同 BIOS 系统的峰鸣声类型不同。

### 查看 BIOS 信息

`sudo dmidecode -t bios`

### BIOS 唤醒

在系统关机后，自动唤醒启动系统。

- RTC 唤醒 (时钟唤醒)
- 来电唤醒
- 网络唤醒 (WOL, Wake On LAN)

### 来电唤醒

以 Beelink EQ14 的 BIOS 为例，进入 Chipset - PCH-IO Configuration - State After G3。选 `S0 State` 为开启，`S5 State` 为关闭。
