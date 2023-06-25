# systemd-timesyncd

systemd-timesyncd 是一个用于跨网络同步系统时钟的守护服务。类似 ntpd。

https://wiki.archlinuxcn.org/zh-hans/Systemd-timesyncd

执行 `timedatectl` 或者 `timedatectl status` 查看状态。
如果时间没对齐并且 `System clock synchronized: no`。执行 `timedatectl set-ntp true` 来同步时间。
`timedatectl timesync-status` 可以显示更详细的信息。

## /etc/systemd/timesyncd.conf

```
#  This file is part of systemd.
#
#  systemd is free software; you can redistribute it and/or modify it
#  under the terms of the GNU Lesser General Public License as published by
#  the Free Software Foundation; either version 2.1 of the License, or
#  (at your option) any later version.
#
# Entries in this file show the compile time defaults.
# You can change settings by editing this file.
# Defaults can be restored by simply deleting this file.
#
# See timesyncd.conf(5) for details.

[Time]
NTP=ntp1.aliyun.com time1.cloud.tencent.com
#FallbackNTP=0.debian.pool.ntp.org 1.debian.pool.ntp.org 2.debian.pool.ntp.org 3.debian.pool.ntp.org
#RootDistanceMaxSec=5
#PollIntervalMinSec=32
#PollIntervalMaxSec=2048
```
