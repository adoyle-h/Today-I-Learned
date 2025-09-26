---
title: legend bios 无损转 uefi
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


- 以前的机器启动搭配是：Legend BIOS + MBR 磁盘 + MBR 分区表 + MBR 引导模式
- 现在的机器启动搭配是：UEFI BIOS + GPT 磁盘 + GUID 分区表 + GPT 引导（EFI 引导或者 UEFI 引导）

1. 先用 [DiskGenius](https://www.diskgenius.cn/) 备份系统。
2. 制作 [WePE](https://www.wepe.com.cn/) U 盘启动盘。
3. 进入 WePE。
4. 使用 DiskGenius 将之前的 MBR 分区表（大概 500MB 左右的那个分区）删除，留出空余空间。
5. 右击硬盘，点「转换分区表类型为 GUID 格式」。点击左上角的「保存更改」按钮。
6. 点击空余空间，选择「建立 ESP/MSR 分区」，按默认设置点击确认。会有一点空余空间剩余，放着没事。
7. 给 ESP 分区随便分配一个盘符。
8. 打开菜单栏-引导工具-Windows 引导修复 (NTBootAutoFix)。引导盘就选 ESP 分区的盘符，系统盘就是原来的系统盘（比如 C 盘），Windows 目录就是 `C:\Windows`，勾选「修复 UEFI」。
9. 点击修复。成功后重启系统，并进入 BIOS。
10. 将启动设置里从 「legend bios」或「legend+uefi」改成「uefi 优先」或者「uefi only」。
11. （可选）开启 secure boot。


具体流程部分参考 https://zhuanlan.zhihu.com/p/419849594
