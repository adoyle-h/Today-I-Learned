---
title: KVM (Kernel-based Virtual Machine)
created: 2021-11-14T00:09:49+0800
updated: 2021-11-14T00:09:49+0800
---


## KVM 与 QEMU 与 Libvirt 的关系

![.jpg](https://user-images.githubusercontent.com/1998490/223427418-84015b3d-b6ef-4da9-bf46-049e9bf86699.png)

- [KVM-Qemu-Libvirt 三者之间的关系](https://blog.51cto.com/changfei/1672147) ([链接备份](https://archive.ph/TwVct))

KVM (Kernel-based Virtual Machine) 和 QEMU (Quick Emulator) 是两个虚拟化相关的开源项目。它们通常一起使用来提供完整的虚拟化解决方案。以下是它们之间的主要区别：

KVM 是 Linux 内核模块，依赖于硬件虚拟化扩展，如 Intel VT-x 和 AMD-V。

QEMU 是运行在用户态的模拟器，它通过将客户机指令翻译为主机指令来模拟虚拟机。QEMU 可以在没有硬件虚拟化支持的系统上独立运行，但这性能较差。因为是纯软件模拟。它也可以与 KVM 一起使用以提高性能，如 qemu-kvm。

libvirt 是目前使用最为广泛的对 KVM 虚拟机进行管理的工具和 API。Libvirtd 是一个 daemon 进程，可以被本地的 virsh 调用，也可以被远程的 virsh 调用，Libvirtd 调用 qemu-kvm 操作虚拟机。

## 硬件虚拟化

完全的软件虚拟化是非常慢的，所以要使用硬件辅助虚拟化技术，这需要 CPU 硬件开启这个标志位，一般在 BIOS 里面设置。

查看系统是否开启硬件虚拟化。

```sh
# 对于 Intel CPU 可用命令判断
grep vmx /proc/cpuinfo

# 对于 AMD CPU 可用命令判断
grep svm /proc/cpuinfo
```

如果没有任何的输出，说明你的 CPU 不支持虚拟化。
