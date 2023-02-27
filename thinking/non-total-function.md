## 不完整的函数

先说什么是“完整的函数”(total function)

> A total function is setup to handle all possible input values, not just those parameter values that are expected when the software functions normally.[^1]

[^1]: https://web.archive.org/web/20190219232204/https://lars-lab.jpl.nasa.gov/JPL_Coding_Standard_C.pdf


然而我们编写的程序函数都是不完整的。原因在于输入参数，我们大多只针对期望的值进行编码。

所以，当遇到某些不正常的情况时，如何处理是个难题。比如“除以零”的问题，函数应该返回什么，还是抛出错误 (throw an error)？

### 函数定义域

限制函数定义域的范围。

假设有函数 `function div(a, b) {return a / b;}`，作用是做除法运算。

对于 a，b 的类型，我们可以定义 Int 或者 Float 类型，然而很少会有编程语言提供 ZeroExcludedInt 类型。

所以 dev 函数无法处理 b 为 0 的情况，在很多编程语言里会抛出运行时错误，导致函数无法继续计算下去。

我们当然可以约定不给 b 传 0，从而避免这种意外情况。但是这样就需要代码和程序员共同维护这份逻辑，然而人是不稳定因素，无法百分百确定一定不会传 0。
而且就 div 函数本身来说，它无法将定义域的所有成员映射到值域，所以它是不完整的函数 (non-total function)。

### 将不完整转变为完整

1. 缩减定义域
2. 对所有情况都进行应对处理

对于第二种情况，有以下应对措施：

- 人为捕捉错误，如 try/catch 机制。
- 返回 (return) 一个特殊的值，比如 `-1`，`0`，`null`。
- 返回一个特殊的类实例，比如空对象、空数组、空指针，又比如 `Maybe`、`Nothing` 类型。
- 返回一个正常值，就好像没有发生错误一样。（函数吞没了错误，调用者很可能难以察觉异常）
- 返回以上介绍的值或类实例，然后通过某种机制来通知系统发生了错误。比如发邮件，比如给全局错误管理器发送消息。

### 不完整 ≠ 不完美

可以保持函数的不完整，假设有个不完整函数 f(a)，只要在调用 f(a) 之前，对数据进行过滤处理，只给 a 填充 f 能接受的数据。这样也是一种完美的解决方案。

### 参考

- https://stackoverflow.com/q/19647180/4622308
