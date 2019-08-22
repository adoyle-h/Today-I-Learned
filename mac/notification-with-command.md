## 用命令触发系统通知

例子:

```sh
message='hello world!'
title='Greeting'
subtitle='More text'
sound='Submarine'
osascript -e "display notification \"$message\" with title \"$title\" subtitle \"$subtitle\" sound name \"$sound\""
```

参考

- [Display notification from the Mac command line](https://code-maven.com/display-notification-from-the-mac-command-line)

Mac 声音文件在 `/System/Library/Sounds/` 目录。
