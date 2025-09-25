---
title: zephyr 与 esp32
---


## 烧录

直接通过 usb 连接到电脑。
**Mac 电脑注意**：雷电 4 接口电压过高，需要用 usb 2.0 hub 转接一下。否则会烧坏板子。

默认波特率 921600bps 有问题，需要改成 115200。`west flash --esp-baud-rate 115200`
