# 学习 Nix

## [nix flake](./flake.md)

## [nixpkgs](./nixpkgs.md)

## 搜索

1. [nixpkgs 搜索](https://search.nixos.org/packages)
2. 某个包的历史版本号: https://www.nixhub.io/
3. [home-manger 配置项](https://mipmip.github.io/home-manager-option-search/)。[源码](https://github.com/mipmip/home-manager-option-search)
4. [nix-darwin 配置项](https://daiderd.com/nix-darwin/manual/index.html)

## binary cache 镜像源

binary cache 默认用的是 https://cache.nixos.org ，在国内访问很慢。需要替换成镜像源，以[中科大源](https://mirrors.ustc.edu.cn/help/nix-channels.html)为例。

注意点:

1. `binaryCaches` 选项在最新版本的 nix 已弃用，请使用 `substituters`。
2. `https://cache.nixos.org` 会自动添加到列表，无须用户自己写上。
3. `substituters` 配置只适用于 root 用户，非 root 用户会提示 `ignoring untrusted substituter '...', you are not a trusted user.`。

解决方法：

1. 如果你使用 `nix.conf`，用 [`trusted-substituters`](https://nixos.org/manual/nix/stable/command-ref/conf-file#conf-trusted-substituters) 代替 `substituters`。
  - `trusted-substituters = https://mirrors.ustc.edu.cn/nix-channels/store`
2. 如果你使用 nix flake，用 `nix.settings.trusted-substituters` 替换 `nix.settings.substituters`。
  - `nix.settings.trusted-substituters = ["https://mirrors.ustc.edu.cn/nix-channels/store"];`

## flake.nix 报错 error: expected a ... but got a thunk

原因：flake.nix 不是完整的 nix 语言。某些情况使用 import 语法会报这个错。详见 https://github.com/NixOS/nix/issues/4945

## Format Code

目前社区有三种 formatter

- [nixpkgs-fmt](https://github.com/nix-community/nixpkgs-fmt)
- [nixfmt](https://github.com/serokell/nixfmt)
- [alejandra](https://github.com/kamadorueda/alejandra)

具体使用方法见 https://nixos.org/manual/nix/stable/command-ref/new-cli/nix3-fmt

我选择 alejandra 的[原因](https://discourse.nixos.org/t/the-uncompromising-nix-code-formatter/17385/3)。

## bashInteractive vs bash

nixpkgs 有两个包：bashInteractive 和 bash。它们的区别是：

- bashInteractive = 带 Readline 功能的 bash。
- bash = 没有 Readline 功能的 bash。

一般用户应该选用 bashInteractive。快捷键功能才能正常使用。

参考 [Issue](https://github.com/NixOS/nixpkgs/issues/59209)。
