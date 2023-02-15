# sed

BSD sed 和 GNU sed 的异同，参考 https://riptutorial.com/sed/topic/9436/bsd-macos-sed-vs--gnu-sed-vs--the-posix-sed-specification

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

## 替换换行符无效

[官方文档](https://www.pement.org/sed/sedfaq5.html#s5.10)有说明。

> 5.10. Why can't I match or delete a newline using the \n escape sequence? Why can't I match 2 or more lines using \n?
> The \n will never match the newline at the end-of-line because the newline is always stripped off before the line is placed into the pattern space. To get 2 or more lines into the pattern space, use the 'N' command or something similar (such as 'H;...;g;').

**解决方法**

- GNU sed: `sed ':a;N;$!ba;s/\n//g' file`
- BSD sed: `sed -e ':a' -e 'N' -e '$!ba' -e 's/\n/ /g' file`
