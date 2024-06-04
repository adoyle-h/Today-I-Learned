# 在 arch linux 中升级 curl 碰到的问题

用 `sudo pacman -S curl` 升级了 curl，结果 curl 用不了了。
`curl: /usr/lib/libssl.so.3: version 'OPENSSL_3.2.0' not found (required by /usr/lib/libcurl.so.4)`

pacman 居然只更新了 curl，没有更新 openssl。

这下不光是 curl 不能用，所有依赖 libcurl 的软件全用不了，包括包管理器... pacman 每次执行都报错：
`pacman: /usr/lib/libssl.so.3: version 'OPENSSL_3.2.0' not found (required by /usr/lib/libcurl.so.4)`

## 解决方法

手动安装最新的 openssl 包。

用别的电脑去 arch linux 包网站下载最新的 [openssl 包](https://archlinux.org/packages/core/x86_64/openssl/)，例如 openssl-3.3.0-1-x86_64.pkg.tar.zst。
然后解压缩并且 scp 到出问题的机器。

```sh
unzstd ./openssl-3.3.0-1-x86_64.pkg.tar.zst
scp ./openssl-3.3.0-1-x86_64.pkg.tar remote:~
sudo tar -xvf ./openssl-3.3.0-1-x86_64.pkg.tar -C /
```

完成。
