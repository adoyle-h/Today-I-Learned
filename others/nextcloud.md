---
title: nextcloud
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


私人网盘。功能非常强大，UI 很友好。

## 连接 SMB 服务

需要开启外部存储功能。点击「右上角头像-应用-您的应用-External storage support」，启用它。

然后点击「右上角头像-设置-外部存储」。

如果这时候显示 `"smbclient" 未安装。无法挂载 "SMB / CIFS", "SMB / CIFS 使用 OC 登录信息"`，需要手动安装 smbclient。

```sh
# 安装 libsmbclient.so 文件
apt install libsmbclient-devel -y
# nextcloud 是 php 写的，因此 php 也要安装 smb 客户端插件
pecl install smbclient

# 这是容器的 php 配置路径。如果是其他非容器的平台，需要找到对应的文件路径。
echo 'extension=smbclient' > /usr/local/etc/php/conf.d/docker-php-ext-smbclient.ini
```

如果遇到其他问题，详细参考下面文章

- [Nextcloud挂载SMB/CIFS外部存储](https://archive.ph/pyVRM)
- [nextcloud - Configuring External Storage (GUI)](https://docs.nextcloud.com/server/22/admin_manual/configuration_files/external_storage_configuration_gui.html)
