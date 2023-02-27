# 不要对函数参数重新赋值

有两种情况：

## 其一

> 参考 https://spin.atomicobject.com/2011/04/10/javascript-don-t-reassign-your-function-arguments/ ([链接备份](https://web.archive.org/web/20220907152449/https://spin.atomicobject.com/2011/04/10/javascript-don-t-reassign-your-function-arguments/))

```js
function makePerson(favoriteColor, name, age) {
    if (arguments.length < 3) {
        favoriteColor = "green";
        name = arguments[0];
        age = arguments[1];
    }
    return {
        name: name,
        age: age,
        favoriteColor: favoriteColor
    };
};
var person = makePerson("Joe", 18);
console.log(JSON.stringify(person)); // => {"name":"green","age":"green","favoriteColor":"green"}
```

## 其二

```js
function foo(obj) {
    obj.a = 1;   // You should shallow clone this argument before assign properties.
    return obj;
}
var obj = {a: 2};
var bar = foo(obj);
console.log(bar, obj);  // => {a: 1} {a: 1}
```
