---
title: npm 发包
---


## npm publish

```sh
# 发布到 latest tag
npm publish

# 发布到指定 tag
npm publish --tag $tag
```

## npm tag

```sh
# 查看某个包的所有 tag
npm dist-tag ls $pkg

# 删除某个包的 tag
npm dist-tag rm $pkg $tag

# 给指定版本添加 tag
npm dist-tag add $pkg@$version $tag
```
