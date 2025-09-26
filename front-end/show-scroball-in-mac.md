---
title: Mac 浏览器中显示滚动条
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


```css
::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
}
::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0,0,0,.5);
    box-shadow: 0 0 1px rgba(255,255,255,.5);
}
```

http://simurai.com/blog/2011/07/26/webkit-scrollbar
