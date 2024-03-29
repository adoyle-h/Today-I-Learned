# systemd


![Systemd 架构图](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016030703.png)

- https://github.com/systemd/systemd
- https://systemd.io/
- https://www.freedesktop.org/wiki/Software/systemd/
- [阮一峰 - Systemd 入门教程：命令篇](https://web.archive.org/web/20230216005229/https://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html)
- https://wiki.archlinux.org/index.php/Systemd_(简体中文)

## 常用命令

- `systemd-escape` 转义与还原字符串。[转义规则](https://www.jinbuguo.com/systemd/systemd.unit.html#%E5%8D%95%E5%85%83%E5%90%8D%E7%A7%B0%E4%B8%AD%E7%9A%84%E5%AD%97%E7%AC%A6%E8%BD%AC%E4%B9%89)。

## systemdctl

systemctl 命令操作 systemd 来管理服务，取代了 systemV 的service、chkconfig、setup、init 等指令。

- `systemctl` 或 `systemctl list-units` 列出所有启动的 unit。它不按启动顺序排序。
- `systemctl list-units --failed` 列出启动失败的 unit。
- `systemctl list-unit-files` 列出所有 unit。
- `systemctl list-dependencies` 查某个 unit 依赖的 unit，也可以用 `systemctl list-dependencies --reverse` 查某个 unit 被谁依赖。
- `systemctl list-sockets` 查看服务监听的 socket 文件。

懒得列举，具体查 man 手册。

## systemd unit 配置搜索路径

`man systemd.unit`

优先级从高到低：

- System Unit 搜索路径

  - /etc/systemd/system.control/*
  - /run/systemd/system.control/*
  - /run/systemd/transient/*
  - /run/systemd/generator.early/*
  - /etc/systemd/system/*                     系统管理员设置的 unit 配置
  - /etc/systemd/system.attached/*
  - /run/systemd/system/*
  - /run/systemd/system.attached/*
  - /run/systemd/generator/*
  - ...
  - /usr/lib/systemd/system/*                 软件安装包设置的 unit 配置
  - /run/systemd/generator.late/*

- User Unit 搜索路径

  - ~/.config/systemd/user.control/*
  - $XDG_RUNTIME_DIR/systemd/user.control/*
  - $XDG_RUNTIME_DIR/systemd/transient/*
  - $XDG_RUNTIME_DIR/systemd/generator.early/*
  - ~/.config/systemd/user/*                  用户级 unit 配置
  - $XDG_CONFIG_DIRS/systemd/user/*
  - /etc/systemd/user/*
  - $XDG_RUNTIME_DIR/systemd/user/*
  - /run/systemd/user/*
  - $XDG_RUNTIME_DIR/systemd/generator/*
  - $XDG_DATA_HOME/systemd/user/*
  - $XDG_DATA_DIRS/systemd/user/*
  - ...
  - /usr/lib/systemd/user/*
  - $XDG_RUNTIME_DIR/systemd/generator.late/*

可以通过 `systemctl show -p UnitPath` 看到每个 unit 的配置搜索路径。

对于 `foo-bar-baz.service` unit，配置搜索路径依次是:

0. `foo-bar-baz.service`
1. `foo-.service.d/*.conf`
2. `foo-bar-.service.d/*.conf`
3. `foo-bar-baz.service.d/*.conf`

在每个目录下搜索所有以 `.conf` 文件名结尾的文件。然后按照文件名的字典顺序，依次解析、合并配置。(注意：这里的合并不是覆盖，而是添加到末尾)

`foo-`, `foo-bar-`, `foo-bar-baz` 机制可以方便的为一组相关单元 (单元名称的前缀都相同) 定义共同的单元配置片段。特别适合应用于 mount, automount, slice 类型的单元，因为这些单元的命名规则就是基于连字符构建的。
注意，在前缀层次结构的下层目录中的单元配置片段，会覆盖上层目录中的同名文件，也就是 `foo-bar-.service.d/override.conf` 会覆盖 (取代) `foo-.service.d/override.conf` 文件。

### 自定义 unit

针对所有用户的 unit 文件放在 `/etc/systemd/system`。
针对当前用户的 unit 文件放在 `~/.config/systemd/user`。

## 显示 unit 配置

`systemctl cat <unit>` 会展示合并后的最终配置。

## 编辑 unit 配置

通过包管理器安装的服务，不建议直接修改包中的文件。因为当用包管理器更新服务版本。有可能会覆盖 unit 配置。

正确的做法是使用 `systemctl edit <unit>` 命令。它会创建 `<unit>.service.d/override.conf` 文件。并不会修改原本的 `<unit>.service` 文件。用户在 override.conf 填入的配置，会和 `<unit>.service` 的配置合并。

如果是编辑用户自己写的 unit。可以使用 `systemctl edit --full <unit>`。`--full` 参数会直接编辑配置文件，而不是以 override 方式编辑。

如果执行 `sudo systemctl edit` 使用了 nano 编辑器。可以 `sudo EDITOR=vim systemctl edit` 来切换成 vim 编辑器。

当修改 unit 配置，尤其是修改了依赖关系。必须执行 `systemctl daemon-reload` 来更新。

> daemon-reload
> Reload systemd manager configuration. This will rerun all generators (see systemd.generator(7)), reload all unit files, and recreate the entire dependency tree. While the daemon is being reloaded, all sockets systemd listens on behalf of user configuration will stay accessible.

## Service has more than one ExecStart= setting

比如你可能修改完后看到 `Service has more than one ExecStart= setting` 的报错。
这是系统默认的 `.service` 配置中已有 `ExecStart=`，而你新增的 `override.conf` 也存在合并多个 .conf 文件

解决方法是在 `ExecStart=` 之前额外加一行 `ExecStart=`，清空之前的设置。比如

```
[Service]
Type=simple
User=root
ExecStart=
ExecStart=echo 1
```

## 开机自启动服务

`systemctl start` 不会自启动服务，需要通过 `systemctl enable` 设置。

## 用户级 systemd

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

## systemd status 显示 State: degraded

`State: degraded` 代表有启动失败的 unit。使用 `systemctl --failed` 查看。修复后会看到 `State: running` 代表正常。

## journalctl

> journalctl 用来查询 systemd-journald 服务收集到的日志。systemd-journald 服务是 systemd init 系统提供的收集系统日志的服务。

- https://www.cnblogs.com/sparkdev/p/8795141.html ([链接备份](https://web.archive.org/web/20221005002121/https://www.cnblogs.com/sparkdev/p/8795141.html))

### 不加 sudo 使用 journalctl

1. 执行 `sudo usermod -aG systemd-journal $USER`。
2. 重新登录终端会话。

## systemd-analyze

查看最耗时的 unit `systemd-analyze blame` 或 `systemd-analyze critical-chain [unit]`

查看启动顺序和时间 `systemd-analyze plot --order > systemd-startup.svg`

检查配置是否有问题 `systemd-analyze verify default.target`

## 常用的 systemd unit

- [systemd-timesyncd](./systemd-timesyncd.md)

## systemd-run


## ExecStartEx=

用 `systemctl show` 会看到有行 `ExecStartEx=` 配置。在 man 手册和官方文档里都找不到 `ExecStartEx` 的解释。只有 [systemd 源码](https://github.com/systemd/systemd/blob/4e17de7feed093ddaebd4fe2cd8a2ad8f0e03d76/src/run/run.c#L1063)中有这样的注释:

> /* We disable environment expansion on the server side via ExecStartEx=:.
>  * ExecStartEx was added relatively recently (v243), and some bugs were fixed only later.
>  * So use that feature only if required. It will fail with older systemds. */

所以 `ExecStartEx` 与 `ExecStart` 的区别是前者禁止环境变量展开。而且这配置是在 systemd v243 版本（2019 年 9 月 3 日）上线的。
