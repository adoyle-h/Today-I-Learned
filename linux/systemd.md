## systemd

![Systemd 架构图](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016030703.png)

- https://github.com/systemd/systemd
- https://www.freedesktop.org/wiki/Software/systemd/
- [阮一峰 - Systemd 入门教程：命令篇](http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html)
- https://wiki.archlinux.org/index.php/Systemd_(简体中文)

### systemdctl

systemctl 命令操作 systemd 来管理服务，取代了 systemV 的service、chkconfig、setup、init 等指令。

- `systemctl` 或 `systemctl list-units` 列出已知的服务
- `systemctl list-dependencies` 查某个服务依赖的服务，也可以用 `systemctl list-dependencies --reverse` 查某个服务被谁依赖。
- `systemctl list-sockets` 查看服务监听的 socket 文件。

懒得列举，具体查 man 手册。

### systemd unit 配置加载路径

优先级从低到高

- /usr/lib/systemd/system/ 软件安装包设置的 unit 配置
- /etc/systemd/system/     系统管理员设置的 unit 配置

可以通过 `systemctl show --property=UnitPath` 看到每个 unit 的配置路径

### 开机自启动服务

`systemctl start` 不会自启动服务，需要通过 `systemctl enable` 设置。

### 用户级 systemd

`systemctl --user` 会以当前用户单独启动 systemd 进程。这个进程与系统的 systemd 进程互不相干。

```sh
adoyle    926413       1  0 15:08 ?        00:00:00 /lib/systemd/systemd --user
adoyle    926414  926413  0 15:08 ?        00:00:00 (sd-pam)
```

即使当前账户登出了，这个 systemd 进程也不会退出。
可以用 `systemctl --user exit` 来退出这个进程。这不会导致关机。

用户的服务可以在以下目录找到(按优先级从低到高排序）：

- `/usr/lib/systemd/user/` 这里存放的是各个软件包安装的服务。
- `~/.local/share/systemd/user/` 这里存放的是HOME目录中已安装的软件包的单元。
- `/etc/systemd/user/` 这里存放的是由系统管理员维护的系统范围的用户服务。
- `~/.config/systemd/user/` 这里存放的是用户自身的服务。

从 systemd 226 版本开始，`/etc/pam.d/system-login` 默认配置中的 `pam_systemd` 模块会在用户首次登录的时候, 自动运行一个 `systemd --user` 实例。
只要用户还有会话存在，这个进程就不会退出；
用户所有会话退出时，进程将会被销毁。

当设置 `loginctl enable-linger $username` 随系统自动启动 systemd 用户实例启用时, 这个用户实例将在系统启动时加载，并且不会被销毁。systemd 用户实例负责管理用户服务。

参考 https://wiki.archlinux.org/title/Systemd_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)/User_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E9%9A%8F%E7%B3%BB%E7%BB%9F%E8%87%AA%E5%8A%A8%E5%90%AF%E5%8A%A8_systemd_%E7%94%A8%E6%88%B7%E5%AE%9E%E4%BE%8B

### journalctl

> journalctl 用来查询 systemd-journald 服务收集到的日志。systemd-journald 服务是 systemd init 系统提供的收集系统日志的服务。

- https://www.cnblogs.com/sparkdev/p/8795141.html

### systemd-analyze

查看启动顺序和时间 `systemd-analyze plot --order > systemd-startup.svg`
