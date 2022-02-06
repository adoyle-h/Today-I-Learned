## BootLoader

### TOC

<!-- MarkdownTOC GFM -->

- [启动顺序](#启动顺序)
- [常见的 bootloader](#常见的-bootloader)

<!-- /MarkdownTOC -->

### 启动顺序

- BIOS 加载 MBR 的 bootloader 和分区表。
- bootloader 加载操作系统内核。以 GRUB 为例，内核会挂载 `/boot` 里的 initramfs 镜像文件到内存中作为 Linux 的根文件系统。
- 内核检测系统硬件。启动流程根据配置启动 INIT 进程（Linux 系统的 INIT 进程是 systemd）。


### 常见的 bootloader

- [GNU GRUB](./grub.md)
- [uboot](https://www.denx.de/wiki/U-Boot/)
- [syslinux](https://wiki.syslinux.org/wiki/index.php?title=The_Syslinux_Project)
- [Etherboot (gPXE)](http://etherboot.org/wiki/): 从网络启动的 bootloader
- [systemd-boot](https://wiki.archlinux.org/title/Systemd-boot)
- [limine](https://github.com/limine-bootloader/limine)
