---
title: wget 爬站
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


使用 wget 的 `-r` 参数可以爬取整个静态网站。动态网站爬不了。

推荐使用 [httrack](./httrack.md)。

## 常用参数

```sh
wget  -r -k -c -t 3 -T 120 -p -H -l inf -w 1 --limit-rate=200k -H -e robots=off --random-wait --no-check-certificate \
  -U  "Safari: Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_5 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Version/11.0 Mobile/15D60 Safari/604.1" \
  -D {只爬指定域名,逗号分隔} \
  --exclude-domains {排除某些域名,逗号分隔}
  {要爬取的地址}
```

不解释，自己看 man 手册。

## wget 爬站的缺点

### wget 不会阻止下载 html 文件

`-A`, `-R`, `--accept-regex`, `--reject-regex` 参数对于 html 链接是不起作用的。或者说跟一般人想的有点不一样。
wget 依然会先下载 html 文件，如果匹配到 reject 规则，下载后的文件它会自动删掉。真是令人窒息的操作...

要阻止下载 html 文件，只有 `-D` 和 `--exclude-domains` 参数有用。但这种方式只能根据域名过滤，无法根据 path 过滤。

### -k 参数只会在下载完所有文件后才开始转换

`-k` 或 `--convert-links` 参数的作用是把 HTML 里的链接转换成指向本地的相对链接。但是问题是它只会在所有文件都下载完后才开始转换。
如果你爬的站点非常大，一旦中断 wget，转换也就失效。就要从头来过。

### 没有抓取日志

抓取过程实时输出在 stdout，虽然可以用 tee 命令写到文件。但是查询错误日志很麻烦。
httrack 这工具有 hts-log.txt 记录错误 URL，很方便。
