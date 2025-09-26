---
title: Ruby 代理镜像
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


https://gems.ruby-china.com/

- 如果使用 bundle，则 `bundle config mirror.https://rubygems.org https://gems.ruby-china.com`。
- 如果使用 gem，则 `gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/`

同时注意你的 Gemfile，

```ruby
source 'https://rubygems.org/'  # 这里必须是 https:// ，别写成 http://
gem 'rails', '4.2.5'
```
