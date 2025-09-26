---
title: 为何 Protobuf 3 移除了 required 和 optional
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


为了向后兼容和向前兼容。详见 [Issue](https://github.com/protocolbuffers/protobuf/issues/2497#issuecomment-267422550)。
这是因为 Protobuf 是一个通信协议，而不是通信框架。它专注于序列化和反序列化，所以兼容问题是 Protobuf 考虑的重点。

由于 gRPC 是基于 Protobuf 的，导致接口的完整性校验和协议里的字段结构设计的概念耦合了。
Protobuf 团队做了这种权衡，保证了兼容和某种程度的简单。但接口完整性校验的缺失要靠别的机制去补充，这就对用户很不友好。
