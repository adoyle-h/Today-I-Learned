# sudoer

```sh
chmod u+w /etc/sudoers
vim /etc/sudoers
chmod u-w /etc/sudoers
```

`visudo -c` 检查配置是否正确。

## 使用 sudo 时，继承当前用户的环境变量

比如当前用户的默认编辑器是 vim，但是 sudo 执行时默认编辑器是 nano。

修改 `/etc/sudoers`。

```
# This allows running arbitrary commands, but so does ALL, and it means
# different sudoers have their choice of editor respected.
Defaults:%sudo env_keep += "EDITOR"
```

意思是 sudo 会继承当前环境变量 EDITOR。

还推荐设置继承 HOME 变量。

```
## Run X applications through sudo; HOME is used to find the
## .Xauthority file.  Note that other programs use HOME to find
## configuration files and this may lead to privilege escalation!
Defaults env_keep += "HOME"
```
