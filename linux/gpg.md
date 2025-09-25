---
title: gpg
---

## 概念

- gpg: 生成和操作 GPG Key 的命令。
- [gpg-agent](./gpg-agent.md): 在后台运行并缓存用户的私钥密码，以便在需要时自动提供给相关应用程序。
- gpg.conf: gpg 的配置文件。
- gpg-agent.conf: gpg-agent 的配置文件。
- Key Server: 专门用于存放 Public Key 的服务器。
- Key Fingerprint: Public Key 的散列值，40 字符长度，便于展示身份。
- Key ID: Key Fingerprint 的末尾 16 个字符。便于展示身份。
- UserID: 格式 `username (comment) <email>`
- `[S]`

## gpg debug

`gpg -vvv` 用 `-v` 参数输出更多 debug 信息。

## 创建主密钥

1. `gpg --full-gen-key`
2. 选 ECC 加密，默认椭圆曲线。
3. 输入 Passphrase，记住 Passphrase 以后会用到。

## 创建子密钥

1. `gpg --edit-key <keyid>` 选择主密钥。
2. `addkey`
3. 分别创建 sign 和 encrypt 子钥。
4. `save` 退出前一定要 save, 否则更改不会生效。

## 撤销子密钥

1. `gpg --edit-key <keyid>` 选择主密钥。
2. `list` 列出所有的子密钥。
3. `key <n>` 选择要销毁的子密钥的序号。
4. `revkey`
5. `save` 退出前一定要 save, 否则更改不会生效。

## 删除密钥

`gpg --delete-secret-and-public-keys <keyid>`

## 导入公钥

从 key server 导入：`sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys <pubkey>`

或者，从本地文件导入：`gpg --import <file>`

### gpg 导入私钥失败

如果错误消息是 `No such file or directory` 或者要求输入 passphrase。
据说是 gpg2 的 bug。加上 `--batch` 参数就解决了，`gpg --batch --import <file>`。

- [GNUPG2 suddenly throwing "Error building skey array: No such file or directory"](https://superuser.com/q/1325862/1776434)
- [gpg2 asking for passphrase when importing secret keys](https://superuser.com/q/1135812/1776434)
- https://dev.gnupg.org/T2313

## 发布公钥

## 撤销公钥

## 签名

- 签名（原文本分开） `gpg -ab input.txt -u <keyid>`
  - 生成二进制签名文件（原文件包含在生成文件里） `gpg -s input.txt -u <keyid>`
  - 生成 ASCII 格式签名 `gpg -b input.txt -u <keyid>`
- 验证签名 `gpg --verify demo.txt.asc demo.txt -u <keyid>`

## 加密

`gpg -se -o encrypt.txt -r <recipient-keyid> input.txt`

## 解密

`gpg -d encrypt.txt`
