## RPM 制作和安装离线包

<!-- MarkdownTOC GFM -->

- [在有网环境制作离线包](#在有网环境制作离线包)
    - [yum install --downloadonly](#yum-install---downloadonly)
    - [yumdownloader](#yumdownloader)
    - [开启 yum 缓存](#开启-yum-缓存)
- [在离线环境安装 RPM 包](#在离线环境安装-rpm-包)
    - [yum install vs yum localinstall](#yum-install-vs-yum-localinstall)

<!-- /MarkdownTOC -->

### 在有网环境制作离线包

有以下几种方式，三选一。

1. yum install --downloadonly
2. 开启 yum 缓存
3. yumdownloader

#### yum install --downloadonly

`--downloadonly` 的意思是只下载，不安装。

对于 Centos/REHL 6 之前的版本，需要安装 `yum install yum-plugin-downloadonly` 才能支持这个参数。否则会报错 `Command line error: no such option: --downloadonly`。

yum 将会下载所有的依赖包。

`yum install --downloadonly --downloaddir=<path-to-cache-directory> <package-name>`

如果它显示 `Package <package-name> already installed and latest version Nothing to do`，则换用 reinstall，

`yum reinstall --downloadonly --downloaddir=<path-to-cache-directory> <package-name>`

#### yumdownloader

`yum install yum-utils` 安装 `yumdownloader`。

`yumdownloader <package-name>`，会只下载，不安装。且不会下载依赖包。

#### 开启 yum 缓存

详见[这篇文档](./yum.md#yum-缓存)。

### 在离线环境安装 RPM 包

先用 `createrepo` 创建本地软件仓库。然后在 `/etc/yum.repos.d/` 配置软件源指向本地仓库，最后用 yum install 来安装。

#### yum install vs yum localinstall

> In RHEL 5 and previous versions, yum install only accepted package names from enabled repositories, and did not accept paths to local RPMs; you had to use yum localinstall to install these.
>
> In RHEL 6 and later, yum install accepts both package names and local filenames, so localinstall is no longer necesary, but it's included for backward compatibility.

https://serverfault.com/a/940803/1006817
