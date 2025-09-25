---
title: lua 没有 continue 关键字
---


可以用 `goto` 代替。

```lua
for i=1,10 do
  if i % 2 == 0 then goto continue end
  print(i)
  ::continue::
end
```
