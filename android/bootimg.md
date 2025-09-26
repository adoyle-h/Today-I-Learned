---
title: boot.img
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## 从手机上提取 boot.img

```sh
# 查询 boot 分区位置
$ ls -al /dev/block/by-name/boot
lrwxrwxrwx 1 root root 21 2023-11-17 12:50 /dev/block/by-name/boot -> /dev/block/mmcblk0p42
# 导出到外置存储卡 /sdcard/boot.img
$ dd if=/dev/block/mmcblk0p19 of=/sdcard/boot.img
```

## 从 boot.img 提取内核文件

可使用我编译的 [unpackbootimg 工具](https://github.com/adoyle-h/android-unpackbootimg/actions/runs/6899157671)。

`unpackbootimg -i ./boot.img -o ./boot`

## 制作 boot.img

可使用我编译的 [unpackbootimg 工具](https://github.com/adoyle-h/android-unpackbootimg/actions/runs/6899157671)。

`mkbooting --kernel KERNEL -o ./boot.img`
