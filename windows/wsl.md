# Windows WSL

## BIOS 设置

使用 WSL 需要先在 BIOS 里开启 CPU 虚拟化技术（Virtualization Technology (VTx)）。

## 在 windows terminal 中 cd

C 盘: `cd /mnt/c/`， D 盘: `cd /mnt/d/`，以此类推。

## 忘记 WSL 用户密码

因为 root 用户默认是没密码的。可以先登录到 root 用户然后修改密码。

打开 power shell，然后输入 `wsl -u root`。`passwd $user` 给用户设置新密码。

## 无法 mount

可能的解决方法：

1. 在 power shell 里执行 `wsl -l -v` 看看当前 linux 系统是 wsl 1 还是 2 的。
  - 如果是 wsl 1，执行 `wsl --set-version $name 2` 把 wsl 1 转换成 2。再试试 mount。

## 修改 WSL 的 DNS 设置

详见[文章](https://blog.niekun.net/archives/1801.html) ([链接备份](https://web.archive.org/web/20231116102956/https://blog.niekun.net/archives/1801.html))。
