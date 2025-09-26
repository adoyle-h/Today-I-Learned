---
title: 学习 Shell
created: 2023-02-08T18:12:13+0800
updated: 2023-02-08T18:12:13+0800
---


## find -exec 无法调用函数

需要用 `export -f <function>` 标记即可使用。

## xargs 无法调用函数

```sh
export -f <fn>
xargs -n 1 bash -c '<fn> "$@"' _
```

参考 https://unix.stackexchange.com/a/158569/373303
