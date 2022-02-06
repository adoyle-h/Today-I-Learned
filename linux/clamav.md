## clamav

[clamav](https://www.clamav.net/) 是运行在 Unix/Linux 系统的杀毒软件。功能很强大。

### 上层概念

- `freshclam` 用来更新 clamav 病毒数据库。数据库放置在 `/var/lib/clamav/`，且文件的用户和用户组都是 `clamav`。
- `clamd` 是 clamav daemon 进程，它会读取配置文件 `/etc/clamav/clamd.conf`。`clamd` 不会自动查毒。
- `clamdscan` 通知 `clamd` 进程进行查毒。通常执行 `sudo clamdscan --fdpass /`。
- `clamscan` 与 `clamd` 无关，直接根据当前命令参数执行查毒，因此也不会读取配置文件 `/etc/clamav/clamd.conf`。通常执行 `sudo clamscan -ri /`。
- `clamconf` 显示或生成 clamav 的配置文件。
