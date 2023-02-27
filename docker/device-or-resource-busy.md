## device or resource busy

当执行 `docker rm` 有可能遇到 device or resource busy 无法删除容器的情况。
这是 docker 的[老毛病](https://github.com/moby/moby/issues/22260)，真实原因未探明，网上的文章看起来都不像是彻底明白问题所在，总之解决方法如下：

通常是因为这个文件被除了容器进程的其他进程 mount 了，导致容器无法释放。
例如执行 `docker rm` 时报错:

```
Error response from daemon: driver "overlay" failed to remove root filesystem for 34d2340b73edd5466a675918c0f0d4567a68970d24065b45288c46926f4c8815: remove /var/lib/docker/overlay/edcb91e85162c7867a9816af6d24ca168c0506989069b728931b9586a578ff2e/merged: device or resource busy
```

拷贝这个 overlay 前部分路径比如 `edcb91`，
`grep -R "edcb91" /proc/*/mountinfo` 就能看到占用这个路径的进程号是什么，比如 `/proc/8442/mountinfo`，
那么就用 `ps -ef | grep 8442` 或者 `lsof -p 8442` 来看该进程具体是什么。
关闭那个进程后，应该就可以 `docker rm` 容器了。

这个方法不能解决问题的话，重启机器一定可以解决问题。

### 使用 docker 17.12.1 以上版本

官方 Contributor 说已在 17.12.1 版本中修复，可以尝试升级来解决该问题。

https://github.com/moby/moby/issues/27381#issuecomment-372394900

### 参考文章

- [Kissingwolf's Blog - Docker 故障（device or resource busy）](https://web.archive.org/web/20200927142257/http://blog.kissingwolf.com/2017/09/09/Docker-%E6%95%85%E9%9A%9C%EF%BC%88device-or-resource-busy%EF%BC%89/)
- [Docker中的device or resource busy问题分析](http://niusmallnan.com/2016/12/27/docker-device-resource-busy/) ([链接备份](https://web.archive.org/web/20220625011735/http://niusmallnan.com/2016/12/27/docker-device-resource-busy/))
- [解决docker删除container出现device or resource busy](https://qiita.com/domino-jiang/items/d1cac56e68fba67893e3) ([链接备份](https://web.archive.org/web/20211104042234/https://qiita.com/domino-jiang/items/d1cac56e68fba67893e3))
