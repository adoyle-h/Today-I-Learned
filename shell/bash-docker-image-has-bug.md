# Bash 镜像有 bug

https://hub.docker.com/_/bash

截止目前 bash 镜像 5.2.12 与 alpine 镜像 3.16，都有这个 bug。

## 复现问题

`touch d && docker run -v $PWD/d:/d  --rm -it bash:5.2`，进入容器后执行以下代码

```sh
[[ -x /d ]]
echo $?

ls -al /d
chmod -w /d
echo $?
ls -al /d

chmod -r /d
echo $?
```

`echo $?` 会打印上一行命令的状态码 (exit status)，0 表示正常，非 0 表示错误。

你会发现三处 `echo $?` 都打印了 `0`，即 `/d` 这个文件是可执行，可写，可读的，都不符合预期。
bash 4.4~5.2 我全试过了，都是一样的结果。

而在 bash 容器里执行下面代码，

```sh
touch a
touch b
chmod +x b

[[ -x a ]]
echo $?

[[ -x b ]]
echo $?
```

结果是打印了 `1 0`，说明 a 是不可执行的，b 是可执行的，符合预期。

所以这个 BUG 只会出现在对于挂载宿主机到容器的文件的文件属性 test。

## 原因

bash 基于 alpine 镜像，但是 alpine 镜像自 3.14 起，对 [`faccessat2`](https://linux.die.net/man/2/faccessat) syscall 有了调整。
如果宿主机的 `libseccomp` 不支持 `faccessat2`，那 bash 的 `[[ -r ]]`, `[[ -w ]]`, `[[ -x ]]` 都会出问题。

详见 https://wiki.alpinelinux.org/wiki/Release_Notes_for_Alpine_3.14.0#faccessat2 ，它也提供了一些解决方法，虽然很鸡肋。

https://github.com/alpinelinux/docker-alpine/issues/156 这楼里的一些问题我测试了，没有复现问题。

### faccessat 的作用

> faccessat - check user's permissions of a file relative to a directory file descriptor

https://linux.die.net/man/2/faccessat
https://man.archlinux.org/man/faccessat2.2.en
