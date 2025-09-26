---
title: unshare 命令
created: 2023-03-30T20:30:44+0800
updated: 2023-03-30T20:30:44+0800
---


```sh
$ unshare --user --map-root-user --net --mount
$ echo $$
2646
$ strace -f slirp4netns --configure --mtu=65520 2646 tap0
```

https://mcastelino.medium.com/slirp4netns-how-does-it-work-5c0bd31200ce
