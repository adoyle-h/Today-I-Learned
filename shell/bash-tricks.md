---
title: Bash 小技巧
---


## man bash

在 /usr/share/doc/bash/ 能找到 bash PDF 和 HTML 文档。

查看所有 bash built-in 命令: `compgen -b | column`

### 查看 bash built-in 命令的帮助文档

使用 `help` 内置命令，比如 `help cd`。

或者，
定义一个函数 `bashman () { man bash | less -p "^       $1 "; }`，
调用：`bashman cd` 查看。

## help help

显示内建命令的相关信息

## 终端快捷键

实质是 Readline 的功能。详见[这里](../shell/readline.md)。

## kill %jobspec

kill 命令不止能杀掉进程，还能直接关闭后台托管进程。

使用 `jobs` 查看当前 shell 的后台任务。使用 `kill %任务序号` 来关闭任务进程。

另外，`jobs -p` 能列出对应的进程号。

## `<Tab>` 补全文件路径开启颜色

首先，这个特性是在 bash 4.3 版本中加入的。
而 mac 自带的 bash 版本是 3.x。你需要通过 `brew install bash` 安装最新的 bash。

然后，在 `~/.inputrc` 里加一行 `set colored-stats on` 即可。

参考[这个问题](http://superuser.com/questions/251107/how-to-get-a-colored-tab-completion)

## bash-completion

https://github.com/scop/bash-completion 比内置 bash 补全更全面。

bash 3.0+ 版本通过 `brew install bash-completion` 来安装。

bash 4.0+ 版本通过 `brew install bash-completion2` 来安装。

## PS1 等提示符的定义

Bash 有四个可以定制的提示符

- PS1 是在每个命令前都显示的主要提示符，大部分用户都是定制这个值。
- PS2 命令需要输入时的第二提示符(比如多行命令).
- PS3 不常用，Bash 的内置 select 显示交互菜单时使用. 和其它提示符不一样，它不扩展 Bash escape sequences. 通常在使用包含 select 的脚本时会需要定制此提示符。
- PS4 也不常用，在调试 bash 脚本时显示。
所有提示符都可以通过设置变量到需要的数值进行定义(通常在 ~/.bashrc)

https://wiki.archlinux.org/index.php/Color_Bash_Prompt_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#.E6.8F.90.E7.A4.BA.E7.AC.A6.E3.80.80

## 右侧打印

```sh
rightprompt()
{
    printf "%*s" $COLUMNS "right prompt"
}

export PS1='\[$(tput sc; rightprompt; tput rc)\]left prompt > '
```

https://wiki.archlinux.org/index.php/Color_Bash_Prompt_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#Right-justified_text


## 打印所有 bash options (set -o 或 shopt)

注意 set 和 shopt 是两个用处不同的命令，配置不一样

- `set -o`
- `shopt -p` 或 `shopt`。这两个命令输出不同格式

## 提取一句话的第一个单词

```sh
str='  word1 word2'
word_list=($str)
echo ${word_list[0]}
```

## /usr/libexec/path_helper

/usr/libexec/path_helper -s

http://unix.stackexchange.com/questions/210158/how-can-i-list-bashs-options-for-the-current-shell

## 设置环境变量与命令写同一行

比如 `hello=world echo $hello` 并不会输出信息

`hello=world; echo $hello` 或者  `hello=world && echo $hello` 才可以。

但是 `hello=world <命令>` 在`<命令>`中是能获取到 `$hello` 的值。

## declare -r 与 readonly 的区别

https://stackoverflow.com/a/30362832/4622308

## 得到上层绝对路径的快捷方法

```sh
path=$(pwd)      # 例如 /a/b/c
---
title: 移除掉从末尾匹配到 `/*` 的部分
---

echo ${path%/*}  # => /a/b
```

## $- 查询 set options 开启状况

$- 是一串字符串，由 set option 的简写标记组成。

`[[ $- =~ [x] ]]` 可以这样写来判断是否开启 -x，即 xtrace。

`[[ $- =~ [xv] ]]` 还可以判断其他组合

## extglob

> as if the extglob shell option were enabled. The ‘=’ operator is identical to ‘==’

`[[]]` 条件判断中，当 extglob 选项开启，`=` 用法类似 `==`

`shopt | grep extglob`

## 分解字符串成数组

比如以 `,` 分解字符串成数组。

`IFS=',' read -r -a folders <<< "a,b,c,d"`

## 在字符串里用换行符

用 `$''` 符号，比如 `$'abc\ndef'`。

## `=~` 的正则表达式

### `-` 要放在正则表达式的首部或尾部

```sh
[[ '-' =~ [._-] ]]
echo $?  # 0，即 true
[[ '-' =~ [._-a-zA-Z0-9] ]]
echo $?  # 2，即 false
```

因为正则表达式里的 `-`，如果不是第一个或者最后一个字符，或者没有写成转义的 `\-`，那 `-` 会被当成 range 的连字符。
所以要写成 `[[ '-' =~ [-._a-zA-Z0-9] ]]` 或 `[[ '-' =~ [._a-zA-Z0-9-] ]]` 才是 true。

但写成 `[[ '-' =~ [._\-a-zA-Z0-9] ]]` 依然会失败，因为 bash 的正则解析貌似不支持这样写，暂时未找到解释。

## BASH 的 PS1/PS2/PS3/PS4

> Bash 有四个可以定制的提示符:
>
> PS1 是在每个命令前都显示的主要提示符，大部分用户都是定制这个值。
> PS2 命令需要输入时的第二提示符(比如多行命令).
> PS3 不常用，Bash　的内置 select 显示交互菜单时使用. 和其它提示符不一样，它不扩展 Bash escape sequences. 通常在使用包含 select 的脚本时会需要定制此提示符。
> PS4 也不常用，在调试　bash 脚本时显示缩进级别。第一个字符的重复次数表示缩进级别。

https://wiki.archlinux.org/index.php/Bash/Prompt_customization_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)


## BASH PS1 需要包裹

BASH PS1 需要包裹在 `\[` `\]` 里

> Note: Wrapping the tput output in \[ \] is recommended by the Bash man page. This helps Bash ignore non-printable characters so that it correctly calculates the size of the prompt.

https://wiki.archlinux.org/index.php/Bash/Prompt_customization_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)

如果没写 `\[` `\]`，按 `ctrl-u` 清空当前行会显示多余的字符。

## 目录是可执行的

> Execute allows you to enter it and access files (or other directories) inside.

答案见 https://superuser.com/a/168583
真是有趣。

## 获得字符的转义码

先按 `ctrl-v` 再按想转义的字符，就会输出到终端上，支持组合键。
在 vim 中也有效。

## 使用 bind 改变键盘字符的触发效果

- https://web.archive.org/web/20210927121456/https://blog.libthomas.org/calendar/2015/01/19/22.html
- https://www.computerhope.com/unix/bash/bind.htm ([链接备份](https://web.archive.org/web/20230204212101/https://www.computerhope.com/unix/bash/bind.htm))

用 bind 感觉可以做很有趣的事。

## 用 ANSI Escape Code 改变 Shell 文字样式

改变 Shell 文字样式，本质上就是用 ANSI Escape Code 来改变终端模拟器的行为，可以做到很多事，比如改变文字颜色，文字闪烁，改变鼠标位置，清屏等等。比如执行 echo -e '\e[2J' 来清屏，或者 echo -e '\e[2J\e[u' 清屏并重置鼠标位置（跟 ctrl-l 同样效果）。这也跟 tput 命令是异曲同工的。

- [Wikipedia - ANSI escape code](https://www.wikiwand.com/en/ANSI_escape_code)
- [Stackoverflow - List of ANSI color escape sequences](https://stackoverflow.com/q/4842424/4622308)
- [FLOZz' MISC ? bash:tip_colors_and_formatting](https://misc.flogisoft.com/bash/tip_colors_and_formatting) ([链接备份](https://web.archive.org/web/20230214042614/https://misc.flogisoft.com/bash/tip_colors_and_formatting))
- [ASCII Table - ANSI Escape sequences](https://web.archive.org/web/20210226122732/http://ascii-table.com/ansi-escape-sequences.php)
- [vt100.net - ANSI Control Functions Summary](https://vt100.net/docs/vt510-rm/chapter4.html) ([链接备份](https://web.archive.org/web/20221226222419/https://vt100.net/docs/vt510-rm/chapter4.html))
- [JAFROG'S DEV BLOG - Colors In Terminal](http://jafrog.com/2013/11/23/colors-in-terminal.html) ([链接备份](https://web.archive.org/web/20230118035024/http://jafrog.com/2013/11/23/colors-in-terminal.html))
- [V2EX - 用 ANSI Escape Code 改变 Shell 文字样式](https://www.v2ex.com/t/573838) ([链接备份](https://web.archive.org/web/20230225214720/https://www.v2ex.com/t/573838))


## 判断当前程序是否由管道传参

```sh
is_piped() {
  [[ -t 0 ]] && echo false || echo true
}

echo 1 | is_piped
# => true
is_piped
# => false
```

然而这个判断还是有很大缺陷，如果调用者也处于管道里，`[[ -t 0 ]]` 会受影响。

```sh
f() {
  is_piped
}

b() {
  echo 1 | f
}

f
# => false
echo 1 | f
# => true
b
# => true
echo 1 | b
# => true
```

## BSD 和 GNU 正则表达式的不同

- Group Capturing 特性不同，GNU 下的 `\0` 在 BSD 里是 `&`，`\1`, `\2` 没有区别。
- 正则符合 `\w` 在 BSD 里是 `[[:alnum:]]`，`\W` 在 BSD 里是 `[^[:alnum]]`。

https://www.gnu.org/software/grep/manual/html_node/Character-Classes-and-Bracket-Expressions.html

## 正则匹配

`=~` 是 POSIX extended regular expression pattern。

如果你想匹配 `initial string` 开头的字符串，
用 `[[ $line =~ ^"initial string" ]]` 而非 `[[ $line =~ "^initial string" ]]`


## bind 某些快捷键

`bind -p | grep "\\C-u"` 可以看到 `"\C-u": unix-line-discard`，我想把 Ctrl-U 的绑定取消掉。

尝试了以下做法

```
bind -r '"\C-u"'
bind -r '\C-u'
bind -r '\C-u'
bind -r "\\C-u"
bind -r "\C-u"
```

结果这些都没有，绑定还是在。
看了[这个答案](https://unix.stackexchange.com/q/423375/373303)才发现，原来是 `stty` 搞的鬼。

只要把 `stty kill ''`，把 kill 关键字绑定到空字符串上就相当于重置为空了。
可以通过 `stty -a` 看到 stty 已绑定的快捷键。

## 通过 shell 编程输出字符串到 readline 的缓存区里

利用 `bind -x keyseq:function-name` 和 READLINE_LINE。
参照 [fzf 的做法](https://github.com/junegunn/fzf/blob/c1dbc800e587471a8c34a0e3a4a907aabc71cdd0/shell/key-bindings.bash#L104)。

## ${!var} 语法

这个叫 variable indirection。
Bash Reference Manual 里只有一段很不起眼的描述，容易漏掉。
参考答案: https://stackoverflow.com/a/8515492/4622308

## 查看一个变量是否是 export 的

`export -p | grep $var_name`。如果输出结果有 `-x`，代表是 export 的，如果没有，则不是。

## 获得纳秒/毫秒时间

`date +%N` 只适合 GNU date。对于 MacOS、Alpine、Busybox 都无效。

自 Bash 5.0 起，可以使用 `$EPOCHREALTIME`。

https://stackoverflow.com/a/67044674/4622308

## : 开头的作用

`:` 是 bash 的内置命令，等同于 `true` 命令。没有任何作用（没有副作用）。
比如 `: echo 123` 不会输出 123。

主要使用场景：

1. 变量替换 (Shell Parameter Expansion)。比如 `: "${var:=$1}"`。
2. 清空文件 `:> file.log`，相当于 `true > file.log`。
3. 创建空函数 `f() { :; }`，相当于 `f() { true; }`。

[What is the purpose of the : (colon) GNU Bash builtin?](https://stackoverflow.com/q/3224878/4622308)

## bash -c 选项

`bash cmd args` 与 `bash -c cmd args` 的不同：

`bash -c cmd args` 是错误写法。bash -c 后面必须接一个字符串，即 `bash -c 'cmd args'`.

bash -c 选项确保命令的参数替换 (expansion) 是在一个新的 bash 进程里进行的，就不会受到当前 shell 进程的环境变量影响。

## IFS

IFS 默认值是 `$' \t\n'`（空格，Tab，换行符）。
可以用 `printf '%q' "$IFS"` 显示 IFS 的值。

## (cmd) 与 { cmd; } 的区别

- `(cmd)` 运行在 [subshell][]，可以读取父进程的变量，但无法修改父进程的变量。
- `{ cmd; }` 运行在当前进程，且可以修改当前进程里的变量。

## | 与 < <(cmd) 的区别

因为每个在 `|` 的命令是运行在 [subshell][] 里的。而 subshell 里的程序无法修改外层的变量。

```sh
k=(1 2 3)
( echo "${k[@]}" )         # print 1 2 3
( k[0]=4; echo "${k[@]}" ) # print 4 2 3
echo "${k[@]}"             # print 1 2 3
```

https://superuser.com/a/1348950/1776434

`cmd2 < <(cmd)` 中 `cmd` 也不能修改当前进程的变量。但是 `cmd2` 是运行在当前进程的，可以修改。

[subshell]: ./subshell-and-child-process.md

## `[ ]` 与 `[[ ]]` 的区别

https://stackoverflow.com/a/3427931/4622308

## `${var+x}` 和 `${var:+x}` 的区别

`${var+x}` 和 `${var:+x}` 是 Bash 中的两种不同的参数扩展方式，它们的行为略有不同：

- **`${var+x}`** 只要 `var` 被设置（无论是否为空），都会返回 `x`。
- **`${var:+x}`** 只有当 `var` 被设置且不为空时，才会返回 `x`；否则返回空。

两者主要用于不同的场景：`${var+x}` 用于检测变量是否被设置，而 `${var:+x}` 用于检测变量是否既被设置又有值。

## 定位函数在哪个文件定义的

在函数定义之前执行 `shopt -s extdebug`。或者启动 bash 时加参数 `--debugger`: `bash --debugger`。
然后使用 `deflare -F function_name` 就能打印文件位置。

详见 https://unix.stackexchange.com/a/322887

变量没法这样用。
