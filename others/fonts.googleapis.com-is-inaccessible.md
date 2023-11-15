# fonts.googleapis.com 不可访问

其实 fonts.googleapis.com 在国内是可以访问的。但是可能因为你的 DNS 设置以及翻墙软件的设置，导致它不可访问。

```
# 你的电脑执行以下三行，比较结果
nslookup fonts.googleapis.com
# 国外解析
nslookup fonts.googleapis.com 1.1.1.1
# 国内解析
nslookup fonts.googleapis.com 223.5.5.5
```

可是，当使用国外 DNS 服务，fonts.googleadapis.com 会解析成国外 IP，这就导致无法直接访问。

很多翻墙规则项目会使用 [felixonmars/dnsmasq-china-list/](https://github.com/felixonmars/dnsmasq-china-list) 项目来生成代理规则。而且 [felixonmars/dnsmasq-china-list/google.china.conf](https://github.com/felixonmars/dnsmasq-china-list/blob/master/google.china.conf) 里是把 fonts.googleadapis.com 指向国内 DNS (114.114.114.114) 的。很多翻墙规则项目也会把这个域名设定为直连。

## 问题来了

于是我想到一个问题，fonts.googleadapis.com 的国内 IP，究竟是 google 原厂提供的服务，还是我国的代理服务？

我用 https://www.chaipip.com/ 查询 ip 归属地（我这查出来是 IP 是 180.163.150.33），发现位置锁定在上海市政府。（IP 经纬度可能有偏移，所以定位不一定准确，自己判断）

写到这里，就不展开了。
