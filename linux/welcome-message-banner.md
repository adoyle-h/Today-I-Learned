---
title: Welcome Message Banner
created: 2019-12-28T13:14:24+0800
updated: 2019-12-28T13:14:24+0800
---


当你想在登录终端时打印一些提示信息给用户。可以在 `~/.bashrc` 里写打印信息的脚本，但这可能会影响 ssh、scp、rsync 等程序。
最正确的做法是把消息放到 /etc/motd 里。可以直接创建或编辑这个文件，也可以用 motd 命令来编辑。motd 的意思是 Message of The Day。
motd 的[方法参考](https://www.ibm.com/support/knowledgecenter/zh/POWER8/p8hcg/p8hcg_motd.htm)。 ([链接备份](https://web.archive.org/web/20230225213824/https://www.ibm.com/docs/zh/power8?topic=commands-motd-command))

## Mac 系统

Mac 默认的 Terminal 每次打开会显示这种格式的信息 `Last login: Tue Dec 24 15:46:01 on ttys007`，
同时它也会显示 /etc/motd 文件里的内容。

但 iTerm2 不会显示，所以个人电脑还是写在 bashrc 吧。

## hushlogin

Mac 也提供机制禁止这种 Last Login 信息，`touch ~/.hushlogin` 即可，详见[这篇文章](http://osxdaily.com/2010/06/22/remove-the-last-login-message-from-the-terminal/) ([链接备份](https://web.archive.org/web/20221208164253/https://osxdaily.com/2010/06/22/remove-the-last-login-message-from-the-terminal/))。
