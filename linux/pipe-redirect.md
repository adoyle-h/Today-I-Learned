---
title: 管道重定向
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## 重定向输出

> 可通过两种方式将输出重定向到文件：
> n>
> 将来自文件描述符 n的输出重定向到某个文件。您必须拥有该文件的写权限。如果该文件不存在，则需要创建它。如果它已经存在，通常会毫无预兆地丢失现有内容。
> n>>
> 也将来自文件描述符 n的输出重定向到某个文件。同样地，您必须拥有该文件的写权限。如果该文件不存在，则需要创建它。如果它已经存在，输出会被附加到现有文件。
>
> 摘录自 https://web.archive.org/web/20170506093023/https://www.ibm.com/developerworks/cn/linux/l-lpic1-103-4/index.html


## 输入重定向

> Command < filename	Command 命令以 filename 文件作为标准输入

或者放前面 `<filename Command`, `<(Command1) Command2`

> Command < filename > filename2	Command 信不信以 filename 文件作为标准输入，以 filename 2  作为标准输出
> Command << delimiter	从标准输入中读入，以  delimiter 为结束符。这就是 Bash 的 HereDoc 用法
>
> 摘录自 https://web.archive.org/web/20170323112555/http://unmi.cc/linux-input-output-redirection/

HereDoc 详见 [./here-strings-and-here-documents.md](./here-strings-and-here-documents.md)


### UUOC

`cat <file> | grep <pattern>` 不如 `< <file> grep <pattern>`

[SC2002](https://github.com/koalaman/shellcheck/wiki/SC2002)

[Useless Use Of Cat (UUOC)](https://www.wikiwand.com/en/Cat_\(Unix\)#Useless_use_of_cat)

## 绑定重定向

> Command  >&m	把标准输出重定向到文件描述符 m 中，如 ls >&1
> Command m>&n	把往文件描述符 m 的输出重定向到文件描述符 n 上，2>71。再如上面的完整写法是 1>&m
> Command <&-	关闭标准输入
> Command 2>&-	关闭标准错误输出，和 2>/dev/null 有类似功效
>
> 摘录自 https://web.archive.org/web/20170323112555/http://unmi.cc/linux-input-output-redirection/

使用 tee 命令拆分输出

## 管道重定向

`|&` 把上一个命令的 stderr 输出到 stdout。

## 只传递 stderr

`(time sleep 1) 3>&1 1>&2 2>&3 | grep real`

https://web.archive.org/web/20200630102912/http://timmurphy.org/2011/05/26/piping-stderr-in-unix/
