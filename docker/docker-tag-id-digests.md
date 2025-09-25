---
title: Docker Tag/Id/Digest
---


「此为草稿」

Docker image/layer 的 id 和 digest 设计

- [Explaining Docker Image IDs](https://windsock.io/explaining-docker-image-ids/)
- https://gist.github.com/aaronlehmann/b42a2eaf633fc949f93b

## 各个命令的参数

```
Usage:  docker inspect  [OPTIONS] NAME|ID [NAME|ID...]
Usage:  docker images   [OPTIONS] [REPOSITORY[:TAG]]
Usage:  docker image ls [OPTIONS] [REPOSITORY[:TAG]]
Usage:  docker pull     [OPTIONS] NAME[:TAG|@DIGEST]
Usage:  docker save     [OPTIONS] IMAGE [IMAGE...]
Usage:  docker rmi      [OPTIONS] IMAGE [IMAGE...]
Usage:  docker load     [OPTIONS]
Load an image from a tar archive or STDIN
Options:
  -i, --input string   Read from tar archive
                       file, instead of STDIN
  -q, --quiet          Suppress the load output

Usage:  docker tag      SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
```

注意点

- docker images 只能查 Tag，查不了 DIGEST。只有 docker inspect 能查 DIGEST

## 无名无版本号的镜像

docker pull DIGEST 时，导出的镜像的 name 和 tag 都是 `<none>`。

## Docker Tag
## Docker Id
## Docker Digest

## Docker save

## 实验

「待改成 Ansible Playbook」

```bash
> docker pull alpine:latest
> docker inspect alpine:latest | head -n 14
[
    {
        "Id": "sha256:961769676411f082461f9ef46626dd7a2d1e2b2a38e6a44364bcbecf51e66dd4",
        "RepoTags": [
            "alpine:latest"
        ],
        "RepoDigests": [
            "alpine@sha256:72c42ed48c3a2db31b7dafe17d275b634664a708d901ec9fd57b1529280f01fb"
        ],
        "Parent": "",
        "Comment": "",
        "Created": "2019-08-20T20:19:55.211423266Z",
        "Container": "0a80155a31551fcc1a36fccbbda79fcd3f0b1c7d270653d00310e6e2217c57e6",
        "ContainerConfig": {

---
title: 分别根据 SHA、Tag、Id 导出镜像
---

> docker save alpine@sha256:72c42ed48c3a2db31b7dafe17d275b634664a708d901ec9fd57b1529280f01fb -o image-sha
> docker save alpine:latest -o image-tag
> docker save 961769676411 -o image-id

> docker images alpine:latest

# 清空 alpine 所有镜像
> docker images alpine -q | xargs docker rmi

# 加载 SHA 镜像
> docker load -i image-sha
03901b4a2ea8: Loading layer  5.844MB/5.844MB
Loaded image ID: sha256:961769676411f082461f9ef46626dd7a2d1e2b2a38e6a44364bcbecf51e66dd4

> docker images -a alpine
# 找不到 alpine 镜像

> docker images -a
# 貌似真找不到 alpine 镜像

> docker inspect alpine:latest | head
Error: No such object: alpine:latest
[]

> docker inspect 961769676411
# 可以找到这个镜像

> docker inspect alpine@sha256:72c42ed48c3a2db31b7dafe17d275b634664a708d901ec9fd57b1529280f01fb
[]
Error: No such object: alpine@sha256:72c42ed48c3a2db31b7dafe17d275b634664a708d901ec9fd57b1529280f01fb

> docker images | grep 961769676411
<none>                                                                <none>              961769676411        6 days ago          5.58MB

docker inspect 961769676411 | head
[
    {
        "Id": "sha256:961769676411f082461f9ef46626dd7a2d1e2b2a38e6a44364bcbecf51e66dd4",
        "RepoTags": [],
        "RepoDigests": [],
        "Parent": "",
        "Comment": "",
        "Created": "2019-08-20T20:19:55.211423266Z",
        "Container": "0a80155a31551fcc1a36fccbbda79fcd3f0b1c7d270653d00310e6e2217c57e6",
        "ContainerConfig": {

> docker images alpine:latest -q | xargs docker rmi
```
