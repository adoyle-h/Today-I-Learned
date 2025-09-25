---
title: Cloudflare Page
---


## production 分支

当你使用 API 上传 Cloudflare Page 时，可以指定分支名。

当你使用 wrangler pages deploy 时，可以用 `--branch` 参数指定分支名。

当你使用 https://github.com/cloudflare/wrangler-action ，它会读取 git 当前分支，然后上传到 Cloudflare Page。

只有分支名是 `main` 时，才代表 production 生产环境。其他分支名都代表 preview（预览）环境。

详见：https://developers.cloudflare.com/pages/configuration/branch-build-controls/
