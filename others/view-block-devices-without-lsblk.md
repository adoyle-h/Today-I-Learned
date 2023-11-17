# 不用 lsblk 查看块设备

有些系统不自带 lsblk 命令。如何查看块设备的分区信息？

执行 `ls -al /dev/block/by-name` 或者 `ls -al /dev/block/bootdevice/by-name`。
可以看到分区路径与分区别名的映射关系。

还可以用 `mount` 查看挂载情况。
