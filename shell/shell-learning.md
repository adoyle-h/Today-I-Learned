# 学习 Shell

## find -exec 无法调用函数

需要用 `export -f <function>` 标记即可使用。

## xargs 无法调用函数

```sh
export -f <fn>
xargs -n 1 bash -c '<fn> "$@"' _
```

参考 https://unix.stackexchange.com/a/158569/373303
