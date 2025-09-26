---
title: 代码分离
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


使用 `import('your-path')` 语法，但因为目前还是 stage-3 状态，需要使用 `babel-plugin-syntax-dynamic-import` 插件来解析，否则不会生效。

但是这个插件不支持变量，比如 `import(variable)` 这样是不会代码分离的，参数必须是路径字符串。
