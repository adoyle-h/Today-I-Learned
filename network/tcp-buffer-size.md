---
title: TCP Buffer 大小
---


Q: HTTP 1.1 协议里没有对 POST Body 的长度进行限制。HTTP 基于 TCP 的，TCP 包的 MSS 最大就 1460 字节（约 1.43 KiB）。那么当我发送一个 HTTP POST 请求，body 是 1 MiB 大小的数据。网络包的拆包和重组的过程是由谁主动控制的，HTTP 还是 TCP ？
如果是 TCP 负责拆包和重组，那么 TCP 怎么知道何时应该把 buffer 传给应用层处理？比如接收到 500KiB，但完整的 http 包有 1MiB。

A: TCP 滑动窗口的大小一般为 64 KiB，调整 TCP 滑动窗口因子，窗口大小最大可到 1GiB。
