---
title: teleport
---


开源跳板机。https://goteleport.com/

## Node failed to establish connection to cluster

在加入新节点时如果失败。查看日志 `journalctl -fu teleport`。

如果有一条 `tls: failed to verify certificate: x509: certificate signed by unknown authority`。
说明你的 teleport proxy service 用的是自签名证书。新节点的 teleport 服务的启动命令需要给 teleport start 加上 `--insecure` 参数。

如果用 systemd 启动 teleport，则编辑 `/lib/systemd/system/teleport.service` 文件。

```sh
ExecStart=/usr/local/bin/teleport start --insecure --pid-file=/run/teleport.pid
```

## 使用自签名时，add server 脚本要加上 -k 参数

比如 `sudo bash -c "$(curl -fsSL https://local:3080/scripts/3105233160f350708e38c842333fdd63/install-node.sh)"`
要改成 `sudo bash -c "$(curl -fsSLk https://local:3080/scripts/3105233160f350708e38c842333fdd63/install-node.sh)"`

## teleport 跑在容器里，如何把宿主机加入新节点？

1. 用包管理器安装 teleport。
2. 创建 /etc/teleport.yaml 文件。

    ```
    version: v3
    teleport:
      nodename: node1
      data_dir: /var/lib/teleport
      join_params:
        # token_name 就是 add server 脚本的 url 里的字符串
        token_name: 3105233160f350708e38c842333fdd63
        method: token
      proxy_server: local:3080
      log:
        output: stderr
        severity: INFO
        format:
          output: text
      ca_pin: sha256:28a6793f609fe12fac9f35801cfef24716ab6983c78ec05dd1e296449a95bff0
      diag_addr: ""
    auth_service:
      enabled: "no"
    ssh_service:
      enabled: "yes"
      commands:
      - name: hostname
        command: [hostname]
        period: 1m0s
    proxy_service:
      enabled: "no"
      https_keypairs: []
      https_keypairs_reload_interval: 0s
      acme: {}
    ```

3. 重启 teleport 服务。`journalctl -fu teleport` 查看日志。查看 server 列表是否加入新节点。

## 安卓无法使用 tsh

目前 termux 的包是很古老的 11.0.3 版本。而官方 teleport 的都出到 13 了。两者不兼容。
（等这个 [PR](https://github.com/termux/termux-packages/pull/17852/files) 合并后应该就没问题了）

因此需要自己源码编译 tsh。如果在非安卓的平台编译，首先要[安装 NDK](../go/cgo-build-for-android.md)。

但是 teleport 有行代码用了 GNU libc，而安卓使用的是 Bionic libc。所以编译会失败。
解决方法是把那行代码改了，详见 https://github.com/gravitational/teleport/discussions/31481#discussioncomment-7050191
