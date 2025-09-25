---
title: fzf
---


## 当结果为空，关闭 preview 窗口

```
# This will show // even when the query is empty
: | fzf --preview 'echo /{q}/'

# But if you don't want it,
: | fzf --preview '[ -n {q} ] || exit; echo /{q}/'
```

See https://github.com/junegunn/fzf/commit/d649f5d8265b6c94ad5f2898d0c8851f9505e538
