---
title: npm 发包
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
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
