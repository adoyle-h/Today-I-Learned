---
title: 用户登录与 passwd
---


当 `/etc/passwd` 显示某个用户 `/sbin/nologin` 或者 `/bin/false`，这个用户就不能登录了。

使用 `usermod -s /bin/bash $user` 或者 `chsh -s /bin/bash $user` 来把 shell 绑定给用户。这样用户就能正常登录了。注意 `/bin/bash` 只是个例子，你要自己确认当前主机支持哪些 shell，以及 shell 程序的真实路径。

如果当前主机没有 `usermod` 或 `chsh` 命令，你可以直接编辑 `/etc/passwd` 文件，把 `/sbin/nologin` 改成对应的 shell 就行了。

比如在 docker 容器中，你看 `/etc/passwd` 会发现都是 `root:x:0:0:root:/root:/sbin/nologin`。那为什么我还能用 `docker exec` 登录到容器？因为 docker exec 实际上没有登录用户，只是运行了一个进程罢了。

## passwd 命令

- `passwd -d $user` 用户密码重置为空。
- `passwd -l $user` 锁定用户，禁止它登录。
- `passwd -u $user` 解锁用户。
- `passwd --status $user` 查看用户状态。这个参数不是每个 passwd 程序都支持。
- `touch /etc/nologin`，除 root 以外的用户就不能登录了。
