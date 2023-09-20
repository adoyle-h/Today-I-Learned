# PAM

插入式验证模块 (PAM, Pluggable Authentication Module) 是 Linux 系统级用户认证框架。

`/etc/pam.d/` 目录专门用于存放 PAM 配置。不同的安装包的配置文件都被放在该目录，在运行时被不同的应用程序加载。

`/etc/security` 包含了对认证方法参数的系统级配置。

passwd、SSH、FTP 等程序都会用到 PAM。

## PAM 模块

- pam_unix.so
- pam_wheel.so      限制用户登录
- pam_tally.so      限制登录
- pam_env.so        设置环境变量
- pam_access.so     控制访问者地址与账号名称
- pam_listfile.so   控制访问者的账号名称或登录位置
- pam_limits.so     控制为用户分配的资源，详见 /etc/security/limits.conf
- pam_rootok.so     对管理员(uid=0)无条件允许通过
- pam_userdb.so     设定独立用户账号数据库认证
- pam_securetty.so  限制系统管理员 root 只能从安全的终端机登录。(/etc/security 文件中配置)
- pam_nologin.so    限制普通用户是否能够登录主机。当 /etc/nologin 文件存在时, 所有普通用户均无法登录系统，且打印出 /etc/nologin 的内容。对 root 用户以及已经登录的一般账号没有影响。
- pam_selinux.so    将 SELinux 暂时关闭，等到验证通过后，再予以启动
- pam_console.so    用户可以通过特殊终端接口 (console) 登录系统。
- pam_loginuid.so
- pam_pwquality.so  检验密码强度，密码多次失败就锁定等功能
