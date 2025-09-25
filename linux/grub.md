---
title: GNU GRUB
---


本文默认都是 [GNU GRUB 2](https://www.gnu.org/software/grub/)。

## os-prober

[os-prober](https://github.com/campadrenalin/os-prober) 可以扫描所有硬盘里可用的操作系统，并加入到 Grub 的启动项里。
如果要使用这个功能，先在系统里安装 os-prober，然后编辑 `/etc/default/grub`，设置 `GRUB_DISABLE_OS_PROBER=false` (默认为 true)。

## grub-install

执行 `[ -d /sys/firmware/efi ] && echo UEFI || echo Legacy` 检测当前系统 BIOS Boot Mode 是 UEFI 还是 Legacy。

### 当 BIOS Boot Mode 是 UEFI

你的引导分区 Disklabel type 必须是 gpt。

`grub-install --target=<TARGET> --boot-directory=/boot --efi-directory=/boot --bootloader-id=GRUB /dev/sda` 代表把 grub 安装到 sda 硬盘的引导扇区。这里的 /dev/sda 根据你的实际情况修改。

`<TARGET>` 的取值：
- Intel 32 位: `i386-efi`
- Intel 64 位: `x86_64-efi`
- Arm 32 位: `arm-efi`
- Arm 64 位: `arm64-efi`

### 当 BIOS Boot Mode 是 Legacy

你的引导分区 Disklabel type 必须是 dos。

`grub-install --target=<TARGET> --boot-directory=/boot /dev/sda` 代表把 grub 安装到 sda 硬盘的引导扇区。这里的 /dev/sda 根据你的实际情况修改。

`<TARGET>` 的取值：
- Intel 32 位: `i386-pc`
- Intel 64 位: `i386-pc`
- Arm 32 位:
- Arm 64 位:

`grub-install /dev/sda1` 代表把 grub 安装到 sda 硬盘的第一个分区。如果是这种方式，需要由主引导分区的 bootloader 引导至这个分区。

`grub-install` 默认安装 GRUB 镜像到 /boot 目录。你可以使用 `--boot-directory=` 参数指定目录位置，比如当你在 USB 安装环境时，`--boot-directory=/mnt/boot`。

## /boot/grub/grub.cfg

使用 `grub-mkconfig -o /boot/grub/grub.cfg` 生成 /boot/grub/grub.cfg，无须手动修改。

## 设置 grub

```
set pager=1
```
