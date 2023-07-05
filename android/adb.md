# ADB

- `adb connect $ip` 连接设备
- `adb devices -l` 列出已连接的设备
- `adb shell` 进入 shell，默认是 shell 用户，没 root 权限。在 `adb shell` 之前执行 `adb root` 可切换到 root 用户登录。
- `adb push $local_path $remote_path` 发送文件到设备
- `adb pull $remote_path $local_path` 拉取文件到本地

## adb connect 不借助 USB 连接

先用 USB 连接上，然后执行

```
setprop service.adb.tcp.port 5555
stop adbd
start adbd
```

或者

`adb tcpip 5555`

断开 USB，然后 `adb connect $IP:5555`

断开连接 `adb disconnect $IP:5555`

## 备份应用

使用 `adb backup` 命令备份应用。虽然它会提示这个命令已废弃。但我没有找到其他替代的命令。

`adb backup -all -f backup.ab`

参数

- `-all` 参数是必须的，否则不会备份。
- `-apk|-noapk` 是否备份 apk。默认是 `-noapk`。
- `-shared|-noshared` 是否备份 SD 卡的内容。默认是 `-noshared`。
- `-system|-nosystem` 是否备份系统应用。默认是 `-system`。

[android-backup-extract](https://github.com/tcrs/android-backup-extract) 这个项目可以解压缩 `.ab` 文件的内容。
