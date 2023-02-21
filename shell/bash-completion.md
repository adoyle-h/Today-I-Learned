# bash completion

## 显示某个命令的补全规则

`complete -p cmd`

## 设置补全

- `complete -b cmd`
- `complete -A builtin cmd` = `-A builtin`。
- `complete -A file cmd` = `complete -f cmd`
- `complete -A directory cmd` = `complete -d cmd`

## 补全函数的相关变量

```
COMP_CWORD
  An index into ${COMP_WORDS} of the word containing the current cursor position.  This variable is available
  only  in  shell  functions  invoked  by the programmable completion facilities (see Programmable Completion
  below).
COMP_KEY
  The key (or final key of a key sequence) used to invoke the current completion function.
COMP_LINE
  The current command line.  This variable is available only in shell functions and external commands invoked
  by the programmable completion facilities (see Programmable Completion below).
COMP_POINT
  The  index of the current cursor position relative to the beginning of the current command.  If the current
  cursor position is at the end of the current command, the value of this variable is equal to ${#COMP_LINE}.
  This  variable  is available only in shell functions and external commands invoked by the programmable com-
  pletion facilities (see Programmable Completion below).
COMP_TYPE
  Set to an integer value corresponding to the type of completion attempted that caused a completion function
  to  be called: TAB, for normal completion, ?, for listing completions after successive tabs, !, for listing
  alternatives on partial word completion, @, to list completions if the word is not unmodified,  or  %,  for
  menu  completion.   This variable is available only in shell functions and external commands invoked by the
  programmable completion facilities (see Programmable Completion below).
COMP_WORDBREAKS
  The set of characters that the readline library treats as word separators when performing word  completion.
  If COMP_WORDBREAKS is unset, it loses its special properties, even if it is subsequently reset.
COMP_WORDS
  An  array  variable (see Arrays below) consisting of the individual words in the current command line.  The
  line is split into words as readline would split it, using COMP_WORDBREAKS as described above.  This  vari-
  able  is  available  only  in  shell  functions invoked by the programmable completion facilities (see Pro-
  grammable Completion below).
```

## -o bashdefault

使用 bash 自带的补全。例如 `$BASH_<TAB>` 补全变量名。

## -o default

使用 readline 的补全，会补全文件路径。它不包含 -o bashdefault 的内容。

## -o nospace

补全不带空格，适用于补全文件路径。

## 当光标处于 = 后面时

当光标处于 `=` 后面时，即 `-o=|`（假设 `|` 是光标）。
`${COMP_WORDS[COMP_CWORD]}` 的值是空字符串，相当于 `-o= |`。

## 用脚本触发命令的补全

先用 `complete -p cmd` 找到 cmd 是如何补全的。
然后使用 `compgen` 命令按照相同参数来触发补全。（因为 compgen 兼容 complete 的参数）

`COMPREPLY=( $(compgen -F function -- "${COMP_WORDS[COMP_CWORD]}") )`
（应该还需要修改 compgen 的环境变量 COMP_WORDS, COMP_CWORD 之类的）

## sudo 是如何触发跟随其后的命令的补全？

需要依赖 [bash-completion](https://github.com/scop/bash-completion) 的函数。

bash-completion 最新版本使用 [`_comp_initialize`](https://github.com/scop/bash-completion/blob/5927d5733be672268ae15e78fd3b1a5d91cfbc2d/completions/sudo#L6) 和 [`_comp_command_offset`](https://github.com/scop/bash-completion/blob/5927d5733be672268ae15e78fd3b1a5d91cfbc2d/bash_completion#LL2280)。

bash-completion 旧版本使用 [`_init_completion`](https://github.com/scop/bash-completion/blob/6f1bbda3c66814befa8025d49363b4070ef20008/completions/sudo#L6) 和 [`_command_offset`](https://github.com/scop/bash-completion/blob/6f1bbda3c66814befa8025d49363b4070ef20008/bash_completion#L2123)。

如果想自己在脚本里触发后续命令的补全，具体参考 [`_comp_command_offset`](https://github.com/scop/bash-completion/blob/5927d5733be672268ae15e78fd3b1a5d91cfbc2d/bash_completion#LL2280) 的实现。
或直接调用 `_comp_command_offset`，不过这就依赖 bash-completion 了。

参考 https://stackoverflow.com/a/72165999/4622308

## 补全文件路径不带空格，同时补全选项时带空格

```sh
reply() {
  local IFS=$'\n'
  # 用 compopt 改变当前的补全设置
  compopt -o nospace -o filenames
  COMPREPLY=( $(compgen -A file -- "$cur") )
}
```
