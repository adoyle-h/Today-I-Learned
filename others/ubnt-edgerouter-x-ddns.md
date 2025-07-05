# Ubnt EdgeRouter-X DDNS 功能

ER-X（EdgeRouter X）默认的 EdgeOS 是基于 Vyatta 的精简版 Debian 系统。

## DDNS for Cloudflare

即使 er-x 更新到 v2.0.9-hotfix.7 版本，在管理员 Web 界面创建 DDNS 没有 Cloudflare 的选项。需要 ssh 到 er-x，执行下面的命令才能设置 DDNS。

我是在 ER-X 上进行拨号上网的，所以 `set service dns dynamic interface` 的目标是 pppoe0，因为它绑定的是外网 IP。


```sh
## 开始设置
configure

## 设置 Cloudflare 的 DDNS
set service dns dynamic interface pppoe0
set service dns dynamic interface pppoe0 service custom-cloudflare
set service dns dynamic interface pppoe0 service custom-cloudflare host-name your.example.com
set service dns dynamic interface pppoe0 service custom-cloudflare login your-cloudflare-login-email
set service dns dynamic interface pppoe0 service custom-cloudflare options zone=example.com
set service dns dynamic interface pppoe0 service custom-cloudflare password your-cloudflare-api-key
set service dns dynamic interface pppoe0 service custom-cloudflare protocol cloudflare
set service dns dynamic interface pppoe0 service custom-cloudflare server api.cloudflare.com/client/v4/

## 查看配置
show service dns dynamic interface pppoe0 service custom-cloudflare

## 保存设定
# Commit the current set of changes
commit
# Save configuration to a file: /config/config.boot
save

## 退出 configure
exit
```

configure 的 save 命令会将配置树保存到 /config/config.boot 文件。并且调用 vyatta-dynamic-dns.pl 命令脚本生成 /etc/ddclient/ddclient_pppoe0.conf 配置文件。

`sudo vi /etc/ddclient/ddclient_pppoe0.conf` 可查看内容。（注意要加上 sudo，否则文件内容是空的）

### ddclient

ER-X 的 DDNS 服务实际上调用 ddclient 命令来更新 IP。ddclient 实际是一个 perl 脚本。
`ls -l /usr/sbin/ddclient` 会发现它指向 `/usr/sbin/ddclient-ubnt`。

ER-X 的 ddclient 版本太落后，不支持 Cloudflare，需要手动改一下 ddclient 脚本。
`sudo vi /usr/sbin/ddclient`

```diff
--- /usr/sbin/ddclient
+++ /usr/sbin/ddclient
@@ -4249,9 +4249,14 @@
                my $key   = $hosts[0];
                my $ip    = $config{$key}{'wantip'};

-               my $headers = "X-Auth-Email: $config{$key}{'login'}\n";
-               $headers .= "X-Auth-Key: $config{$key}{'password'}\n";
-               $headers .= "Content-Type: application/json";
+               my $headers = "Content-Type: application/json\n";
+
+                if ($config{$key}{'protocol'} eq 'cloudflare') {
+                  $headers .= "Authorization: Bearer $config{$key}{'password'}";
+                } else {
+                  $headers .= "X-Auth-Email: $config{$key}{'login'}\n";
+                  $headers .= "X-Auth-Key: $config{$key}{'password'}";
+                }
```

然后需要在终端手动开启 DDNS。

```sh
## 查看 DDNS 更新状态
adoyle:~$ show dns dynamic status
interface    : pppoe0
host-name    : your.example.com
last update  : Thu Jan  1 08:00:00 1970
update-status: noconnect

## 开启 DDNS 更新
adoyle:~$ update dns dynamic interface pppoe0

## 会看到一分钟后更新
adoyle:~$ show dns dynamic status
interface    : pppoe0
[ Status will be updated within 60 seconds ]

## 一分钟后再查看，发现有 ip address
## 并且 update-status: good 说明更新成功了
adoyle:~$ show dns dynamic status
interface    : pppoe0
ip address   : 111.111.111.111
host-name    : your.example.com
last update  : Fri Jul  4 21:47:54 2025
update-status: good
```

另外，可以手动调试更新 IP，可以查看更多报错信息： `sudo ddclient -verbose -force -file /etc/ddclient/ddclient_pppoe0.conf`
