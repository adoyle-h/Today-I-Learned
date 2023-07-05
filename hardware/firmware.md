# 固件 (Firmware)

固件（台湾称呼为韌體）。

## realtek firmware

瑞昱半导体。主要生产声卡、网卡、显卡。

```sh
# 安装 realtek 驱动，设置 apt 源
deb http://ftp.de.debian.org/debian bullseye main non-free
deb-src  http://ftp.de.debian.org/debian bullseye main non-free
```

## 命令

- `lsmod` 显示当前加载的所有内核模块
- `modinfo $module_name` 显示模块信息
- `modprobe -c | less` 显示所有模块的配置
- `modprobe --show-depends $module_name` 显示模块的依赖关系

## Linux 系统安装固件

有两种方法：通过包管理器安装，或者手动下载固件文件来安装。

手动下载固件文件需要拷贝固件 (.gcode 或 .fw 文件) 到 `/lib/firmware` 目录下。
固件可以到 [linux/kernel 的 firmware 仓库](https://git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git/tree/)找，/lib/firmware 路径需要的文件，都在根目录的对应路径下面。

不用重启电脑。使用 `modprobe` 命令来加载固件。

```bash
modprobe -r mod_name # 禁用固件
modprobe mod_name    # 加载固件
```

注意，`modprobe` 只能修改当前会话，系统重启后你的修改就重置了。

### 持久化固件配置

首先 `systemctl status systemd-modules-load` 确保该服务启动。因为 `systemd-modules-load.service` 会依次从

- `/etc/modules-load.d/*.conf`
- `/run/modules-load.d/*.conf`
- `/usr/lib/modules-load.d/*.conf`

读取 .conf 文件。这个配置文件设置加载什么内核模块。
对于不同目录中的同名文件，以最先加载到为准。

如果要禁止 `/run/modules-load.d` 或者 `/usr/lib/modules-load.d` 下的某个 .conf 配置，可以执行 `sudo ln -s /dev/null /etc/modules-load.d/abc.conf`。

详见 https://manpages.ubuntu.com/manpages/impish/zh_TW/man5/modules-load.d.5.html

为了持久化修改，需要在 `/etc/modprobe.d/` 目录下创建一个 .conf 文件。比如 `echo "virtio-net" > /etc/modprobe.d/virtio-net.conf`。就可以在系统启动后加载 virtio-net.ko 模块。
