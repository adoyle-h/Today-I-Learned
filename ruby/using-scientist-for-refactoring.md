---
title: 使用 scientist 科学重构代码
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


[github/scientist][] 这个库用于重构代码后，在生产环境中做实际检测用的。因为测试并不充分，有时需要在生产环境试试才行。

```ruby
require "scientist"

class MyWidget
  def allows?(user)
    experiment = Scientist::Default.new "widget-permissions"
    experiment.use { model.check_user?(user).valid? } # old way
    experiment.try { user.can?(:read, model) } # new way

    experiment.run
  end
end
```

在生产环境中 use 和 try 中的代码块都会执行，然而只会返回 use 代码块的结果，try 代码块的结果会与 use 的结果进行比较，并不会对其他代码产生影响。

所以要保证 try 的代码必须不会影响到数据库这种第三方服务的。

重构代码是为了保证不影响原有逻辑的前提下，提升代码执行效率、代码可读性以及代码组织等等。

这还有个 nodejs 版本的 https://github.com/ziyasal/scientist.js

参考：

- [Github - Scientist: Measure Twice, Cut Over Once](http://githubengineering.com/scientist/)
- [InfoQ - GitHub 推出 Scientist，帮助开发者重构关键路径代码](http://www.infoq.com/cn/news/2016/02/github-scientist-refactoring)

[github/scientist]: https://github.com/github/scientist
