---
title: arch linux
created: 2023-11-07T04:38:50+0800
updated: 2025-12-28T21:13:41+0800
tags: [Arch Linux, pacman]
---


## signature from "... <...@gmail.com>" is marginal trust

在安装包的时候可能出现签名不对导致错误

```
error: failed to commit transaction (invalid or corrupted package)
Errors occurred, no packages were upgraded.
```

解决方法：尝试更新 keyring `sudo pacman -Sy archlinux-keyring`


## pacman -Syu 不更新内核

编辑 /etc/pacman.conf，添加 `IgnorePkg   = linux linux-firmware` 就可以在执行 `sudo pacman -Syu` 时不更新内核包。

## pacman -Sc 清空缓存

清理缓存中“未安装的软件包”，并且只保留当前已安装软件的最新版本。
