## Go Module

Golang 管理模块有两种模式：

- GOPATH Mode: go 从 [vendor][1] 和 `$GOPATH` 下寻找依赖，不支持多版本。
- Module-Aware Mode: go 不再考虑 GOPATH，仅仅使用 `$GOPATH/pkg/mod` 目录下的依赖，目录名包含版本号，所以支持多版本共存。

在 1.12 版本之前，使用 Go modules 之前需要环境变量 `GO111MODULE`：

- `GO111MODULE=off`: 不使用 module-aware mode。
- `GO111MODULE=on`: 使用 module-aware mode，不会从环境变量 `GOPATH` 下面查找依赖包。
- `GO111MODULE=auto` 或不设置 `GO111MODULE` 变量: Golang 自己检测是不是使用 Module-Aware Mode。


## 缓存机制

https://golang.org/ref/mod#module-cache


[1]: https://golang.org/cmd/go/#hdr-Vendor_Directories
