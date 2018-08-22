## Mac 的 DNS 问题

### nslookup 能解析域名，但是 ping 解析不了域名

`sudo killall -HUP mDNSResponder` 可以解决这个问题。

参考文章

- https://qiita.com/set0gut1/items/100385f55061db76ac4f
- https://gist.github.com/mipmip/1844353
