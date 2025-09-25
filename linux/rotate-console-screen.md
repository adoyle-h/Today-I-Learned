---
title: 旋转终端屏幕
---


对于竖屏显示器，linux 的控制台输出也可以做到旋转屏幕方向。

## 临时修改

修改当前屏幕：`echo 1 | sudo tee /sys/class/graphics/fbcon/rotate`

修改所有屏幕：`echo 1 | sudo tee /sys/class/graphics/fbcon/rotate_all`

设置 0,1,2,3 对应四个朝向。

## 永久修改

如果你用 GRUB 作为 bootloader。编辑 /etc/default/grub 文件，设置这行：

`GRUB_CMDLINE_LINUX="fbcon=rotate:1"`

详见 https://www.kernel.org/doc/html/latest/fb/fbcon.html?highlight=rotate

----

这则知识来自 https://askubuntu.com/a/452772
