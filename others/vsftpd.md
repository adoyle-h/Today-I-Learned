---
title: vsftpd
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## Couldn't open /etc/ftpusers

在 Linux 系统安装 vsftpd，会默认使用 PAM 用于访问控制。

查看 vsftpd 在 PAM 的配置。

```sh
$ cat /etc/pam.d/vsftpd
#%PAM-1.0
auth       required     /lib/security/pam_listfile.so item=user sense=deny file=/etc/ftpusers onerr=succeed
auth       required     /lib/security/pam_unix.so shadow nullok
auth       required     /lib/security/pam_shells.so
account    required     /lib/security/pam_unix.so
session    required     /lib/security/pam_unix.so
```

`/lib/security/pam_listfile.so item=user sense=deny file=/etc/ftpusers` 表示 [pam_listfile](https://linux.die.net/man/8/pam_listfile) 模块会拒绝 `file=/etc/ftpusers` 里列的用户名访问 ftp 服务。

查看你的机器上是否有 /etc/ftpusers 文件，如果没有，自己创建一个空文件就行了。

## 登录成功，但是 ls 就断开链接

在服务端查看系统日志。`journalctl -f` 会发现 vsftpd 报错 core dump 了。

```
Nov 03 12:09:33 A02 systemd[1]: Started Process Core Dump (PID 496218/UID 0).
Nov 03 12:09:34 A02 systemd-coredump[496219]: [🡕] Process 496217 (vsftpd) of user 1000 dumped core.
    #0  0x00007f09b00ffd2e fstatat (libc.so.6 + 0xffd2e)
    #1  0x00007f09b00d613d n/a (libc.so.6 + 0xd613d)
    #2  0x0000564fa4aeda71 n/a (vsftpd + 0xca71)
    #3  0x0000564fa4af0845 n/a (vsftpd + 0xf845)
    #4  0x0000564fa4afe264 n/a (vsftpd + 0x1d264)
    #5  0x0000564fa4ae7f06 n/a (vsftpd + 0x6f06)
    #6  0x00007f09b0027cd0 n/a (libc.so.6 + 0x27cd0)
    #7  0x00007f09b0027d8a __libc_start_main (libc.so.6 + 0x27d8a)
    #8  0x0000564fa4ae80c5 n/a (vsftpd + 0x70c5)
    ELF object binary architecture: AMD x86-64
Nov 03 12:09:34 A02 systemd[1]: systemd-coredump@20-496218-0.service: Deactivated successfully.
```

### 解决方法

在 `/etc/vsftpd.conf` 配置里增加一条 `seccomp_sandbox=NO`。然后重启 vsftpd 服务即可。

没深入探索原因，实践有效。参考[这则 issue](https://bugs.archlinux.org/task/69758)。
