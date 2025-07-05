# systemd-networkd

## systemd-networkd 与 ifupdown

systemd-networkd 和 ifupdown 是两种不同的网络管理方式，彼此独立、互斥，你在实际使用中只能选其一来管理网络接口。


| 项目   | `systemd-networkd`               | `ifupdown`                |
| ---- | -------------------------------- | ------------------------- |
| 类型   | 现代的网络管理器（Systemd组件）              | 传统的网络管理脚本系统               |
| 配置文件 | `.network`、`.netdev`、`.link` 等   | `/etc/network/interfaces` |
| 控制工具 | `networkctl`                     | `ifup` / `ifdown`         |
| 动态能力 | 支持 DHCP、桥接、VLAN、路由、容器网络等         | 功能较有限，需依赖外部工具             |
| 服务进程 | `systemd-networkd.service`       | 无守护进程，仅在启动或命令时执行          |
| 配置方式 | 分布式配置文件（每个接口一个 `.network`）       | 集中配置文件（一个文件内写多个接口）        |
| 日志查看 | `journalctl -u systemd-networkd` | 无统一日志，靠脚本输出               |
| 启用方式 | 需启用 `systemd-networkd` 服务        | 默认在 Debian 系统一般启用         |


### 相关目录与文件

- systemd-networkd
  - /usr/lib/systemd/network/   : 系统默认配置

    * **用途**：这是 **系统级别** 的 `systemd-networkd` 配置目录。
    * **说明**：通常由 **发行版或软件包管理器提供的默认配置** 文件放在这里。
    * **优先级**：优先级**最低**，会被 `/etc/systemd/network/` 中同名文件覆盖。
    * **不要手动修改**，否则系统升级可能覆盖你改的内容。

  - /etc/systemd/network/       : 用户自定义配置

    * **用途**：这是用于 `systemd-networkd` 的 **用户自定义配置** 目录。
    * **说明**：
      * 用来配置网络接口的 `.network`、`.netdev`、`.link` 文件等。
      * 优先级高于 `/usr/lib/systemd/network/`。
    * **推荐写配置的地方**，因为这里不会被系统升级覆盖。

- ifupdown
  - /etc/network/interfaces     : 主配置文件

    * **用途**：传统的 `ifupdown` 网络管理工具的主配置文件。
    * **说明**：内容比如

        ```ini
        auto eth0
        iface eth0 inet dhcp
        ```

  - /etc/network/interfaces.d/  : 子配置文件

    * **用途**：是 `/etc/network/interfaces` 的**包含目录**。
    * **说明**：你可以将接口配置文件分散到多个小文件中，这样方便模块化管理。
      * 比如可以在里面放一个 `eth0.cfg` 来配置 eth0 接口。

  - /etc/network/if-up.d/       : 启动后执行脚本

    * **用途**：当某个接口 **成功启动后（ifup）**，执行这里的脚本。
    * **说明**：可用于自动化任务，比如：
      * 接口启动后自动添加路由、配置防火墙规则等。
      * 放入的是可执行脚本。
      * 举例：`/etc/network/if-up.d/iptables-restore`

### .link 与 .network 文件

`.link` 与 `.network` 文件都是 `systemd-networkd` 的配置文件，但用途不同，分别用于不同层级的网络配置。


| 特性   | `.link` 文件              | `.network` 文件              |
| ---- | ----------------------- | -------------------------- |
| 作用对象 | 网络设备                    | 网络接口                       |
| 配置内容 | 名字、MAC、MTU 等            | IP、DHCP、DNS、路由等            |
| 作用时机 | 网络设备识别后                 | 接口由 `systemd-networkd` 管理时 |
| 优先路径 | `/etc/systemd/network/` | `/etc/systemd/network/`    |
| 是否必需 | 否（可选）                   | 是（至少一个用于启用网络）              |


#### .link 文件 —— 设备层级的命名和属性设置

* **作用**：配置**网络接口设备**本身的属性，比如重命名、MAC 地址等。
* **作用时机**：在网络设备被内核识别后立即生效，**早于网络配置**。
* **常见用途**：
  * 给接口**重命名**（如将 `enp0s3` 改为 `lan0`）
  * 设置 MAC 地址
  * 设置 MTU
  * 设置 Wake-on-LAN
* **文件放置路径**：
  * 系统默认文件在 `/usr/lib/systemd/network/*.link`
  * 用户自定义推荐放在 `/etc/systemd/network/*.link`
- 示例：

  ```ini
  [Match]
  MACAddress=00:11:22:33:44:55

  [Link]
  Name=lan0
  MTUBytes=1500
  ```

#### .network 文件 —— 接口层级的 IP 与网络连接设置

* **作用**：配置网络接口的 **IP 地址、网关、DNS、路由、DHCP 等**。
* **作用时机**：接口设备建立后由 `systemd-networkd` 加载应用。
* **常见用途**：
  * DHCP 客户端配置
  * 静态 IP 地址分配
  * 设置默认网关
  * 设置 DNS
* **文件放置路径**：
  * 系统默认文件在 `/usr/lib/systemd/network/*.network`
  * 用户自定义推荐放在 `/etc/systemd/network/*.network`
- 示例：

  ```ini
  [Match]
  Name=lan0

  [Network]
  DHCP=yes
  DNS=8.8.8.8
  ```

## 网络启动流程

https://systemd.io/NETWORK_ONLINE/ ([链接备份](https://web.archive.org/web/20230425211003/https://systemd.io/NETWORK_ONLINE/))

## 常用命令

- 查看网络: networkctl list

## systemd-networkd-wait-online: Timeout occurred while waiting for network connectivity

systemd-networkd-wait-online 会等待所有网络链接可用才会正常退出，否则会等到超时。

`sudo systemctl edit --full systemd-networkd-wait-online.service` 将 `ExecStart=/usr/lib/systemd/systemd-networkd-wait-online` 改为 `ExecStart=/usr/lib/systemd/systemd-networkd-wait-online --any`。

加上 `--any` 参数，只要有一个可用就退出。

`/usr/lib/systemd/systemd-networkd-wait-online --help` 可查看命令详情。
