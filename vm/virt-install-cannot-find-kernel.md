---
title: virt-install Couldn't find kernel for install tree
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## 问题描述

当使用 `--location` 参数安装 ISO 文件时，报错 `Couldn't find kernel for install tree`。

## 解决方案

两种方案，一种是使用 `--cdrom`，但这导致有些参数没法使用，比如 `--extra-args`。

下面讲第二种方案，依然使用 `--location`，不过同时要指定 initrd 和 kernel 文件。

`isoinfo -J -i file.iso -l | grep '(initrd|vmlinuz)'` 找出对应的文件。

参考 https://archive.ph/eHBke

```
Distro	       Kernel path	                 RAM disk path
Fedora	       /isolinux/vmlinuz     	       /isolinux/initrd.img
RHEL5/CentOS5	 /isolinux/vmlinuz     	       /isolinux/initrd.img
openSUSE	     /boot/i386/loader/linux	     /boot/i386/loader/initrd
Mandriva	     /i586/isolinux/alt0/vmlinuz	 /i586/isolinux/alt0/all.rdz
Ubuntu	       /casper/vmlinuz	             /casper/initrd.gz
Debian	       /install.386/vmlinuz/	       /isolinux/initrd.img
```

所以 virt-install 的 --location 参数应该这么填，

- 针对 Fedora 系统，`--location $iso,initrd=live/initrd.img,kernel=pxeboot/vmlinuz`
- 针对 Debian 系统，`--location $iso,initrd=install/initrd.gz,kernel=install/vmlinuz`

```sh
iso=/debian.iso

virt-install \
  --disk path=$iso,device=cdrom \
  --location $iso,initrd=install/initrd.gz,kernel=install/vmlinuz \
```

这些[回答](https://askubuntu.com/q/789358/1675926)很有参考价值。
