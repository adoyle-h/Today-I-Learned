---
title: Ubnt EdgeRouter X (er-x) 刷 OpenWRT
---


https://openwrt.org/toh/ubiquiti/edgerouter_x_er-x_ka

## 编译

https://openwrt.org/docs/guide-developer/toolchain/use-buildsystem

1. 不要在 arm64 架构里执行，因为 gcc-multilib 和 g++-mulitlib 这个交叉编译工具就不提供 arm64 架构的程序，只能在 x86 环境安装使用。建议在 x86 环境执行编译。
2. 不要在 macos 或者运行在 macos 的容器里执行，会遇到问题。
3. 如果人在中国，需要设定 export HTTPS_PROXY HTTP_PROXY ALL_PROXY 等环境变量，用来保证网络连接正常。
4. 有时候即使翻墙也会遇到网络问题，重试几次 make 就行了。编译都有缓存文件，不会重新编译已有的。
5. make 默认单线程编译，使用 -j 参数指定线程数，加快编译速度。`make -j$(nproc)` 可以用上所有的 CPU。
6. `make V=sc` 可以显示完整编译 log。

### 在容器里编译

我选择在容器里编译 openwrt，不会污染宿主机环境。为此特意制作了 docker 镜像 https://github.com/adoyle-h/openwrt-build-env ，已 push 到 docker hub。

不要在 rootless 容器执行。需要在 root 容器里执行编译。

### 编译选项

