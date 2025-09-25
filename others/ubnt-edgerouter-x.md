---
title: Ubnt EdgeRouter-X
---


## EdgeOS

EdgeOS 是基于 Vyatta 的。Vyatta 是基于 Debian 的。

### Vyatta

Vyatta 是一家成立于 2005-2006 年的公司，目标是构建一个开源的软件路由器平台，用以替代昂贵的思科硬件设备。它基于 Debian Linux，并实现了类似 Cisco IOS 的命令行配置方式。
提供防火墙、路由（OSPF/BGP）、VPN（IPSec/OpenVPN）、QoS 等功能。最早的版本对社区免费，名为 Vyatta Community Edition（CE）。

2012 年，Brocade（博科通讯）收购了 Vyatta。收购后，Brocade 停止维护社区版（Vyatta CE 6.6 是最后一个社区版本）。开源社区因此面临断层。

### VyOS

2013 年 VyOS 正式发布第一个版本。VyOS 是 Vyatta 的继任者。

VyOS 和 EdgeOS 同属 Vyatta 血统系统，但走出了不同的发展路径。

- VyOS 提供 ISO 镜像、虚拟机镜像，适用于任意 x86/ARM 硬件或云平台。
- EdgeOS 只能安装在 Ubiquiti 的 EdgeRouter 系列产品上。

## 配置 sshd

登录到 ER-X 服务器，执行下面的命令。

```sh
configure
set system login user adoyle authentication public-keys adoyle type ssh-ed25519
set system login user adoyle authentication public-keys adoyle key AAAAC3NzaC1lZDI1NTE5AAAAIJM/MdzWyA2ixgQnhMe+XIygiDqXUM3M9tsVKm/v/QbQ
commit;save
exit
```

执行 `cat ~/.ssh/authorized_keys` 检查是否正确。

然后禁止密码登录：

```sh
configure
set service ssh disable-password-authentication
commit;save
exit
```

参考[文章](https://docs.vyos.io/en/latest/configuration/system/login.html)

## 设置 bash completion

在使用 root 用户时，bash 补全是正常的。但使用其他用户名时，bash 补全就有问题。

解决方法是 `sudo vi /etc/bash.bashrc` 找到 `# enable bash completion in interactive shells` 这行，把下面的注释取消。

或者 `vi ~/.bashrc` 添加下面这段：

```
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi
```

然后重新登录用户即可。

## 设置 shell PATH

默认 PATH 缺少 /sbin 和 /usr/sbin 目录。会导致很多程序无法直接在终端使用，比如 tcpdump。

重新设置：`PATH=$PATH:/sbin:/usr/sbin`

## APT

>[!NOTE] 写在前面
> ER-X 剩余硬盘空间就只有 70MB 以内。apt update 获取源列表后就只剩 7MB。使用 APT 几乎装不了什么包。
> apt list 和包缓存占用了很大空间。
> 记得清理缓存 `sudo apt clean`。清理 /root.dev/w/var/cache/apt 和 /root.dev/w/var/lib/apt/lists 目录。

ER-X 默认自带 apt。但是它没有设置源。

EdgeOS 是基于 Debian 的。`cat /etc/debian_version` 发现是 9.13 版本，即代号 Stretch。

```sh
configure
set system package repository stretch components 'main contrib non-free'
set system package repository stretch distribution stretch
set system package repository stretch url http://archive.debian.org/debian
commit ; save
exit
```

`sudo apt-get update` 更新源。

**禁用 `apt-get upgrade`！它会破坏 EdgeOS 的一些已安装的包**

参考的是[这篇文章](https://help.uisp.com/hc/en-us/articles/22591219068055-EdgeRouter-Add-Debian-Packages-to-EdgeOS)。

另外，可以加入 ubnt 官方源。参考[这篇文章](https://help.ui.com/hc/en-us/articles/220066768-Updating-and-Installing-Self-Hosted-UniFi-Network-Servers-Linux)。

```sh
echo 'deb [ arch=amd64,arm64 ] https://www.ui.com/downloads/unifi/debian stable ubiquiti' | sudo tee /etc/apt/sources.list.d/100-ubnt-unifi.list

# 我的 ER-X 没有 wget 命令，可以在自己电脑上下载后，scp 到服务器上。
sudo wget -O /etc/apt/trusted.gpg.d/unifi-repo.gpg https://dl.ui.com/unifi/unifi-repo.gpg
# 或者执行
# sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 06E85760C0A52C50
sudo apt-get update
```
