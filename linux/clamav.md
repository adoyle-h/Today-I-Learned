# clamav

[clamav](https://www.clamav.net/) 是运行在 Unix/Linux 系统的杀毒软件。功能很强大。

## 上层概念

- `freshclam` 用来更新 clamav 病毒数据库。数据库放置在 `/var/lib/clamav/`，且文件的用户和用户组都是 `clamav`。
- `clamd` 是 clamav daemon 进程，它会读取配置文件 `/etc/clamav/clamd.conf`。`clamd` 不会自动查毒。
- `clamdtop` 是 `clamd` 进程的监控程序。查看 clamd 线程池。
- `clamdscan` 通知 `clamd` 进程进行查毒。通常执行 `clamdscan --fdpass <文件或目录>`。
- `clamscan` 与 `clamd` 无关，直接根据当前命令参数执行查毒，因此也不会读取配置文件 `/etc/clamav/clamd.conf`。通常执行 `sudo clamscan -ri /`。
- `clamconf` 显示或生成 clamav 的配置文件。
- `clamonacc` 是 on-access 扫描服务，当文件变化会立刻扫描。依赖 `clamd`。配置文件 `/etc/clamav/clamd.conf` 里以 `OnAccess` 开头的都是相关配置项。

## clamonacc Access denied

如果 `/etc/clamav/clamd.conf` 配置的是 `User clamd`，那么扫描时会报错 `Access denied`。
运行 clamdscan 和 clamonacc 命令都需要加上 `--fdpass` 参数。

## 需要手动创建 /root/quarantine

/lib/systemd/system/clamav-clamonacc.service 写了 `ExecStart=/usr/sbin/clamonacc -F --fdpass --log=/var/log/clamav/clamonacc.log --move=/root/quarantine`。

`--move` 参数的作用是把被病毒感染的文件移动到指定目录。如果 /root/quarantine 目录没创建，会报错。
注意 /root/quarantine 目录的 user 和 group 跟 clamav-clamonacc 进程的 user 对齐。

## 创建病毒文件来测试

创建 [EICAR 标准反病毒测试文件](https://www.eicar.org/download-anti-malware-testfile/)。

```sh
mkdir eicar && cd eicar
curl -O https://secure.eicar.org/eicar.com \
 -O https://secure.eicar.org/eicar.com.txt \
 -O https://secure.eicar.org/eicar_com.zip \
 -O https://secure.eicar.org/eicarcom2.zip
```

然后尝试扫描病毒 `clamdscan ./*`，显示出 `Win.Test.EICAR_HDB-1 FOUND` 就说明扫出病毒。扫完后尝试 `cat eicar.com`。

## clamdscan 扫不出病毒，但 clamscan 可以

用 `clamdscan -v --fdpass $path` 看看那个病毒文件是不是 excluded 的。当前 clamav 有个 [bug](https://github.com/Cisco-Talos/clamav/issues/940) 会把 excluded 的文件也输出 OK。
