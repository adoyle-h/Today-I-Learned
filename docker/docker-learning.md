## 学习 Docker

### 学习资料

- [docker-cheat-sheet](https://github.com/wsargent/docker-cheat-sheet)
- [Docker — 从入门到实践](https://github.com/yeasy/docker_practice)

### 代理

因为国内用 docker pull 会非常慢。建议使用阿里云的 docker 镜像加速。得到 mirror 地址，对于 dokcer for mac 用户，打开设置 - Docker Engine，加上这段配置，

```json
{
  "registry-mirrors": [
    "https://你的地址.mirror.aliyuncs.com"
  ]
}
```

这里必须用 https，虽然可能提示证书不对。使用 http 会无效。


### [制作镜像](./dockerfile.md)

#### alpine apk update 总是失败

使用 `until apk update; do sleep 1; done` 让它失败后重装直到成功。

#### docker-alpine 删除缓存

`apk cache clean` 无效，因为默认没有开启 `Local Cache`。可以在最后执行 `rm -rf /var/cache/apk/*` 来删除缓存。

### 学习 swarm

[play-with-docker](https://github.com/play-with-docker/play-with-docker) 这个非常酷，便于学习搭建 swarm 集群。

### 工具

- [dockward](https://github.com/abiosoft/dockward): 简单地端口转发到容器，不需要配置 nginx

### 常用命令

`docker system df` 查看 image/container/volume 在本机的数据占用情况

`docker info` 查看 docker 服务器和客户端信息，实际调用的是 `docker system info`
