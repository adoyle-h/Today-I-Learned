## NTP 时间同步

[NTP 的概念](https://www.wikiwand.com/zh/%E7%B6%B2%E8%B7%AF%E6%99%82%E9%96%93%E5%8D%94%E5%AE%9A)。

当前阶层 0 以铯喷泉钟或者铷原子钟作为时钟源是最靠谱的。其次是氢原子钟或者石英晶体谐振器作为时钟源。

推荐用 [Chrony](https://chrony.tuxfamily.org/) 来同步时间。

### NTP 服务

排名有先后。

- 阿里云: https://help.aliyun.com/document_detail/92704.html
- 苹果: time.asia.apple.com
  - 查看你的 Mac 里的文件 `/etc/ntp.conf` 获知该地址
- 国际民用: https://www.ntppool.org/zh/use.html
- 国家授时中心: ntp.ntsc.ac.cn
  - [出处](http://www.ntsc.ac.cn/shye/tzgg/201809/t20180921_5086032.html)，然而据说国家授时中心的 NTP 很不靠谱。（应该是真的不靠谱，2018 年的这个链接都被特意删除了）
- 其他: https://dns.icoa.cn/ntp/

### Mac 无法使用 ntpq

`ntpq -q` 显示 ntpq: read: Connection refused

MacOS 使用自己的 timed 程序和 DAS 系统来代替 NTP 实现时间同步。具体看 `man timed` 里的描述。

参考[这篇文章](https://eclecticlight.co/2017/10/27/has-anyone-got-the-time-how-high-sierra-has-changed-time-synchronisation/)

### 参考资料

- [比较 ntpd、ntpdate、Chrony](https://zhuanlan.zhihu.com/p/44022718)
- [如何在 Linux 下确认 NTP 是否同步？](https://linux.cn/article-10951-1.html)
- [ntpd 与 ntpdate](https://escapelife.github.io/posts/969a8066.html)
