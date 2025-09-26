---
title: Zsh 的坑
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## 修改 path 变量把 PATH 覆盖了

```zsh
path=123
echo $PATH
123
```

这不是大小写不敏感问题，这是 zsh 的一个 Feature…
`path` 是 PATH 变量的另一种数组别名。
http://www.zsh.org/mla/users/2015/msg00178.html

## Zsh 不能 export function

也就不支持 `export` 的 `-f` 参数。

没有变通方法。
