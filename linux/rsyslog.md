---
title: rsyslog
---


https://www.rsyslog.com/

## 配置

rsyslog 支持三类配置语法：

- `basic` sysklogd。一个规则要写在一行，不支持换行。
- `advanced` RainerScript。这个语法支持换行。
- `obsolete legacy`。不要使用 `obsolete legacy` 语法。在基础配置使用 `basic` 语法，其他配置都用 `advanced` 语法。
- `# 注释` 或者 `/* 注释 */`

配置文件 /etc/rsyslog.conf

## Action

保存到文件，`cron.* -/var/log/cron.log` 如果路径前有 `-` 则表示异步写入磁盘。
