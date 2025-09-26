---
title: 终端邮件客户端 Mutt
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


我用的是 [neomutt](https://github.com/neomutt/neomutt)，mutt 集成了很多插件。

HTML 邮件很难看，图片链接没显示，于是弃坑。

## 入门文档

- [正式的介绍「Mutt」：命令行的邮件大师](https://segmentfault.com/a/1190000018131615)
- [ArchLinux WIKI - Mutt](https://wiki.archlinux.org/index.php/Mutt_(简体中文))
- [USING GMAIL WITH MUTT](https://smalldata.tech/blog/2016/09/10/gmail-with-mutt)
- [Mutt 官方在线文档](https://neomutt.org/guide/index.html)。`man neomutt`，里面有写离线版的文档在哪里。
- [Reference 手册](https://neomutt.org/guide/reference)

## 其他方案

- [aerc](https://aerc-mail.org)

## SMTP 服务无法连接

修改 muttrc

```
set ssl_starttls = no
set smtp_authenticators = 'gssapi:login'
set smtp_url = "smtps://${my_mail}@smtp.gmail.com:465"
set smtp_pass = $my_pass
```

## 设置代理

https://github.com/neomutt/neomutt/issues/99

## 改变显示语言

默认使用当前语言环境展示 mutt 客户端。可以手动改变，`LANG=en_US.UTF-8 mutt` 设置以英文显示。
