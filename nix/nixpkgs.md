---
title: nixpkgs
---


## 查找包名

几种方法。

1. 官方: https://search.nixos.org/packages
2. 非官方: https://history.nix-packages.com/
3. 在 nixpkgs 源码 [`pkgs/top-level/all-packages.nix`](https://github.com/NixOS/nixpkgs/blob/master/pkgs/top-level/all-packages.nix)，可以看到所有包名。

## 查找某个包的历史版本

devbox 推出了 https://www.nixhub.io/ 搜索服务。

## 在 nix 配置中将旧软件包与最新的 nixpkgs 一起使用

三种解决方案：

1. 同时使用不同版本的 nixpkgs。
2. 使用 [overlay](https://nixos.wiki/wiki/Overlays)。
3. 用 overrideAttrs 覆盖 nixpkgs 的包属性。

具体参考[这篇文章](https://blog.mplanchard.com/posts/installing-a-specific-version-of-a-package-with-nix.html)。

## nixpkgs 的包 sha256 与官方包提供的不一致

因为这个 hash 是 nix derivation 的计算结果，不是包文件的 hash。

> The fact that the hash belongs to the Nix derivation output and not the file itself can lead to confusion.

详见 [doc/builders/fetchers.chapter.md](https://github.com/NixOS/nixpkgs/blob/23.05/doc/builders/fetchers.chapter.md)。
