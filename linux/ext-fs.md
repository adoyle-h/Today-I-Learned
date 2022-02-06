## ExtFS (Extended File System)

**本文以 ext4 文件系统为例。ext、ext2、ext3 可以此作为参考。**

### TOC

<!-- MarkdownTOC GFM -->

- [上层概念](#上层概念)
- [下层概念](#下层概念)
- [调整 inode](#调整-inode)
- [参考资料](#参考资料)

<!-- /MarkdownTOC -->

### 上层概念

- 文件系统 (File System)
  - `tune2fs -l` 可以查询文件系统的详细配置
- 分区 (Partition)

- 文件 (File)
  - 文件的数据储存在 block 中。
  - 文件的元信息（包括文件的创建者、创建日期、文件大小等）存储在 inode。
  - `file` 命令可以查询文件的类型
- 块 (Block)
  - block 是文件系统读写硬盘的基本单位。block 的大小通常是 4KB，即由连续八个 sector 组成。
- 索引节点 (inode)
  - `stat` 命令可以查询文件的 inode 信息。
  - inode 的内容
    - 文件大小（字节单位）
    - 设备 ID，标识容纳该文件的设备
    - 文件所有者的 User ID
    - 文件的 Group ID
    - 文件的模式 (mode)，确定了文件的类型，以及它的所有者、它的 group、其它用户访问此文件的权限。
    - 额外的系统和用户标志 (flag)：限制文件的使用和修改来保护文件
    - 文件 inode 修改时间 ctime
    - 文件内容修改时间 mtime
    - 文件上一次访问的时间 atime
    - 链接数，标识有多少硬连接指向当前 inode
    - 文件块指针，标识文件数据 block 的位置
  - 注意 inode 不包含文件名。文件名存储在上级目录的 block 中。

### 下层概念

- 扇区 (Sector)
  - Sector 是硬盘磁头读写数据的基本单位。每个 Sector 储存 512 字节 (0.5KB)。
  - ![](https://archive.org/download/v2-dc762f4e4037b261d0134171213c94a0_1440w/v2-dc762f4e4037b261d0134171213c94a0_1440w.jpg)

### 调整 inode

**调整 inode 需要格式化磁盘，注意备份数据。**

inode 数量 = 文件系统大小/ inode 字节数
  - inode 字节数，英文叫 inode size 或 bytes per inode 或 bytes/inode ratio
  - 文件系统大小即分区大小

- `cat /etc/mke2fs.conf` 可以看到 mkfs 默认的 inode 配置。

- `mkfs.ext4 -i` 可以指定 inode 字节数

每个 inode 节点的大小，一般是 128 字节或 256 字节。
inode 节点的总数，在格式化时就给定，一般是每 1KB 或每 2KB 就设置一个 inode。
假定在一块1GB的硬盘中，每个inode节点的大小为128字节，每1KB就设置一个inode，那么inode table的大小就会达到128MB，占整块硬盘的12.8%。


### 参考资料

- [Ext4 Disk Layout](https://ext4.wiki.kernel.org/index.php/Ext4_Disk_Layout)
- [了解 ext4 的历史](https://archive.ph/6JqEf)
