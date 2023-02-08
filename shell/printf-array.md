# `printf '%s\n' $@` 为何可以打印多行？

比如 `f() { printf '%s\n' $@; }`，当执行 `f 1 2 3` 时会分行打印 1 2 3。

因为根据 POSIX 标准，

> The format operand shall be reused as often as necessary to satisfy the argument operands. Any extra b, c, or s conversion specifiers shall be evaluated as if a null string argument were supplied; other extra conversion specifications shall be evaluated as if a zero argument were supplied. If the format operand contains no conversion specifications and argument operands are present, the results are unspecified.

超出 format 字符串的部分，将重复使用 format 字符串。即重复执行 `%s\n`。

参考链接

- https://pubs.opengroup.org/onlinepubs/9699919799/utilities/printf.html
- https://stackoverflow.com/a/39690101/4622308
