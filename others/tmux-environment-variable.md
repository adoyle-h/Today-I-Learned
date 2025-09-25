---
title: tmux 环境变量
---


## tmux 启动时继承的环境变量

```sh
# 在宿主机的 shell 里执行
export k=1
# 进入 tmux
tmux
# 会显示 1
echo $k
```

这有时候会导致问题，比如当修改 ~/.bashrc 里设置的变量，具体如下

```diff
# ~/.bashrc
- k=1
+ k=${k:-2}
```

新开一个 tmux pane 或者 window 后发现 `echo $k` 还是输出 1。因为 tmux 进程已经有了 `k=1` 这个环境变量。

解决方法: `tmux setenv -gr k` 来取消环境变量 `k`。

另外，你可以使用 `tmux showenv -g` 来查看 tmux 进程内的所有环境变量。
