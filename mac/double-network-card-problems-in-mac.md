---
title: 多网卡在 Mac 系统的问题
---


当前是这样

```
> ip route
default via 30.5.104.1 dev en0
30.5.104.0/21 dev en0  scope link
30.5.104.1/32 dev en0  scope link
30.5.109.155/32 dev en0  scope link
127.0.0.0/8 via 127.0.0.1 dev lo0
169.254.0.0/16 dev en6  scope link
169.254.0.0/16 dev en0  scope link
198.18.0.0/16 dev en6  scope link
198.18.166.54/32 dev en6  scope link
198.18.255.252/32 dev en6  scope link
224.0.0.0/4 dev en6  scope link
224.0.0.0/4 dev en0  scope link
255.255.255.255/32 dev en6  scope link
255.255.255.255/32 dev en0  scope link
```

预期是这样，注意 en0 和 en6。

```
> ip route
default via 30.5.104.1 dev en0
default via 198.18.255.252 dev en6
30.5.104.0/21 dev en0  scope link
30.5.104.1/32 dev en0  scope link
30.5.109.155/32 dev en0  scope link
127.0.0.0/8 via 127.0.0.1 dev lo0
169.254.0.0/16 dev en0  scope link
169.254.0.0/16 dev en6  scope link
198.18.0.0/16 dev en6  scope link
198.18.166.54/32 dev en6  scope link
198.18.255.252/32 dev en6  scope link
224.0.0.0/4 dev en0  scope link
224.0.0.0/4 dev en6  scope link
255.255.255.255/32 dev en0  scope link
255.255.255.255/32 dev en6  scope link
```

> 进入系统偏好设置，网络，左下角的齿轮，更改服务顺序，拖动wifi到有线网卡上面就可以了

参考这篇文章 https://www.jianshu.com/p/807883b2949f
