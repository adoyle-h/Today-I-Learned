## netns

`ip netns list` 只列出 /var/run/netns 下的 netns。

`ip netns list-id` 列出所有的 netns

`ip netns identify $$` 查询当前进程所在的 netns。

`lsns -t net` 列出所有的 netns 以及对应的进程。

`/sys/class/net` 里的网络设备指向的都是 `/sys/devices/virtual/net/`
