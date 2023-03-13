## KVM (Kernel-based Virtual Machine)

### KVM 与 QEMU 与 Libvirt 的关系

![.jpg](https://user-images.githubusercontent.com/1998490/223427418-84015b3d-b6ef-4da9-bf46-049e9bf86699.png)

- [KVM-Qemu-Libvirt三者之间的关系](https://blog.51cto.com/changfei/1672147) ([链接备份](https://archive.ph/TwVct))

### 硬件虚拟化

完全虚拟化是非常慢的，所以要使用硬件辅助虚拟化技术 Intel-VT，AMD-V，所以需要CPU硬件开启这个标志位，一般在BIOS里面设置。

查看系统是否开启硬件虚拟化。

```sh
# 对于Intel CPU 可用命令判断
grep vmx /proc/cpuinfo

# 对于AMD CPU 可用命令判断
grep svm /proc/cpuinfo
```

如果没有任何的输出，说明你的 cpu 不支持虚拟化。
