# 网件 R6900 刷梅林固件

网件 R6900 与 R7000 硬件配置一样，只是少一个 USB 接口的差别。以下都用 R7000 统称。

网件 R7000 虽然也可以刷 openwrt 固件，但是 openwrt 到目前为止都有个问题没解决：[WIFI 2.4G 不支持](https://openwrt.org/unsupported/wifi_2.4ghz_partly)。因此不推荐 R7000 刷 openwrt。

网络上网件刷梅林固件的事例挺多，于是我开始刷梅林固件。
我不推荐梅林官方固件和国内 koolcenter 固件。因为网上都没有网件 R7000 的靠谱教程，风险非常高。

推荐 [XWRT-VORTEX](http://xvtx.ru/xwrt/about.htm) 固件，它是基于 Asuswrt-Merlin 的一个移植版。目标是在非华硕的路由器使用梅林固件。
它目前支持网件 R6700、R7000 以及思科 EA6900 这几款路由器。它是从最新的 Asuswrt-Merlin 修改编译而成。

刷机很简单，下载文件后解压，登录路由器管理界面，升级固件页面上传对应的固件文件即可。
（以 386.3_2 版本为例）`R7000_386.3_2.chk` 用于从网件固件刷到梅林固件。`R7000_386.3_2.trx` 用于从梅林固件刷到这个版本的梅林固件。根据当前路由器选择对应的固件就行。

**需要注意的一点**：装完固件后，登录管理界面，查看「系统管理-系统设置-Persistent JFFS2 partition」有两个选项，`Format JFFS partition at next boot`	和 `Enable JFFS custom scripts and configs`	都选**是**。然后重启系统，可能需要 5~10 分钟，耐心等待，切勿断电和手动重启，直到完成。重新连上后再检查 `Format JFFS partition at next boot` 选**否**。刷固件就顺利完成了。

## mount invalid argument

挂载 U 盘发现总是 invalid argument。格式化后重刷文件系统可以挂载上，但是重现拔插 U 盘后又是同样的问题。

经过各种尝试，我的结论是它不支持 ext4 文件系统。U 盘得刷成 ext3 才可以正常使用。
