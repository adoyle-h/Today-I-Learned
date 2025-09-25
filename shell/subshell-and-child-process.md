---
title: Bash 的 subshell 与子进程
tags: [bash, bash-tricks, subshell]
---


subshell 也是子进程，区别在于 subshell 继承父进程的变量，而子进程只能继承父进程 export 的变量。

```sh
unset -v a; a=1
unset -v b; export b=2
(echo "in subshell: a=$a b=$b")
sh -c 'echo "in the child shell: a=$a b=$b"'
```

输出结果是

```
in subshell: a=1 b=2
in the child shell: a= b=2
```

参考 https://mywiki.wooledge.org/SubShell

## subshell 与子进程都无法修改父进程的变量

```sh
k=(1 2 3)
( echo "${k[@]}" )         # print 1 2 3
( k[0]=4; echo "${k[@]}" ) # print 4 2 3
echo "${k[@]}"             # print 1 2 3

a=1
( a=2 )
echo $a  # print 1
```

## 创建 subshell 的方法

- `(cmd)`
- `cmd1 | cmd2`
- `$(cmd)` 或 `` `cmd` ``
- `cmd &`
- `<(cmd) or >(cmd)`

## 创建子进程的方法

在 shell script 里直接执行程序。
