---
title: 多行字符串赋值给变量
created: 2023-02-08T18:12:13+0800
updated: 2023-02-08T18:12:13+0800
tags: [bash]
---


重点: 要保留换行符

```sh
IFS='' str=$(cat <<'EOF'
echo hello

bind -x '"\t": bash_completion'
EOF
)

echo $str
```
