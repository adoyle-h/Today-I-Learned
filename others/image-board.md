---
title: 图床
created: 2024-06-24T05:49:47+0800
updated: 2024-06-24T05:49:47+0800
---


cloudflare r2 是一个对象存储服务。可以免费限额存储数据。

1. 先创建 bucket。
2. 配置域名。
3. 在「管理 R2 API 令牌」创建 API 令牌。限制只读写刚刚创建的 bucket。

[picgo](https://github.com/Molunerfinn/PicGo) 是个上传图片到对象存储服务的 GUI 工具。

1. 安装 picgo
2. 安装 s3 插件（不要安装 s3-lls）
3. 在图床设置-Amazon S3 里设置，以下都是必填项
  - 图床配置名：随便起名
  - 应用密钥 ID：填 cloudflare API 令牌「访问密钥 ID」的值
  - 应用密钥：填 cloudflare API 令牌「机密访问密钥」的值
  - 桶名：bucket 的名称
  - 自定义节点：填「为 S3 客户端使用管辖权地特定的终结点」的值
  - 代理：填自己的梯子的地址，如果没用代理，在中国无法成功上传
  - 自定义域名：填上面配置的域名
