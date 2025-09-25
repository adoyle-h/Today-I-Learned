---
title: nixos installer
---


## 安装系统卡住

nixos installer 的安装日志如果没有不断输出 `[PYTHON JOB]` 而是不断输出 `QML Component (default slideshow) Next slide`。
说明没有新的 JOB 创建。正常来说它会不断创建 JOB 来下载文件。

一般情况就是 https://cache.nixos.org/ 在国内访问非常慢。所以需要用国内源。

```bash
sudo cp /etc/nix/nix.conf .
# 自行编辑 ./nix.conf，在 substituters= 行拆入新的源
# 选择源的时候查看一下源的更新日期，选更新日期最新的源，不然很多比较新的包会找不到，还是会回源。
sudo vim ./nix.conf
sudo unlink /etc/nix/nix.conf
sudo cp ./nix.conf /etc/nix/nix.conf
sudo systemctl restart nix-daemon.socket
```

然后正常启动 installer 程序安装系统即可。
