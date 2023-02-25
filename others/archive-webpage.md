# 永久链接

互联网没有永久存在的资源，终有一天你会发现原来的域名过期了，网页内容布局修改了，资源搬迁甚至直接消失。

相对可以信赖的只有 archived 服务。这类服务在自身存活的时间内，永久保存网页当时的内容快照。

## 使用场景

1. 当你打开某网络资源，发现它已经失效了。可以到 archived 服务查看是否有备份。
2. 当你引用某网络资源，担心有一天它会失效。可以备份到 archived 服务，从而引用备份链接。

网络资源包括网页、图像、声音、电子书等一切数字资源。

## 推荐服务

## Internet Archive

https://archive.org/

优点：

1. 资金稳定，所以该服务的存活时间最稳定
2. 支持自动抓取。
3. 支持保存网页的同时备份页面截图。

缺点：

1. 生成的链接长度很长
2. 阅读体验不够好

推荐使用浏览器插件，查询和保存都很方便。

- [Chrome](https://chrome.google.com/webstore/detail/wayback-machine/fpnmgdkabkmnadcjpehmlllkndpkmiak)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/wayback-machine_new/)
- [Safari](https://apps.apple.com/us/app/wayback-machine/id1472432422)
- [Edge](https://microsoftedge.microsoft.com/addons/detail/wayback-machine/kjmickeoogghaimmomagaghnogelpcpn)

## Archive Today

曾经的 [archive.is](https://www.wikiwand.com/zh/Archive.is)，现在的 Archive.today。

优点：

1. 生成短链接
2. 阅读体验不错
3. 支持通配符来批量保存页面
4. hash tag 支持滚动百分比以及任意位置的引用

缺点：

1. 私人资助，服务器在法国，因此可能不稳定。
2. 域名会动态变。
3. 每次使用都要验证校验码，很麻烦。
4. 保存的页面只来自用户提交的，不自动抓取。

它还有其他几个域名，都指向同一个服务。

- https://archive.ph/
- https://archive.is/
- https://archive.md/

### 浏览器书签

不需要安装浏览器插件，只需要创建浏览器书签。

#### 查询用书签

链接地址填 `javascript:void(open('http://archive.ph/'+encodeURIComponent(document.location)))`

点击书签即可在 Archive.today 查询当前页面的记录。

#### 保存用书签

链接地址填 `javascript:void(open('http://archive.ph/?run=1&url='+encodeURIComponent(document.location)))`

点击书签即可将当前页面保存到 Archive.today。

## https://perma.cc/

一个比较新的 archived 服务。界面很友好。只是不知道稳不稳定

## 参考文章

- [留下证据：如何存档开源材料？](https://archive.ph/yuVm7)
- [个人博客存入互联网博物馆 Archive.org](https://archive.ph/9fgTy)
