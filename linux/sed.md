## sed

BSD sed 和 GNU sed 的异同，参考 https://riptutorial.com/sed/topic/9436/bsd-macos-sed-vs--gnu-sed-vs--the-posix-sed-specification

### -i 参数不一致

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
