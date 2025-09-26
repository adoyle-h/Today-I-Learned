---
title: MacOS 彻底删除搜狗输入法
created: 2023-07-12T21:49:41+0800
updated: 2023-07-12T21:49:41+0800
---


从官网下载安装包，点击安装包，点击拆卸选项。然后执行下面的代码。

```sh
rm -rf ~/Library/Caches/com.sogou.*
rm -rf ~/Library/Caches/SogouServices
rm -rf ~/Library/HTTPStorages/com.sogou.*
rm -rf ~/Library/Preferences/com.sogou.*
rm -rf ~/Library/Preferences/SogouServices.plist
rm -rf ~/Library/Application\ Support/Sogou
```
