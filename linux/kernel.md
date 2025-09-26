---
title: Linux 内核
created: 2022-12-02T22:53:19+0800
updated: 2022-12-02T22:53:19+0800
---


- https://www.kernel.org/doc/html/latest/

## 编译内核

- [kconfig](./kconfig.md)
- [Kernel Build System](https://www.kernel.org/doc/html/latest/kbuild/)

## 升级内核

### 以 debian 系统为例

```sh
# 升级前先做好快照和备份

# 更新数据源
sudo apt update
# 查看内核是否可升级
sudo apt list --upgradable | grep -e linux-image -e linux-headers
# 升级内核。注意 amd64 架构和 arm 架构的包名不同
sudo apt upgrade linux-headers-amd64 linux-image-amd64

# 查看 /etc/default/grub 配置是 GRUB_DEFAULT=0，代表默认启动第一个内核选项，GRUB_DEFAULT=1 代表第二个。
cat /etc/default/grub
# 更新 grub 配置。新内核一般会放在第一个选项。详见 /boot/grub/grub.cfg
sudo update-grub

# 重启系统
sudo reboot
# 查看当前内核版本
uname -r

# 查看已安装的内核包
dpkg --list | grep -e linux-image -e linux-headers
# 用 apt remove 删除旧的内核文件，只保留最新的
# 如果有删内核文件，还要再 update-grub 一遍
```

### 以 arch linux 系统为例

```sh
# 更新系统和所有软件包
sudo pacman -Syu
# （可选）如果在上一步没有自动安装新内核，可以使用以下命令升级新内核
sudo pacman -S linux
# 安装新内核后，需要更新引导加载程序（如 GRUB）的配置文件，使其能够识别并启动新内核生成新的 GRUB 配置文件
sudo grub-mkconfig -o /boot/grub/grub.cfg
# 重启系统来生效
sudo reboot
```

## 升级内核且不重启

虽然有 kpatch、livepatch、kgraft 等工具，但不推荐。
