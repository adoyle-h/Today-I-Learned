---
title: sudo and su
created: 2020-04-14T11:00:22+0800
updated: 2020-04-14T11:00:22+0800
---


## su

`su` 输出 root 用户的密码，切换到 root 用户。

`su` 命令是当前用户用来切换到另一个用户的命令，参数为用户名。例如 `su admin`。执行时会要求输入密码，这个密码是你要切换到的用户的密码。

## sudo 忽略已有的 alias

设置 `alias sudo='sudo '` 就行了。原理解释见[这篇文章](https://archive.ph/dargq)。

## sudo su

`sudo su` 输出当前用户的密码，当前用户需要有 root 权限，切换到 root 用户。

但是线上机器一般为了安全问题会禁止非 root 用户使用 `su` 命令，可以用以下命令。

## sudo -u <user> -i

但是线上机器一般为了安全问题会禁止 `sudo /bin/bash`，所以用 `sudo bash -c` 的方法。

## sudo bash -c

这个方法适用于当前用户具备 sudo 权限，但不知道目标用户的登录密码。

- `sudo bash -c 'su - root'`
- `sudo bash -c 'su -l'`
- `sudo bash -c 'su -'`

这三行等价，意为：用 root 权限开一个 bash 进程，进程第一行命令是以 root 用户重新登录 shell，会切换到 root 的用户目录，且重置之前的环境变量。

`sudo bash -c 'su'` 只是切换成 root 用户，不会切换用户目录，也不会重置之前的环境变量。

## 编程方式输入 sudo 密码

`echo myPassword | sudo -S ls /tmp`

https://stackoverflow.com/a/4327123/4622308

## sudo, gksudo, kdesudo

> sudo stands for Super User Do. That means it provide privileges of the root/main user via terminal.
>
> gksudo and kdesudo both are also sudo thing except that first one is use for graphical sudo operation which works using GUI instead of terminal and second one is gksudo alternative for Kubuntu.
>
> And a short note from wiki
>
>> You should never use normal sudo to start graphical applications as Root.You should use
>> gksudo (kdesudo on Kubuntu) to run such programs. gksudo sets HOME=~root, and copies
>> .Xauthority to a tmp directory. This prevents files in your home directory becoming
>> owned by Root. (AFAICT, this is all that's special about the environment of the started
>> process with gksudo vs. sudo).

Reference from https://askubuntu.com/a/425644/1675926
