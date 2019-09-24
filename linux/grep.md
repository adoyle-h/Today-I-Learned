## grep

### grep -v 筛除字符串

grep 通常用来过滤匹配的字符串，加 `-v` 参数能删除匹配的字符串。

### grep 返回 141 退出码

看起来命令挺正常的，但实际却是 141 退出码。实际是因为上一个命令还在 pipe，而下一个命令结束了，但上一个命令没地方去写了，这是内核会向上一个命令发送 `SIGPIPE` 信号，上一个命令被终止并返回了 141 退出码。

具体看[这个答案](https://stackoverflow.com/a/19120674)，回答举的例子是 `head`，同理。

### 提取匹配的字符串

```bash
msg='Sep  6 22:19:29 192 com.apple.xpc.launchd[1] (com.apple.cloudd): Service only ran for 0 seconds. Pushing respawn out by 10 seconds.'
echo "$msg" | grep -Eo 'for .+? seconds'
```

`-E` 代表使用 extended 正则表达式，`-o` 代表只输出匹配的部分。
`.+?` 代表非贪婪匹配任意字符。

也可以匹配多个，比如 `echo "$msg" | grep -Eo '(for .+? seconds|by .+? seconds)'`
