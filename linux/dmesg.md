# dmesg

dmesg 用来显示或控制内核环缓冲区（kernel-ring buffer）的内容。

在开机系统引导 (boot) 阶段，内核将与硬件和模块初始化相关的信息填到这个缓冲区中。这些消息也存在 `/var/log/dmesg` 文件里。

`dmesg` 命令会直接输出所有消息。使用 `dmesg -H` 来滚屏阅读更方便。
