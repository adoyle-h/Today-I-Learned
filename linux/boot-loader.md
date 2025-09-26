---
title: BootLoader
created: 2022-02-06T23:12:29+0800
updated: 2022-02-06T23:12:29+0800
---

## 启动顺序

- BIOS 加载 MBR 的 bootloader 和分区表。
- bootloader 加载操作系统内核。以 GRUB 为例，内核会挂载 `/boot` 里的 initramfs 镜像文件到内存中作为 Linux 的根文件系统。
- 内核检测系统硬件。启动流程根据配置启动 INIT 进程（Linux 系统的 INIT 进程是 systemd）。


## 常见的 bootloader

- [GNU GRUB](./grub.md): 用于 Linux 系统
- [uboot](https://www.denx.de/wiki/U-Boot/): 用于嵌入式设备。
- [breed](https://breed.hackpascal.net/): 中国人 Weijie Gao 做的闭源 bootloader。用于嵌入式设备。2022 年停止维护。
- [mcuboot](https://github.com/mcu-tools/mcuboot): 用于 32 位 MCU 的 bootloader。
- [syslinux](https://wiki.syslinux.org/wiki/index.php?title=The_Syslinux_Project): bootloader 套装。常用来从硬盘（包括 MS-DOS FAT  文件系统）、USB、光盘或网络引导启动 Linux 系统。它包括 syslinux, isolinux, pxelinux, extlinux, memlinux 等工具。
- [Etherboot (gPXE)](http://etherboot.org/wiki/): 从网络启动的 bootloader
- [limine](https://github.com/limine-bootloader/limine): 比较新的 bootloader
- [OpenCore bootloader](https://github.com/acidanthera/OpenCorePkg): 黑苹果系统的破解 bootloader，专门用于启动 MacOS。
- [rust-osdev/bootloader](https://github.com/rust-osdev/bootloader): 用 Rust 实现的 Bootloader。可以关注一下。
- [systemd-boot](https://wiki.archlinux.org/title/Systemd-boot): 不太用到
