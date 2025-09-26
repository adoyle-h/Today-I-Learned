---
title: 开发一个油猴 (Tampermonkey) 脚本
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


在浏览器编辑器里写脚本很麻烦。想用自己的编辑器，但又不想每次都复制粘贴。

首先要让浏览器允许 Tampermonkey 访问你的本机文件地址。如果你用 chrome，插件管理中有个「允许访问文件网址」选项。
然后使用 `@require` 指向本地路径，比如这么写：

```
// ==UserScript==
// @name         本地开发脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.douban.com/
// @grant        none
// @require      file:///Users/adoyle/Workspace/test.js
// ==/UserScript==
```

这样就可以用自己的编辑器打开 `/Users/adoyle/Workspace/test.js` 文件来编辑了。
