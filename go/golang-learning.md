## Golang 学习

### 配置 Golang 开发环境

1. 安装 [gvm](https://github.com/moovweb/gvm)
1. `gvm listall` 查看可用版本
1. `gvm install $version -B` 安装二进制版本，这样比较快
1. `gvm use $version --default`
1. 设定 GOPATH
1. 配置代理，https://goproxy.io/ 或者 https://goproxy.cn/
1. 重启 shell
1. `go env` 确认 Go 环境变量
1. 安装 shell 补全工具，https://github.com/posener/complete/tree/master
1. 重启 shell
1. 安装 [gopls](https://github.com/golang/tools/tree/master/gopls#installation)
1. 安装 [gotags](https://github.com/jstemmer/gotags)
1. 配置你的编辑器

### 入门资料

1. [Go by Example 中文版](https://gobyexample-cn.github.io/)
2. [X 分钟速成 Y - Go](https://learnxinyminutes.com/docs/zh-cn/go-cn)
3. https://tour.go-zh.org/
4. [Draveness - Go 语言设计与实现](https://draveness.me/golang)
5. https://github.com/a8m/golang-cheat-sheet

### 命令

https://golang.org/cmd/go

### REPL

- https://play.golang.org/
- https://github.com/motemen/gore

### 目录规范

一般遵循 [project-layout](https://github.com/golang-standards/project-layout)。

但也有少部分项目是直接源代码平铺在项目根目录的。

### 编码规范

- [Uber Go Style Guide](https://github.com/uber-go/guide/blob/master/style.md)
- [Effective Go](https://golang.org/doc/effective_go.html)
- [Go Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments)
