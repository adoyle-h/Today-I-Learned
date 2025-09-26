---
title: sed
created: 2022-12-02T22:53:19+0800
updated: 2022-12-02T22:53:19+0800
---


BSD sed 和 GNU sed 的异同，参考 [BSD/macOS Sed vs. GNU Sed vs. the POSIX Sed specification](https://riptutorial.com/sed/topic/9436/bsd-macos-sed-vs--gnu-sed-vs--the-posix-sed-specification) ([链接备份](https://web.archive.org/web/20221013094813/https://riptutorial.com/sed/topic/9436/bsd-macos-sed-vs--gnu-sed-vs--the-posix-sed-specification))

## -i 参数不一致

BSD sed

```sh
echo 123 > abc
sed -i '' 's/1/2/' abc # ok
sed -i'' 's/1/2/' abc  # error: 1: "abc": command a expects \ followed by text
sed -i 's/1/2/' abc    # error: 1: "abc": command a expects \ followed by text
```

GNU sed

```sh
echo 123 > abc
sed -i '' 's/1/2/' abc # error: can't read s/1/2/: No such file or directory
sed -i'' 's/1/2/' abc  # ok
sed -i 's/1/2/' abc    # ok
```

### 解决方案

只有一种方法同时支持 BSD sed 和 GNU sed，那就是

```sh
sed -i.bak 's/1/2/' abc
rm abc.bak
```

或者提前判断 sed 命令是不是 GNU 的。

```sh
# 此方法来自于 https://github.com/adoyle-h/lobash/blob/develop/src/internals/is_gnu_sed.bash
is_gnu_sed() {
  local out
  out=$(${1:-sed} --version 2>/dev/null)
  [ $out =~ 'GNU sed' ]
}

# if is_gnu_sed gsed; then
if is_gnu_sed; then
  echo "is GNU sed"
else
  echo "is BSD sed"
fi
```

## 替换换行符无效

[官方文档](https://www.pement.org/sed/sedfaq5.html#s5.10)有说明。

> 5.10. Why can't I match or delete a newline using the \n escape sequence? Why can't I match 2 or more lines using \n?
> The \n will never match the newline at the end-of-line because the newline is always stripped off before the line is placed into the pattern space. To get 2 or more lines into the pattern space, use the 'N' command or something similar (such as 'H;...;g;').

**解决方法**

- GNU sed: `sed ':a;N;$!ba;s/\n//g' file`
- BSD sed: `sed -e ':a' -e 'N' -e '$!ba' -e 's/\n/ /g' file`

## 颜色字符在 sed 替换中失效

无效写法

- `<<<"red green" sed -E 's/(.+) (.+)/\033[31m\1\033[32m \2\033[0m/'`
- `<<<"red green" sed -E 's/(.+) (.+)/\\033[31m\1\\033[32m \2\\033[0m/'`
- `<<<"red green" sed -E 's/(.+) (.+)/\e[31m\1\e[32m \2\e[0m/'`

颜色字符是通过 [ASCII 转义序列](../others/ascii-and-ansi.md) 来控制终端的字符颜色显示的。

转义序列是由 `ESC` + `[` + 其他字符组成的序列。其中 `ESC` 的表示方法有很多，详见[这篇文章](../others/ascii-and-ansi.md#ascii-escape-字符)。
进制表示法和转换见[这篇文章](../math/positional-notation.md)。

sed 就不识别 `\033` 和 `\e`。但是 sed 自 [GNU sed v3.02.80 起](https://stackoverflow.com/a/7760752/4622308)就支持十六进制，因此可以用十六进制的 `\x1b`。
所以有效写法是 `<<<"red green" sed -E 's/(.+) (.+)/\x1b[31m\1\x1b[32m \2\x1b[0m/'`

另外比如 `\0` (expect NUL) 在 sed 里也不支持，需要用十六进制的 `\x0` 或 `\x00` 表示。
