---
title: hash 命令
---


- cksum: crc32 算法
- shasum: sha1 算法(默认)
- md5: md5 算法

```sh
𝕬 (master $=) shasum README.md
895c0efdc61580d5d671a131a952bb7e7c2399e6  README.md

𝕬 (master $=) md5 README.md
MD5 (README.md) = acde1694e0a5ed6c5e52494e38ced19f

𝕬 (master $=) cksum README.md
1576321070 8720 README.md
```

都是用来计算文件 hash，只不过算法不同，碰撞几率不一样罢了。根据场景选择合适的算法。

这只是比较常见的三个算法，实际上还有非常多的 hash 算法。
