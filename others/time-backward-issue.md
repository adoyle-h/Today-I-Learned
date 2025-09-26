---
title: 时间回跳问题
created: 2022-12-02T22:58:30+0800
updated: 2022-12-02T22:58:30+0800
tags: [NTP, TAI, UTC, 原子钟]
---


无论是闰秒调整还是 NTP 同步，都可能导致时间回跳的问题。

```go
start := time.Now()
// 20 毫秒后
end := time.Now()
// end 的时间可能在 start 之前
```

## 时钟 Wall Time

## 单调时间 Monotonic Time

## 世界时 UT

世界时（Universal Time，简称UT）是一种以格林威治子夜起算的平太阳时。世界时是以地球自转为基准得到的时间尺度，其精度受到地球自转不均匀变化和极移的影响，为了解决这种影响，1955 年国际天文联合会定义了 UT0、UT1 和 UT2 三个系统。

### UT0

UT0 系统是由一个天文台的天文观测直接测定的世界时，没有考虑极移造成的天文台地理坐标变化。该系统曾长期被认为是稳定均匀的时间计量系统，得到过广泛应用。

### UT1

UT1 系统是在 UT0 的基础上加入了极移改正 Δλ，修正地轴摆动的影响。UT1是目前使用的世界时标准。被作为目前世界民用时间标准 UTC 在增减闰秒时的参照标准。

### UT2

UT2 系统是 UT1 的平滑处理版本，在UT1基础上加入了地球自转速率的季节性改正 ΔT。

### 关系

它们之间的关系可以表示为：

- UT1 = UT0 + Δλ
- UT2 = UT1 + ΔT

## 世界协调时 UTC

> 协调世界时（英语：Coordinated Universal Time，法语：Temps Universel Coordonné，简称UTC）是最主要的世界时间标准，其以原子时的秒长为基础，在时刻上尽量接近于格林威治标准时间。
> 协调世界时是世界上调节时钟和时间的主要时间标准，它与0度经线的平太阳时相差不超过1秒，并不遵守夏令时。协调世界时是最接近格林威治标准时间（GMT）的几个替代时间系统之一。对于大多数用途来说，UTC时间被认为能与GMT时间互换，但GMT时间已不再被科学界所确定。
> 协调世界时（UTC）正式形成于1963年国际无线电咨询委员会的374号建议中，该建议由多国时间实验室共同提出。人们对该时间系统进行过数次调整，直到1972年引入了闰秒机制，调整工作得以简化。也有很多人提议用一个没有闰秒的时间系统来替换掉协调世界时，但目前尚未就此达成一致。
> 现行的协调世界时根据国际电信联盟的建议《Standard-frequency and time-signal emissions》(ITU-R TF.460-6)所确定。UTC基于国际原子时，并通过不规则的加入闰秒来抵消地球自转变慢的影响。闰秒在必要的时候会被插入到UTC中，以保证协调世界时（UTC）与世界时（UT1）相差不超过0.9秒。

地球自转

> 中华民国采用CNS 7648的《资料元及交换格式–资讯交换–日期及时间的表示法》（与ISO 8601类似）称之为“世界协调时间”；
> 中华人民共和国采用ISO 8601:2000的国家标准GB/T 7408-2005《数据元和交换格式 信息交换 日期和时间表示法》中则称之为“协调世界时”。

## TAI

国际原子时间 (International Atomic Time，简称 TAI)，是一个综合了约400个高精度原子钟的时间尺度。它提供了精准速度的时间。

使用铯的同位素原子，铯-133

1967 年，[国际单位制][]基于铯的性质定义了其时间单位，也就是秒。
国际单位制将一秒定义为不受外场干扰的铯-133的原子基态的两个超精细结构能阶间跃迁所对应的辐射的9,192,631,770个周期的持续时间。
目前最先进的铯原子钟的精度超过了 10^-15，这意味著从6600万年前恐龙灭绝的时代起其误差仅为2秒钟，被认为是“人类目前所达到的最精确的单位实现”。

https://www.timeanddate.com/time/international-atomic-time.html ([链接备份](https://web.archive.org/web/20230215225600/https://www.timeanddate.com/time/international-atomic-time.html))

## 处理方案

Linux 内核已经给出了应对方案，使用 CLOCK_MONOTONIC_RAW 获得绝对线性增长的时间（不受 NTP 和 adjtime 影响）。

Go 的 [time 标准库](https://pkg.go.dev/time#hdr-Monotonic_Clocks)对于时间跳回也做了处理。
程序员不应该简单的用 `<`，`>` ，`==` ，减法 `-` 来度量时间，应该使用系统级或者标准库的 API 来度量时间。
当然这些 API 也必须要已经考虑到时间同步的问题。

比如 Go 是这样实现 [Time.Sub](https://github.com/golang/go/blob/1c05968c9a5d6432fc6f30196528f8f37287dd3d/src/time/time.go#L880-L907) 方法的。

### NTP

ntp 通过调整滴答频率来同步时差，如果时差超过 128 毫秒（默认值，开启 `-x` 选项会延长到 600 秒），ntp 会通过跳变时间来同步时差。

详见 [NTPD - 6.1. How NTP Operates](https://docs.ntpsec.org/latest/ntpd.html) ([链接备份](https://web.archive.org/web/20230221140704/https://docs.ntpsec.org/latest/ntpd.html))

## 闰秒机制将于 2035 年取消

国际计量大会计划将于 2035 年取消闰秒。可能会延迟到 2040 执行。

- [闰秒正式宣布取消，网友：没什么能让Linus本人同谷歌微软达成一致，除了它](https://www.qbitai.com/2022/11/39762.html) ([链接备份](https://web.archive.org/web/20221208063146/https://www.qbitai.com/2022/11/39762.html))
- [Nature - The leap second’s time is up: world votes to stop pausing clocks](https://www.nature.com/articles/d41586-022-03783-5) ([链接备份](https://archive.md/eHDGf))


[国际单位制]: https://www.wikiwand.com/zh-hans/%E5%9C%8B%E9%9A%9B%E5%96%AE%E4%BD%8D%E5%88%B6
