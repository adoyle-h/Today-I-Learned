---
title: Shell 操作文件描述符
---


- 创建文件描述符：（`fd` 填数字）
  - 创建读写的 `exec fd<> fileName`。如果文件不存在，会自动创建。
  - 创建只读的 `exec fd< fileName`
- 关闭文件描述符：`exec fd>&-` 或 `exec fd<&-`。`>&` 与 `<&` 效果一样。
- 写文件：`echo "hello" >&fd`
- 读文件：`while read -r line 0<&fd; do ...` 或 `cat <&fd`
