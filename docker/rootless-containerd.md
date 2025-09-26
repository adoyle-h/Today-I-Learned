---
title: rootless containerd
created: 2023-06-26T01:18:37+0800
updated: 2023-06-26T01:18:37+0800
---


## 安装

安装步骤

1. https://rootlesscontaine.rs/getting-started/common/
2. https://rootlesscontaine.rs/getting-started/containerd/

对于 arch linux 用户：

1. 不必安装 dbus-user-session，直接 `systemctl --user enable --now dbus` 启动即可，可以忽略 unit 缺少 `[Install] WantedBy=multi-user.target` 的提示。
2. 需要安装 `sudo pacman -S rootlesskit slirp4netns`

装好后[修改 containerd 的 registry 镜像](./containerd.md#镜像加速)。（需要注意修改的配置文件路径不同，见下文）

## 配置

rootless containerd 进程的配置不使用 `/etc/containerd/config.toml`，而是使用 `${XDG_CONFIG_HOME}/containerd`。（详见 containerd-rootless.sh，它有一行 `mount --bind "${XDG_CONFIG_HOME}/containerd" "/etc/containerd"`）

因此创建默认配置文件需要这样 `containerd config default > ~/.config/containerd/config.toml`。

## 容器内的非 root 用户没权限读写 volume 文件

有些镜像会修改默认用户，这会导致容器内读写宿主机的 volume 文件时报错没权限。
这是因为 uid/gid 映射到宿主机上不是宿主机用户的 uid/gid。有的时候它的 UID 会是 100999。

据我实测，容器内 uid 与宿主机 uid 的映射关系：

| 容器内 uid   | 宿主机 uid |
| ------------ | -----      |
| 1000         | 100999     |
| 1100         | 101099     |
| 9999         | 109998     |

宿主机 uid = 容器内 uid + 100000 -1

### 解决方法

将容器 uid 和 gid 都置为 0，表示 root 用户。`docker run -u 0:0 image cmd`。

如果用 compose.yaml，则在 service 下设置 `user: 0:0`。参考 [schema/compose-spec.json](https://github.com/compose-spec/compose-spec/blob/d958c4e3678bbd9aaa4b8368110f47d6d60f123e/schema/compose-spec.json#L362)。

