# Connection closed by UNKNOWN port 65535

git fetch 或者 git push 时看到这个错误。

## 排查思路

`ssh -vvv -T git@github.com` 查看与 github.com 的 ssh 链接过程具体有什么问题。

比如我的案例是：

```sh
debug3: channel_clear_timeouts: clearing
debug1: Executing proxy command: exec nc -x 127.0.0.1:7890 github.com 22
debug1: identity file /Users/adoyle/.ssh/id_rsa type 0
debug1: identity file /Users/adoyle/.ssh/id_rsa-cert type -1
debug1: identity file /Users/adoyle/.ssh/id_ecdsa type -1
debug1: identity file /Users/adoyle/.ssh/id_ecdsa-cert type -1
debug1: identity file /Users/adoyle/.ssh/id_ecdsa_sk type -1
debug1: identity file /Users/adoyle/.ssh/id_ecdsa_sk-cert type -1
debug1: identity file /Users/adoyle/.ssh/id_ed25519 type 3
debug1: identity file /Users/adoyle/.ssh/id_ed25519-cert type -1
debug1: identity file /Users/adoyle/.ssh/id_ed25519_sk type -1
debug1: identity file /Users/adoyle/.ssh/id_ed25519_sk-cert type -1
debug1: identity file /Users/adoyle/.ssh/id_xmss type -1
debug1: identity file /Users/adoyle/.ssh/id_xmss-cert type -1
debug1: identity file /Users/adoyle/.ssh/id_dsa type -1
debug1: identity file /Users/adoyle/.ssh/id_dsa-cert type -1
debug1: Local version string SSH-2.0-OpenSSH_9.7

kex_exchange_identification: Connection closed by remote host
Connection closed by UNKNOWN port 65535
```

`debug1: Executing proxy command: exec nc -x 127.0.0.1:7890 github.com 22` 表示我的 ssh 走了代理。

`kex_exchange_identification: Connection closed by remote host` 说明问题发生在 [kex_exchange_identification](https://github.com/openssh/openssh-portable/blob/aee54878255d71bf93aa6e91bbd4eb1825c0d1b9/kex.c#L1237)

目测是 GFW 或者网络代理商的缘故，ssh 传输被中断了。

## 解决方法

默认 ssh 用的端口是 22。可以采用 [SSH over the HTTPS port](https://docs.github.com/en/authentication/troubleshooting-ssh/using-ssh-over-the-https-port) 的方式，用 HTTPS 端口传输 SSH 协议。

修改 ~/.ssh/config，增加这一段：

```
Host github.com
Hostname ssh.github.com
Port 443
User git
```
