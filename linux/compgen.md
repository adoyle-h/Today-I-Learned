---
title: compgen
---


`compgen` 命令可用来模糊搜索文件名。

`compgen` 的参数与 `complete` 的参数一样。

`-P` 参数匹配前缀。
`-S` 参数匹配后缀。
`-G` 参数匹配支持 `*` 通配符。
`-f` 参数补全文件
`-d` 参数补全目录

```sh
compgen -G "./*.bash"
sort <(compgen -G "./*.bash")
```

## 补全文件（不包括目录）路径的例子

```sh
result=$(compgen -f "$2")
if [[ -d $result ]]; then
  compgen -f "$result/"
else
  echo "${result[@]}"
fi
```
