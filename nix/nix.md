---
title: Nix
created: 2025-09-25T21:00:12+0800
updated: 2025-09-25T21:00:12+0800
---

## 软件源
### nix-channels

在 Nix 中，channel 是一个指向特定版本的 Nix Packages（nixpkgs）仓库的引用。每个 channel 指向一个 Git 提交或分支，例如：

- https://nixos.org/channels/nixpkgs-unstable
- https://nixos.org/channels/nixos-23.11

每个 channel 都会定期更新，你可以通过它来安装或升级软件包。

### channel 与 nix-env 的关系
nix-env 默认使用名为 nixpkgs 的 channel 来查找软件包。

如果你没有配置 channel，nix-env 就无法安装大多数常规软件包。

channel 更新后不会自动生效，需要你手动运行 nix-channel --update。

### nix flakes 与 nixpkgs
如果你在使用 flakes，那么 channel 就不是必须的了。flakes 提供了更现代、更可重复的依赖管理方式。你可以通过在 flake.nix 中直接指定包来源和版本来替代 channel。


| 方式                               | 是否使用 Flakes | 使用的源                               |
| -------------------------------- | ----------- | ---------------------------------- |
| `nix shell nixpkgs#pkg`          | ✅ 是         | 默认使用 flakes 中的 `nixpkgs`（GitHub）   |
| `nix shell github:user/repo#pkg` | ✅ 是         | 指定的 flakes 源                       |
| `nix-shell -p pkg`               | ❌ 否         | 当前用户配置的 `nix-channel` 中的 `nixpkgs` |
| `nix shell ./path/to/flake#pkg`  | ✅ 是         | 本地 flake 中指定的依赖源                   |


如果你想知道某个 shell 用的是哪个 nixpkgs 源，可以加上 --verbose 或 --show-trace 看下载信息。

编辑 `/etc/nix/nix.conf` 文件，加入这行 `experimental-features = nix-command flakes`。

### nix profile

profile 是一个 Nix 环境的软链接目录，记录你安装过的软件包的路径。

它本质上是一个 ~/.nix-profile 的符号链接，指向 `/nix/var/nix/profiles/per-user/$USER/profile-N-link` 这样的实际路径。


| 类型                | 路径                                      |
| ----------------- | --------------------------------------- |
| 当前用户的 profile     | `~/.nix-profile`                        |
| 所有用户的 profiles 存档 | `/nix/var/nix/profiles/per-user/$USER/` |
| root 用户的 profile  | `/nix/var/nix/profiles/default`         |


flakes 更提倡声明式配置（比如 [home-manager](https://github.com/nix-community/home-manager)、[nix-darwin](https://github.com/nix-darwin/nix-darwin)）。profile 会被 flakes 自动维护，无须手动维护。

### 中国镜像

绕过中国 GFW 的限制。

1. 使用镜像
2. 使用 http 代理


1. 设置 `export NIXPKGS_GITHUB_PROXY=https://ghfast.top` 修改 nixpkgs 的源。
2. 默认情况下，Nix 从 https://cache.nixos.org 下载编译好的二进制包，修改 /etc/nix/nix.conf 改为中国镜像：

  ```
  substituters = https://mirrors.tuna.tsinghua.edu.cn/nix-channels/store https://cache.nixos.org/
  trusted-public-keys = nix-cache.spkle.net-1:JU7WLk... cache.nixos.org-1:...
  ```

  - substituters: 它是一个字符串数组，每个字符串都是一个缓存服务器的地址，Nix 会按照数组中的顺序依次尝试从这些服务器中查找缓存。
  - trusted-public-keys: 为了防范恶意攻击，Nix 默认启用 [require-sigs](https://nixos.org/manual/nix/stable/command-ref/conf-file#conf-require-sigs) 功能，只有附带了签名、且签名能被 trusted-public-keys 中的任意一个公钥验证通过的缓存，才会被 Nix 使用。因此我们需要将 substituters 对应的公钥添加到 trusted-public-keys 中。

  国内的镜像源都是直接从官方缓存服务器中同步的，因此它们的公钥与官方缓存服务器的公钥是一致的，我们可以直接使用官方缓存服务器的公钥，无需额外配置。
  这种完全依赖公钥机制的验证方式，实际是将安全责任转嫁给了用户。用户如果希望使用某个第三方库，但又希望使用它的第三方缓存服务器加快构建速度，那就必须自己承担对应的安全风险，自行决策是否将该缓存服务器的公钥添加进 trusted-public-keys。为了完全解决这个信任问题，Nix 推出了实验特性 [ca-derivations](https://wiki.nixos.org/wiki/Ca-derivations)，它不依赖 trusted-public-keys 进行签名校验，有兴趣的可以自行了解。

可通过如下几种方式来配置 substituters trusted-public-keys 两个参数：

1. 在 /etc/nix/nix.conf 中配置，这是全局配置，对所有用户生效。
1. 在 flake 项目的 flake.nix 中通过 `nixConfig.substituters` 来配置，此配置仅对当前 flake 生效。
1. 可通过 nix 指令的 `--option substituters="http://xxx"` 参数来临时设定，此配置仅对当前指令生效。


```sh
mkdir -p nixos-config && cd nixos-config
nix flake --extra-experimental-features 'nix-command flakes' init -t github:dustinlyons/nixos-config#starter-with-secrets
nix flake init -t github:dustinlyons/nixos-config#starter-with-secrets
```
