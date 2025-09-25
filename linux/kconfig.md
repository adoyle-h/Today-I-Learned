---
title: kconfig
---


在编译 linux 内核常见的 `make *config` 命令都是来自于 [kconfig](https://www.kernel.org/doc/html/latest/kbuild/kconfig.html)。
可以 `make help` 查看相关命令。

- `make config` 问答式创建 .config 文件。非专家不要使用。
- `make defconfig` 根据当前系统架构和默认配置，自动创建最大适配通用配置的 .config 文件。
- `make menuconfig` 使用终端界面来配置 .config 文件。
- `make nconfig` 使用另一种终端界面来配置 .config 文件。
- `make xconfig` 使用 QT 界面来配置 .config 文件。
- `make gconfig` 使用 GTK+ 界面来配置 .config 文件。
- `make savedefconfig` 通过 .config 文件生成 defconfig 文件。新文件以 `_defconfig` 后缀命名。
- `make oldconfig` 对比现有的和之前的 .config 文件区别。
  - 当你将现有的内核配置转移到一个新的内核版本时很有用。
  - 如果你在运行了一次 `make oldconfig` 之后再运行第二次，第二次就不会提示你任何选项了。

## make menuconfig

### 修改 menuconfig 配色

使用 [MENUCONFIG_COLOR](https://www.kernel.org/doc/html/latest/kbuild/kconfig.html#menuconfig-color) 修改 menuconfig 配色。

`make MENUCONFIG_COLOR=<theme> menuconfig`

`<theme>` 的值有，

- mono       => selects colors suitable for monochrome displays
- blackbg    => selects a color scheme with black background
- classic    => theme with blue background. The classic look
- bluetitle  => a LCD friendly version of classic. (default)

P.S. busybox 不支持修改配色，因为它的 kconfig 版本太低了。