根据 [ER-X 的 Techdata](https://openwrt.org/toh/hwdata/ubiquiti/ubiquiti_edgerouter_x) 可知，`make menuconfig` 时

- Target System 选择 `MediaTek Ralink MIPS`
- Subtarget 选择 `MT7621 based boards`
- Target Profile 选择 `Ubiquiti EdgeRouter X`

可以参考[我的编译选项](https://gist.github.com/adoyle-h/4c2c5d8bbcf875403485322cd656052e)。在编译选项上可能会多出几个未见过的选项，因为我实际刷的是 [immortalwrt](https://github.com/immortalwrt/immortalwrt)，这是 openwrt 的分支。

没有开启 dnsmasq，因为我用 adguard home。

### libfakeroot: read: Connection reset by peer

我编译时经常碰到这个 fakeroot 报错。编译 openwrt 用到了 fakeroot，它是个 C/S 架构的程序。

这是一个很离谱的 bug，每次编译到一半都会出现 connection reset by peer 的错误，就停止了。

经过艰苦排查，我发现可能是 tmux 的锅。因为我每次去看编译进度都会缩放 tmux 的窗口大小，然后 fakeroot 就连接中断了。只要我不去动它，就会正常编译下去……非常离谱。

我是在 tmux 里操作 bash，启动 docker 容器，在容器里执行编译的。

### 编译结果

编译结果在 `bin/targets/ramips/mt7621/` 目录下，主要是下面这两个文件：

- openwrt-ramips-mt7621-ubnt_edgerouter-x-initramfs-kernel.bin  （下文简称 kernel.bin）
- openwrt-ramips-mt7621-ubnt_edgerouter-x-squashfs-sysupgrade.bin （下文简称 sysupgrade.bin）



## 刷机

要先刷 kernel.bin，后刷 sysupgrade.bin。kernel.bin 只是运行在内存中的系统，路由器重启后就消失了。它只是用来过渡刷 sysupgrade.bin 用的。

### kernel.bin

我自己编译的 kernel.bin 文件有 21MB。上传后就一直卡在 `decompressing kernel...`，等了半小时都没刷成功。

推荐从 https://github.com/stman/OpenWRT-19.07.2-factory-tar-file-for-Ubiquiti-EdgeRouter-x/ 下载现成的文件，只有 2MB 大小，几分钟就刷好了。

- openwrt-ramips-mt7621-ubnt_edgerouter-x-initramfs-factory.tar
- openwrt-ramips-mt7621-ubnt_edgerouter-x-initramfs-kernel.bin

tar 文件和 bin 文件功能相同，区别在于刷入路由器的方式不同。tar 文件是 OpenWrt 旧版本输出的格式，新版本只有 bin 文件。
作为过渡用的固件，用哪个都无所谓。二选一即可。

#### 刷 tar 文件

tar 文件比较简单，准备 RJ45 转 USB 工具，连接路由器的 eth0 端口和电脑。同时关闭电脑的其他有线或无线网络。

scp 上传到路由器，然后在路由器执行 `add system image $path_to_tar`，然后重启路由器，就启动了 initramfs 的 openwrt。

#### 刷 bin 文件

刷 bin 文件比较复杂。

1. 拆开路由器的外壳，用 USB 转 TTL 工具把路由器和电脑连线。接线方式看[这个图](https://community.ui.com/questions/How-to-connect-ER-X-serial-console/75bbbd47-7520-49ba-82c4-2c35ff663497)。
  - 虽然路由器上有 4 个端口，图里却只接了 3 个，注意不要把 3.3V 接第四个端口上，USB 转 TTL 芯片会过热，有可能会炸。（不要问我怎么知道的😭）
2. 使用 minicom 工具，波特率设置为 `57600 8N1`。
3. 准备 RJ45 转 USB 工具，连接路由器的 eth0 端口和电脑。同时关闭电脑的其他有线或无线网络。
4. 电脑准备好 TFTP Server 工具。
5. 重启路由器，在刚启动时会有 5 秒让你选择如何启动方式，按下 1，使用 TFTP 刷入引导固件。

#### TFTP

刷 bin 文件需要用到 TFTP Server。

MacOS 可以使用 [Transfer](https://www.intuitibits.com/products/transfer/) 启动 TFTP 服务器。

当路由器启动后会看到这个，默认是 3，有 5 秒倒数计时。这里要选择 1，这个过程是让路由器通过 TFTP 协议去从你的电脑里下载 kernel.bin。

```
Please choose the operation:
   1: Load system code to SDRAM via TFTP.
   2: Load system code then write to Flash via TFTP.
   3: Boot system code via Flash (default).
   4: Entr boot command line interface.
   7: Load Boot Loader code then write to Flash via Serial.
   9: Load Boot Loader code then write to Flash via TFTP.
   r: Start TFTP recovery.
default: 3

You choosed 1
```

根据你的实际来。在路由器和电脑分别执行 `ip a` 查看本地 IP。

- `Device IP` 是路由器的 ip。根据实际值填。
- `Server IP` 是电脑的 IP，即 tftp server 的 ip。根据实际值填。
- `Linux Kernel filename` 是 kernel.bin 文件在 tftp server 中的路径。根据实际值填。

```
1: System Load Linux to SDRAM via TFTP.
 Please Input new ones /or Ctrl-C to discard
        Input device IP (192.168.1.1) ==:
        Input server IP (192.168.1.11) ==:
        Input Linux Kernel filename (kernel.bin) ==:
```

刷好后不要重启路由器，不要断电。现在运行的是 openwrt 系统。

### sysupgrade.bin

刷好后把网络接口从 eth0 换到 eth1。因为 openwrt 默认 eth0 是 wan 口，电脑无法通过 eth0 与路由器通信。

通过 scp 把 sysupgrade.bin 文件上传到路由器 /tmp/sysupgrade.bin。
然后执行执行 `sysupgrade /tmp/sysupgrade.bin`。
刷完后它会自动重启。

### WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED

路由器默认 IP 是 192.168.1.1，当执行 ssh root@192.168.1.1 可能会遇到中间人攻击提醒，导致链接不上。
这是因为你的电脑之前有 ssh 过 192.168.1.1，已经存了指纹信息。这时候只要编辑 `~/.ssh/known_hosts` 文件，把 192.168.1.1 那行用 `#` 暂时注释掉，等刷完机后再改回来就行。

## 刷完后的配置

openwrt 默认 eth0 是 wan 口，所以电脑无法通过 eth0 与路由器通信。网线接到 eth1，浏览器访问 http://192.168.1.1 进入 luci 控制台修改系统配置。

### 修改网段

内网默认是使用 `192.168.1.0/24` 网段，如果不使用路由器进行 pppoe 拨号上网的话，这个网段会和其他路由设备的网段重合。为了避免网段冲突，需要改为其他网段。
