## 修正 alpine 镜像的时区问题

执行 `date -R` 可以看到默认时区是 0 时区。

设置 `export TZ=Asia/Shanghai` 默认不会起作用。需要安装 tzdata 包。`apk add tzdata` 来解决。
参考这两个链接。

- https://www.grainger.xyz/timezone-in-docker-alpine-not-using-environment-variable-tz/
- https://github.com/gliderlabs/docker-alpine/issues/136#issuecomment-272703023


其他系统，推荐阅读「[Docker 时区调整方案](https://cloud.tencent.com/developer/article/1626811)」
