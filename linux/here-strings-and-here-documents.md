---
title: Here Strings 与 Here Documents
created: 2017-07-27T01:14:44+0800
updated: 2017-07-27T01:14:44+0800
---


## [Here Strings](https://www.gnu.org/software/bash/manual/bashref.html#Here-Strings)

`[n]<<< word`

## [Here Documents](https://www.gnu.org/software/bash/manual/bashref.html#Here-Documents)

```
[n]<<[-]delimiter
here-document
delimiter
```

`delimiter` 可以是 `EOF` 或者其他任意字符。

### 例子

```
cat <<EOF > file.txt
hello
world
$PATH
EOF
```

### <<-

> If the redirection operator is ‘<<-’, then all leading tab characters are stripped from input lines and the line containing delimiter. This allows here-documents within shell scripts to be indented in a natural fashion.

### 避免符号替换

默认 here-document 会执行 `$var` 和 `$()` shell 的语法替换，只有在 delimiter 两边加上单括号可以防止替换。

```
[n]<<[-]'delimiter'
  here-document
delimiter
```

### 例子

```
cat <<'EOF' > file.txt
hello
world
$PATH
EOF
```

参考 Here Documents 的文档，或者 https://stackoverflow.com/a/22698106/4622308
