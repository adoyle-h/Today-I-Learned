# arch linux

## signature from "... <...@gmail.com>" is marginal trust

在安装包的时候可能出现签名不对导致错误

```
error: failed to commit transaction (invalid or corrupted package)
Errors occurred, no packages were upgraded.
```

解决方法：尝试更新 keyring `sudo pacman -Sy archlinux-keyring`
