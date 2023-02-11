---
tags: [init]
---
## runit

[runit](http://smarden.org/runit/) 是一个 init 服务管理工具。类似于 systemd 的简单版。
它可运行在 Linux、Mac OS X、BSD 和 Solaris 等类 UNIX 操作系统上。

### 程序构成

- `runsvdir`：每 5 秒扫描一次目录。如果有新的子目录，它会自动创建一个 `runsv` 进程来维护 service。
- `runsv`：用于管理 service 的 daemon 进程，可以通过 `sv` 命令来操作 service。
- `sv`：用户操作 service 用的 CLI 工具。
- `svlogd`：用于收集 service 日志的 daemon 进程。每个 service 都会启动一个 svlogd 进程。

### 以 sshd 为例

#### 启动 runsvdir

这通常安装 runit 后，系统配置就自动配置好启动了，不用用户手动启动。

启动方法：`runsvdir /usr/var/service`。于是监听 `/usr/var/service` 下的子目录。

不一定必须是 `/usr/var/service`，也可以是 `/etc/service` 之类的，自己定。
以下都是 `/usr/var/service` 目录为例讲解。

#### 创建一个 sshd service

```sh
# 创建 sshd service 进程
$ mkdir -p /usr/var/service/sshd
$ cat <<EOF > /usr/var/service/sshd/run
#!/usr/bin/sh
exec sshd -D -e #2>&1
EOF
$ chmod +x /usr/var/service/sshd/run
```

这样就会 runsvdir 就会自动创建进程 `runsv sshd`。
sshd 的服务目录会自动创建目录 `/usr/var/service/sshd/supervise`。

```sh
# 创建 sshd service 的日志收集进程。如果不想收集日志，不创建 log/run 就行。
$ mkdir -p /usr/var/service/sshd/log/run
$ cat <<EOF > /usr/var/service/sshd/log/run
#!/usr/bin/sh
# Get the name of the service from the PWD, this assumes the name of the
# service is one level above the log directory.
pwd=${PWD%/*} # $SVDIR/service/foo/log
service=${pwd##*/} # foo

mkdir -p "$LOGDIR/sv/$service"

exec svlogd -tt "$LOGDIR/sv/$service"
EOF
$ chmod +x /usr/var/service/sshd/log/run
```

这样就会 runsvdir 就会自动创建进程 `svlogd -tt /usr/var/log/sv/sshd` 。

#### 目录结构

最后目录结构会是这样。

```
$ tree /usr/var/service/sshd/
/usr/var/service/sshd/
├── down
├── finish
├── log
│   ├── run
│   └── supervise
│       ├── control
│       ├── lock
│       ├── ok
│       ├── pid
│       ├── stat
│       └── status
├── run
└── supervise
    ├── control
    ├── lock
    ├── ok
    ├── pid
    ├── stat
    └── status
```

down 文件是一个空的纯文本，调用 `sv disable sshd` 就会创建。
down 文件存在则代表 sshd 服务不自启动，不存在则自启动。

finish 文件的作用看下文。

#### 服务操作

- `sv status sshd` 查看服务状态
- `sv enable sshd` 启动服务，且设置服务自启动
- `sv up sshd` 启动服务，且不设置服务自启动
- `sv start sshd` 启动服务，跟 up 一样
- `sv restart sshd` 重启服务
- `sv down sshd` 关闭服务
- `sv stop sshd` 关闭服务，跟 down 一样
- `sv disable sshd` 关闭服务，设置服务不自启动

具体看 `man sv`。

#### 启动服务

```sh
# 查看 sshd 进程有没有创建
$ sv status sshd

# 如果这么显示：run: sshd: (pid 6491) 1929s, normally down; run: log: (pid 7780) 1338s
# run: sshd: (pid 6491) 1929s 代表 sshd 进程正在运行
# normally down 或者没有 normally 字段则表示不自启动；normally up 表示会自启动
# run: log: (pid 7780) 1338s 代表 sshd 进程的日志收集进程正在运行

# 如果这么显示：down: sshd: 32458s, normally down; run: log: (pid 17083) 32458s
# down: sshd: 32458s 代表 sshd 进程没在运行
# run: log: (pid 17083) sshd 进程的日志收集进程正在运行
```

如果没有启动就手动启动吧。

#### 查看日志

日志目录得看环境变量 `LOGDIR` 的值。

`tail -f /usr/var/log/sv/sshd/current`

#### finish 脚本

当关闭服务时，会自动触发 finish 脚本（如果文件存在的话）。

由于 sshd 有个[坑](./sshd--R.md)。需要设置清理脚本来回收子进程。于是可以这么做。

```sh
$ cat <<EOF > /usr/var/service/sshd/finish
pkill sshd
EOF
$ chmod +x /usr/var/service/sshd/finish
```


### service run 脚本例子

http://smarden.org/runit/runscripts.html
