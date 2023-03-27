# 固件 (Firmware)

固件（台湾称呼为韌體）。

## realtek firmware

瑞昱半导体。主要生产声卡、网卡、显卡。

```sh
# 安装 realtek 驱动，设置 apt 源
deb http://ftp.de.debian.org/debian bullseye main non-free
deb-src  http://ftp.de.debian.org/debian bullseye main non-free
```

## Linux 系统安装固件

有两种方法：通过包管理器安装，或者手动下载固件文件来安装。

手动下载固件文件需要拷贝固件 (.gcode 或 .fw 文件) 到 `/lib/firmware` 目录下。
固件可以到 [linux/kernel 的 firmware 仓库](https://git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git/tree/)找，/lib/firmware 路径需要的文件，都在根目录的对应路径下面。

不用重启电脑。使用 `modprobe` 命令来加载固件。

```bash
modprobe -r mod_name # 禁用固件
modprobe mod_name    # 加载固件
```
