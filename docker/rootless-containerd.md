# rootless containerd

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
