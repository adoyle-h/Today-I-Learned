---
title: mkisofs
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


网上很多资料都会用 `-b isolinux/isolinux.bin -c isolinux/boot.cat` 参数，但是会包找不到 isolinux 目录。这是因为你要先自己下载 isolinux 文件作为 boot。

一般来说，现代的 linux 都会用 grub2 作为 bootloader，查看是否存在 /boot/grub 目录。若存在，你可以用 grub-mkrescue 命令来制作 ISO 镜像。

## grub-mkrescue

grub-mkrescue 会使用 GNU xorriso 来制作 iso 镜像。xorriso 的功能与 mkisofs 类似。

```sh
# 首先，挂载要备份的硬盘到 /mnt/src
# 修改 /mnt/src/boot/grub/grub.cfg 里的启动项
grub-mkrescue -o ./my.iso /mnt/src
```

## 可引导的 ISO 9660 镜像

ISO 镜像有两类，纯数据的，以及可引导的 (bootable)。
