---
title: '如何拯救 sshd 坏了的无显示器的服务器'
created: 2025-12-30T04:37:23+0800
updated: 2025-12-30T13:43:50+0800
tags: []
---

## 场景

通常来说 ssh 是客户端连接服务器的日常通道。但是存在不少因素会导致 sshd 无法正常启动，或者客户端无法正常连接到 sshd。
比如 /etc/ssh/sshd_condig 配置错误。比如 ~/.ssh/authorized_keys 丢失公钥。比如 openssh 出问题。

我的 sshd 都设置禁止密码登录，只允许密钥登录。如果这时候，所有客户端 ssh 全部失败。能用键盘物理连接设备，但该设备没有视频输出接口，没法连接屏幕。应该怎么救援？

## 解决方法

盲打 + 反弹 shell。

1. 在有屏幕的电脑开启监听端口： `nc -lvp 8888`
1. 键盘连接服务器设备。盲打用户名和密码登录服务器。
1. 在服务器上盲打执行 `bash -i >& /dev/tcp/$REMOTE_IP/8888 0>&1`
  - REMOTE_IP 需要替换成有屏幕的电脑的 IP
1. 有屏幕的电脑看到反弹成功，就能看到服务器的命令输出了。
    - 后续在有屏幕的电脑上操作即可。（注意不要按 `Ctrl-C`，这会导致反弹 shell 中止。如果要中断命令，需要使用服务器键盘按 `Ctrl-C`）
    - 反弹 shell 有使用限制，使用 vim、nano 等编辑器在反弹的电脑上是不会回显的。
1. 启动临时用的 sshd。

    ```sh
    sudo /usr/sbin/sshd -D \
    -o Port=2222 \
    -o ListenAddress=0.0.0.0 \
    -o HostKey=/etc/ssh/ssh_host_ed25519_key \
    -o HostKey=/etc/ssh/ssh_host_ecdsa_key \
    -o HostKey=/etc/ssh/ssh_host_rsa_key \
    -o PasswordAuthentication=yes \
    -o PubkeyAuthentication=yes \
    -o AuthorizedKeysFile=.ssh/authorized_keys
    ```
1. 客户端新建 ssh 连接到服务器，接手后续救援工作。
