---
title: YAML 中的 Date 类型陷阱
---


踩到一个坑，当 YAML 文件写 `d: 2018-12-22`，它代表的是一个 Date 类型，不是 String。这是 YAML [定义的语义](https://yaml.org/type/timestamp.html)。
导致 YAML 转成 JSON 后，在 JS 里再序列化，就变成了 `"d": "2018-12-22T00:00:00.000Z"`。
不是期望的 `"d": "2018-12-22"`。
得写成 `d: '2018-12-22'`，这么写 YAML 才能避免转换成 Date。
