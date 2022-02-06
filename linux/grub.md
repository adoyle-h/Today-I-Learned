## GNU GRUB

本文默认都是 GRUB 2。

[GNU GRUB](https://www.gnu.org/software/grub/)



### grub-install

`grub-install /dev/sda` 代表把 grub 安装到 sda 硬盘的主引导扇区 (MBR)。

`grub-install /dev/sda1` 代表把 grub 安装到 sda 硬盘的第一个分区。如果是这种方式，需要由主引导扇区的 bootloader 引导至这个分区。

### 设置 grub

```
set pager=1
```
