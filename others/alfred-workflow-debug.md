---
title: Alfred Workflow debug 技巧
created: 2018-01-27T22:37:56+0800
updated: 2018-01-27T22:37:56+0800
---


## 将信息输出到 stderr，这样才能在调试窗口中看到

`>&2 echo "Log this output to the console"`

参考: https://www.alfredforum.com/topic/9170-alfred-3-tip-use-stderr-to-output-to-the-debug-console/

## 使用 python 模块

```
import sys

sys.stderr.write("Log this to the console")
```

## 将节点输出连接到 utilities/debug

参考: https://www.alfredapp.com/help/workflows/utilities/debug/
