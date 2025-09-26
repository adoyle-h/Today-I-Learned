---
title: '一个复杂的小 bug: cd 补全问题'
created: 2024-09-13T14:20:19+0800
updated: 2024-09-13T14:20:19+0800
---


如果你同时在使用 [fnm](https://github.com/Schniz/fnm)，[bash-completion](https://github.com/scop/bash-completion), bash-it 的 [aliases.completion.bash](https://github.com/Bash-it/bash-it/blob/master/completion/available/aliases.completion.bash) 这三个工具，你会遇到一个 BUG。

## BUG 描述

使用 cd 按 Tab 补全路径时，每个路径都会额外加上一个空格。

比如 `cd /<Tab>` 然后选中 /usr，补全后变成 `cd /usr <光标位置>`。但正常期望的应该是 `cd /usr<光标位置>`。

## 复现问题

省略，懒得写。

## 排错关键

当同时使用 fnm, bash-completion, bash-it 的 aliases.completion.bash：

```sh
> complete -p cd
complete -F _comp_complete_minimal cd

> alias cd
alias cd='__fnmcd'

> complete -p __fnmcd
complete -F _comp_complete_minimal __fnmcd
```

当同时开启 bash-completion 和 bash-it 的 aliases.completion.bash，不使用 fnm：

```sh
> complete -p cd
complete -o nospace -F _comp_cmd_cd cd

> alias cd
-bash: alias: cd: not found

> complete -p __fnmcd
-bash: complete: __fnmcd: no completion specification
```

当同时开启 bash-completion 和 fnm，不使用 bash-it 的 aliases.completion.bash：

```sh
> complete -p cd
-bash: complete: cd: no completion specification

> alias cd
alias cd='__fnmcd'

> complete -p __fnmcd
-bash: complete: __fnmcd: no completion specification
```

当同时开启 bash-it 的 aliases.completion.bash 和 bash-completion, fnm，不使用 bash-completion：

```sh
> complete -p cd
-bash: complete: cd: no completion specification

> alias cd
alias cd='__fnmcd'

> complete -p __fnmcd
-bash: complete: __fnmcd: no completion specification
```

## 原因分析

根因不在 bash-completion 也不在 bash-it，而在于 fnm 的 `--use_on_cd` 参数。

fnm 的[初始化](https://github.com/Schniz/fnm#bash)这么写：`eval "$(fnm env --use-on-cd --shell bash)"`

然而在 [`fn use_on_cd`](https://github.com/Schniz/fnm/blob/1a58394b53c918fa130e22116056f7b4f8e4997c/src/shell/bash.rs) 可以看到这段。

```sh
__fnmcd() {{
    \cd "$@" || return $?
    __fnm_use_if_file_found
}}

alias cd=__fnmcd
__fnm_use_if_file_found
```

`_comp_complete_minimal` 是 bash-completion 源码里定义的。

由于 `alias cd='__fnmcd'` 的存在，aliases.completion.bash 会把 cd 的补全函数用 __fnmcd 的补全函数代替。

而 aliases.completion.bash 也会给 __fnmcd 添加一个 `complete -F _comp_complete_minimal __fnmcd`

这就导致了 `complete -F _comp_complete_minimal cd`。

## 解决办法

不要用 --use-on-cd 参数。这功能只是在 cd 目录时自动查找是否存在 .node-version 或 .nvmrc 文件，自动切换 node 版本用的。

`eval "$(fnm env --shell bash)"`
