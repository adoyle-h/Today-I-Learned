---
title: systemd-mount
created: 2024-03-29T03:03:53+0800
updated: 2024-03-29T03:03:53+0800
---

由 systemd 管理的文件系统挂载点。可以替代 /etc/fstab。

## 文件命名

mount unit 必须以扩展名为 .mount 的挂载点命名，如果挂载点路径为 /data/backup，则 unit 文件必须命名为 `data-backup.mount`。

automount unit 使用 mount unit 的名称，扩展名为 .automount，因此示例 data-backup.mount 的 automount unit 必须命名为 `data-backup.automount`。

如果挂载点是 `/data/home-backup`，那么 unit 文件必须是 `data-home\x2dbackup.mount`。可以用 `systemd-escape -p --suffix=mount "/data/home-backup"` 输出转义符。

## -.mount

"-.mount" 是 Systemd 中的一个特殊挂载单元。这个特殊的挂载单元是 Systemd 在启动过程中自动生成的，用于挂载根文件系统。

通常，根文件系统在 Linux 中是通过 /etc/fstab 文件或其他类似的方式来挂载的。但是，在使用 Systemd 的系统中，Systemd 会在启动过程中自动创建一个特殊的挂载单元，用于挂载根文件系统，这个挂载单元的名称就是"-.mount"。

"-.mount" 的创建是 Systemd 初始化过程中的一部分，它确保根文件系统能够正确地挂载并且能够在系统引导时顺利启动。
