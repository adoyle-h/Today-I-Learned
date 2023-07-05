# volume 单个文件到容器

docker 只支持从宿主机挂载单个文件。

对于独立的 volume。docker 不支持挂载 volume 里的单个文件或者子目录。

详见 https://github.com/moby/moby/issues/30310 和 https://github.com/moby/moby/issues/32582 。
