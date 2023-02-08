---
tags: [bash]
---
# 多行字符串赋值给变量

重点: 要保留换行符

```sh
IFS='' str=$(cat <<'EOF'
echo hello

bind -x '"\t": bash_completion'
EOF
)

echo $str
```
