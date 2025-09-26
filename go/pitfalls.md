---
title: Go 语言的几大坑
created: 2023-03-13T22:44:13+0800
updated: 2023-03-13T22:44:13+0800
---


## nil slice 与 empty slice 的区别

```go
func main() {
  var s1 []string
  s2 := []string{}

  fmt.Printf("s1 == nil: %v\n", s1 == nil)  // s1 == nil: true
  fmt.Printf("s2 == nil: %v\n", s2 == nil)  // s2 == nil: false
}
```

阅读 [Golang: Nil vs Empty Slice (零值切片和空切片的坑)](https://qwqaq.com/2021/12/golang-slice-nil-vs-empty/) ([链接备份](https://web.archive.org/web/20221226232054/https://qwqaq.com/2021/12/golang-slice-nil-vs-empty/))。

## interface 的空值判断问题

```go
func main(){
  var a interface{} = nil
  var b interface{} = (*int)(nil)

  fmt.Println(a == nil)  // true
  fmt.Println(b == nil)  // false
}
```

阅读 [Go “一个包含nil指针的接口不是nil接口”踩坑](https://juejin.cn/post/6844903905797603335) ([链接备份](https://web.archive.org/web/20220901174714/https://juejin.cn/post/6844903905797603335))。

## append 一定返回新的 slice，但内部数组不一定是新的

得根据是否超出 cap 来判断。

```go
func main(){
  arr := []int{0, 1, 2}
  func(v []int) {
    v[0] = 100       // modify origin array
    v = append(v, 4) // new array allocated, and new slice variable
    v[0] = 50        // not modify origin array
  }(arr)
  fmt.Println(arr)   // [100 1 2]
}
```

```go
func main() {
  var arr = make([]int, 0, 5)
  arr = append(arr, 0, 1, 2)

  func(v []int) {
    v[0] = 100       // modify origin array
    v = append(v, 4) // no new array allocated, but new slice variable
    v[0] = 50        // modify origin array
  }(arr)

  fmt.Println(arr)   // [50 1 2]
}
```

## 数组是值传递

```go
func main() {
  x := [3]int{1, 2, 3}

  func(arr [3]int) {
    arr[0] = 7
    fmt.Println(arr) // [7 2 3]
  }(x)

  fmt.Println(x) // [1 2 3]
}
```

## slice 循环问题

```go
func main() {
  var out []*int
  for i := 0; i < 3; i++ {
    out = append(out, &i)
  }
  fmt.Println("value:", *out[0], *out[1], *out[2]) // value: 3 3 3
  fmt.Println("pointer:", out[0], out[1], out[2])  // pointer: 0x14000018178 0x14000018178 0x14000018178
}
```

```go
func main() {
  var out []*int
  for _, i := range []int{1, 2, 3} {
    out = append(out, &i)
  }
  fmt.Println("value:", *out[0], *out[1], *out[2]) // value: 3 3 3
  fmt.Println("pointer:", out[0], out[1], out[2])  // pointer: 0x14000018178 0x14000018178 0x14000018178
}
```

因为 `i` 始终是同一个变量，地址没变。

## 默认零值

当声明变量时未初始化，默认会根据类型赋予零值。

- 数值类型（包括整数、浮点数和复数）：`0`
- 布尔类型：`false`
- 字符串类型：`""` （空字符串）
- 指针类型：`nil`
- 接口类型：`nil`
- 函数类型：`nil`
- 切片类型：`nil`
- 映射类型：`nil`
- 通道类型：`nil`
- 结构体类型：其所有成员变量的默认零值

当 UnmarshalJSON 时，比如结构体定义了布尔类型的字段，无法区分是传了 `false` 还是没有传值，因为默认值就是 `false`。
解决方案是定义 `type ConvertibleBoolean bool` 以及 `func (bit *ConvertibleBoolean) UnmarshalJSON(data []byte)`。
参考 https://stackoverflow.com/a/37214476/4622308
