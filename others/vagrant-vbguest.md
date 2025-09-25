---
title: vagrant-vbguest
---


https://github.com/dotless-de/vagrant-vbguest

### vagrant-vbguest 安装 Virtualbox Guest Additions 卡住

当 vagrant-vbguest 检测到 `No Virtualbox Guest Additions installation found`，会自动去装 Virtualbox Guest Additions （以下简称 VGA）。
由于 VGA 依赖 kernel-devel。而实际上它会执行 ``yum install -y kernel-devel-`uname -r` --enablerepo=C*-base --enablerepo=C*-updates`` 来安装 kernel-devel。

因为执行的 `--enablerepo=C*-base --enablerepo=C*-updates` 选用的是国外的源。且 ``"kernel-devel-`uname -r`"`` 这个查找条件，一般国内镜像站都找不到这个包（阿里云镜像有这个 rpm 包，但是 ``yum search "kernel-devel-`uname -r`"`` 还是找不到），只有源站才有。
外国人不知道中国人的困境。在国内安装 kernel-devel 非常慢，且经常下载连接断开。
看起来现象就是 vagrant-vbguest 安装 VGA 时卡住。

#### 解决方案

两种方案，改 vagrant-vbguest 源码修正 yum install 命令。或者下面这种方案：

先修改 Vagrantfile 配置，不让 vagrant-vbguest 自动安装 VGA。

```ruby
if Vagrant.has_plugin?("vagrant-vbguest") then
  node.vbguest.auto_update = false
  node.vbguest.no_remote = true
  node.vbguest.no_install = true
end
```

`vagrant up` 启动虚拟机后，再手动安装 VGA。

```sh
---
title: 进入虚拟机
---

vagrant ssh

# 自行确认 yum 使用的是国内镜像源

# Virtualbox Guest Additions 依赖 kernel-devel
yum install kernel-devel

# 退出虚拟机，在宿主机上执行命令，安装 Virtualbox Guest Additions
exit

# 你的虚拟机名称
vm_name=vm_node-1
# 这里是 Mac 系统的情况。其他系统在这里找 ISO 镜像的路径 https://github.com/dotless-de/vagrant-vbguest#iso-autodetection
VBoxGuestAdditions_ISO=/Applications/VirtualBox.app/Contents/MacOS/VBoxGuestAdditions.iso
vagrant vbguest "$vm_name" --do install --iso "$VBoxGuestAdditions_ISO"
```
