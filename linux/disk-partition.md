# 硬盘分区

## 概念

### 分区格式

- MBR (Master Boot Record)
  - MBR 数据存储在硬盘的第一个扇区 (512 字节)。数据结构：启动代码 (Bootstrap Code Area, 446 字节) + 分区表 (Partition Table, 64 字节) + 结束标志 (Boot Signature, 2 字节，值为 `0x55AA`)。
    - Bootstrap code area 内部结构可能不同，具体见 [Sector layout](https://www.wikiwand.com/en/Master_boot_record#/Sector_layout)。
  - 每个分区表记录项为 16 字节，因此最多设置 4 个分区。每个分区空间最大 2T 大小，分区的起始位置不能大于 2 TB。
    - 意味着一块 2T 以上的硬盘，不适合用 MBR 分区格式。
  - 分区表划分为主分区和扩展分区。
  - 主分区最多 4 个分区，至少要有 1 个。
  - 扩展分区最多 1 个，最少 0 个分区。扩展分区不能直接使用，必须划分为 N 个逻辑分区。
  - 逻辑分区最多 N 个分区，最少 0 个分区。所有逻辑分区加起来就是一个扩展分区。
- GPT (GUID Partition Table)
  - 没有分区数量和大小的限制
  - 兼容 MBR。第一扇区被称为“保护 MBR”。阻止不能识别 GPT 的磁盘工具试图对硬盘进行分区或格式化等操作。
  - 数据结构：
    - 硬盘头部：保护 MBR + GPT Partition Header + 分区表
    - 硬盘尾部是备份区：分区表 + GPT Partition Header

## 命令

- 查看硬盘信息: `fdisk -l`
- 查看分区信息: `lsblk`

## MBR 分区

```sh
# 对硬盘 /dev/sda 进行 MBR 分区
fdisk /dev/sda
```

## GPT 分区

```sh
# 对硬盘 /dev/sda 进行 GPT 分区
parted /dev/sda
# 磁盘标签格式设为 gpt
(parted) mklabel gpt
# 查分区
(parted) print
(parted) mkpart
# 分别回答: p1 回车 0% 1GiB
(parted) mkpart
# 分别回答: p2 回车 1GiB 100%
```

GPT 扇区要兼容 MBR 扇区，当分区设置 `0%` 会预留空间，START 位置会偏移 2048 扇区。

```
Device         Start        End   Sectors   Size Type
/dev/sdb1       2048  859834367 859832320   410G Linux filesystem
```

对于大多数磁盘而言，留给元数据和文件系统结构的空间通常是 2048 个扇区，每个扇区大小为 512 字节，即 1MiB 左右。因此，在使用 parted 命令进行分区时，即使指定了起始位置为 0%，实际上操作系统也会将该分区的起始位置设置为第 2048 个扇区（或者更靠后的某个扇区），以避免影响磁盘的元数据和文件系统结构。

EFI 分区格式化成 Fat32 文件系统 `mkfs.fat -F 32 /dev/<partition>`。

## 4K 对齐

因为 block 是文件系统读写硬盘的基本单位。block 的大小通常是 4KiB，即由连续八个扇区 (sector) 组成。

当 4K 对齐时，磁盘读写时不需要操作额外的扇区，可以充分发挥磁盘的读写性能。而不对齐就会造成磁盘读写性能的下降。

## MBR 备份与恢复

先使用 `fdisk -l` 确定 MBR 位置。

```sh
# MBR 大小 512 字节，所以 bs=512，count=1

# 备份整个 MBR
dd if=/dev/sda of=/root/backup-sda.mbr bs=512 count=1

# 恢复整个 MBR
dd if=/root/backup-sda.mbr of=/dev/sda bs=512 count=1

# 仅恢复 bootstrap code（这通常用于恢复到不一样大小的硬盘的场景）
dd if=/root/backup-sda.mbr of=/dev/sda bs=446 count=1

# 仅恢复分区表
dd if=/root/backup-sda.mbr of=/dev/sda bs=512 skip=446 count=66
```

也可以用 `sfdisk` 来恢复和备份分区表

```sh
# 备份分区表到人类可读的文本文件
sfdisk -d /dev/sda > /root/backup-sda.sfdisk

# 恢复分区表
sfdisk /dev/sda < /root/backup-sda.sfdisk
```

## GPT 备份与恢复

## 调整保留空间 (reserved blocks)

保留空间的意义是万一磁盘满了，可以为 root 用户修复问题保留一定的硬盘空间。系统盘建议设置保留空间，数据盘建议不保留。

```sh
# 用 ext4 文件系统对分区进行格式化。`-m 5` 代表保留 5% 的保留空间。
mkfs.ext4 -m 5 /dev/sda1

# 对于非系统盘，通常不用保留分区。
# -L 打标签用于辨别对应哪块硬盘，标签名最大长度 16 bytes
mkfs.ext4 -m 0 -L WD /dev/sda2
```

在格式化后也可以调整保留空间。

```sh
# 把保留空间设为 0
tune2fs -r 0 /dev/sda1

# 或者设为 1%
tune2fs -m 1 /dev/sde1

# 查看某个分区的保留空间
tune2fs -l /dev/sda1 | grep 'Reserved'
```

## /boot 分区支持的文件系统有限

不支持 btrfs 和 lvm。建议用 ext4。

## MBR 与 GPT

MBR 最多只有 4 个分区。分区大小不能超过 2 TB。GPT 没有这些限制。
