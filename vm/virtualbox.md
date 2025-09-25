---
title: Virtualbox
---


## 开启网络访问

默认虚拟机的网络配置是 NAT。如果虚拟机里访问不了外网，可能是 ifcfg 配置不对。查看 /etc/sysconfig/network-scripts/ifcfg-en 开头的文件，把 ONBOOT 的值改成 yes，然后 `service network restart` 即可。

## 开启共享粘贴板

共享粘贴板只支持 GUI 环境，**不支持终端环境**。终端环境的解决方案只有虚拟机里开一个 sshd，在宿主机 ssh 进去，即在宿主机环境操作。

1. 启动虚拟机后，在菜单栏-设备-共享粘贴板，选择「双向」。
2. 点击菜单栏-设备-安装增强功能。

如果安装增强功能失败，显示不能挂载的话。在启动虚拟机后，点菜单栏-设备-分配光驱，把 VBoxGuestAdditions.iso 移除了，再选择虚拟盘安装上。
VBoxGuestAdditions.iso 文件在 Virtualbox 的安装目录中可以找到。然后执行以下操作。

```sh
mkdir /media/cdrom0
mount /dev/cdrom /media/cdrom0
/media/cdrom0/VBoxLinuxAdditions.run
umount /media/cdrom0
rmdir /media/cdrom1
```

如果安装失败 VBoxLinuxAdditions.run，屏幕打印出 `Kernel headers not found for target kernel`，很可能是 kernel-headers 不匹配。因为 VBoxGuestAdditions 依赖 kernel-devel 和 kernel-headers，即使主机上装了，也不一定版本匹配。所以先确认版本。

```sh
---
title: 确认本机 kernel 版本
---

uname -r
# 确认 kernel-devel 的 rpm 包 (我用的是 CentOS，其他系统对应自己找)
rpm -qa | grep kernel-devel

# 如果 rpm 包版本跟本机不是一模一样的，需要这样安装 rpm 包
yum install kernel-devel-`uname -r`
```

然后再次尝试执行 VBoxLinuxAdditions.run。

如果安装失败 VBoxLinuxAdditions.run，查看 /var/log/vboxadd-setup.log 显示 `Count not find the X.Org or XFree86 Window System, skipping`，那就安装 xorg 相关的驱动。比如 `yum install xorg-x11-drivers xorg-x11-utils`。


## vdi 转 iso

用 `VBoxManage clonemedium $uuid $iso_output --format RAW` 把 vdi 文件转换成 iso。
VBoxManage 在 virtualbox 的安装目录可以找到。

具体例子，我的 virtualbox 安装在 `D:\Program Files (x86)\virtualbox`。

```sh
# uuid 可以通过 virtualbox 的虚拟介质管理找到，右键点击虚拟硬盘查看属性。带不带 {} 都可以。
uuid='{96a08e96-3fa5-4b61-b3d9-48ab479671d7}'

# 输出路径不能用 /，否则会在 C 盘底下创建路径。得用 \ 写法。
'/mnt/d/Program Files (x86)/virtualbox/VBoxManage.exe' clonemedium $uuid 'C:\Users\PC\nixos.iso' --format RAW
```

然而这有个缺点，它会把 vdi 预分配的空间全部都导出到 iso 里，这就会比虚拟机实际用到的空间大。

推荐用[通用方法](../linux/mkisofs.md)制作 iso。

## linux 虚拟机挂载宿主机的共享文件夹

在 virtualbox 中右键虚拟机打开「设置-共享文件夹」，添加一个文件夹，名字比如叫 shared_vm。
进入虚拟机后，在终端执行。

```sh
sudo mkdir /mnt/shared
sudo mount -t vboxsf shared_vm /mnt/shared
```

## 虚拟机挂载宿主机的 USB 设备

先插上 USB 设备。

在 virtualbox 中右键虚拟机打开「设置- USB 设备」，勾选「启用 USB 控制器」选择「USB 3.0 控制器」，右边点击「添加一个 USB 筛选器」。

启动虚拟机后，有些系统会自动挂载。有些系统不会，需要手动挂载。
