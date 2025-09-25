---
title: svn 设置代理加速
---


如果存在 `~/.subversion/servers`，先修改这个文件，如果没有，修改 `/etc/subversion/servers`。

```
[global]
# http-proxy-exceptions = *.exception.com, www.internal-site.org
http-proxy-host = 192.168.1.2
http-proxy-port = 1234
# http-proxy-username = defaultusername
# http-proxy-password = defaultpassword
# http-compression = auto
# No http-timeout, so just use the builtin default.
# ssl-authority-files = /path/to/CAcert.pem;/path/to/CAcert2.pem
```
