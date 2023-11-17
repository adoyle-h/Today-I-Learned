# fonts.googleapis.com 不可访问

测试[这个链接](https://fonts.googleapis.com/css?family=Roboto:300,400,500%7CMaterial+Icons+Outlined)能否打开。

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

根据 [felixonmars/dnsmasq-china-list/google.china.conf](https://github.com/felixonmars/dnsmasq-china-list/blob/master/google.china.conf) 的列表。我用 https://www.chaipip.com/ 查询 IP 高精度归属地。

|--------------------------------|--------------------|--------------------------------------|
| 域名                           | 223.5.5.5 解析地址 | 地址                                 |
|--------------------------------|--------------------|--------------------------------------|
| fonts.googleadapis.com         | 180.163.150.33     | 上海市政府                           |
| dl.google.com                  | 220.181.174.225    | 北京正义路，公安部旁边的一幢不明建筑 |
| download.tensorflow.google.com | 180.163.151.162    | 上海市政府                           |
| accounts.googlers.com          | 58.63.233.125      | 广州市珠江附近                       |
| goto.google.com                | 58.63.233.125      | 广州市珠江附近                       |
|--------------------------------|--------------------|--------------------------------------|

IP 经纬度可能有偏移，所以定位不一定准确，自己判断。

写到这里，就不展开了。
