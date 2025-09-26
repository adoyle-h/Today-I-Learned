---
title: interface 与 nil
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## nil interface 与 nil 比较的坑

```go
package main

import "fmt"

type Cat interface {
  Meow()
}

type Tabby struct {}
func (*Tabby) Meow() { fmt.Println("meow") }

func GetACat() Cat {
  var myTabby *Tabby = nil
  return myTabby
}

func main() {
  c := GetACat();
  if c == nil {
    fmt.Println("It is nil")
  } else {
    fmt.Printf("It is not nil. %v, %T", c, c)
  }
}
```

这段代码会输出 `It is not nil. <nil>, *main.Tabby`。
因为 interface 的底层结构是 `<类型, 值>` 的二元组。Golang 是传值的。所以这里的变量 c 的值是 `nil`，但是类型是 `*Tabby`。
interface 只有当类型和值都是 nil，即 `<nil, nil>` 时，才等于 nil。其他情况都不等于 nil。

所以为了避免这类判断的问题，可以在函数返回时，判断带有 nil 的指针就直接 `return nil`。例如改成下面的样子，

```go
package main

import "fmt"

type Cat interface {
  Meow()
}

type Tabby struct {}
func (*Tabby) Meow() { fmt.Println("meow") }

func GetACat() Cat {
  var myTabby *Tabby = nil
  if myTabby == nil {
    return nil
  }
  return myTabby
}

func main() {
  c := GetACat();
  if c == nil {
    fmt.Println("It is nil")
  } else {
    fmt.Printf("It is not nil. %v, %T", c, c)
  }
}
```


另外要注意的是，不要用 `nil` 来表示操作成功或失败，应该利用函数的多值返回和 error 对象，来让调用者知道操作成功或失败。


## 如何判断 nil interface

参考[这个例子](https://gist.github.com/mangatmodi/06946f937cbff24788fa1d9f94b6b138)里的三个函数 `isNil`，`isNil`，`isNilBetter`。
