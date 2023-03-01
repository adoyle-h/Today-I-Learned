## 为什么创建 Daemon 进程要 Fork 两次？

为了同时达成以下几个目的：

1. 让 Daemon 进程被 init 进程接管。（通过一次 fork 后父进程退出即可实现）
  - 为什么要被 init 进程接管？为了在其父进程退出后能继续运行。为了防止变成僵尸进程。
2. 让 Daemon 进程摆脱从父进程继承的会话 (Session)，进程组 (Process Groups)，以及相连的控制终端 (TTY)。（通过两次 fork 配合 [setsid][] 函数来实现）


如果 Daemon 进程没有摆脱父进程的会话、进程组、TTY 会发生什么事？

> 会话是由其中的进程建立的，该进程叫做会话的领导进程(session leader)。会话领导进程的PID成为识别会话的SID(session ID)。会话中的每个进程组称为一个工作(job)。会话可以有一个进程组成为会话的前台工作(foreground)，而其他的进程组是后台工作(background)。每个会话可以连接一个控制终端(control terminal)。当控制终端有输入输出时，都传递给该会话的前台进程组。由终端产生的信号，比如CTRL+Z， CTRL+\，会传递到前台进程组。

> 将信号发送给一个进程组。进程组中的所有进程都会收到该信号。

Daemon 进程不应该受到终端和会话的影响。

具体参考这几篇文章：

- https://stackoverflow.com/a/16655124/4622308
- [Daemonize 一个进程为什么需要 fork 两次](https://zhuanlan.zhihu.com/p/44874925) ([链接备份](https://archive.md/BIcRp))
- [Linux Kernel: Processes](https://www.win.tue.nl/~aeb/linux/lk/lk-10.html) ([链接备份](https://web.archive.org/web/20220815032909/https://www.win.tue.nl/~aeb/linux/lk/lk-10.html))
- https://stackoverflow.com/a/5386753/4622308
- [Linux进程组和会话](https://web.archive.org/web/20171102155811/https://my.oschina.net/hosee/blog/507098)


[setsid]: https://man7.org/linux/man-pages/man2/setsid.2.html
