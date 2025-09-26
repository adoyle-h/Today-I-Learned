---
title: 使用 jquery 改变 React 的 input DOM
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---

由于 React 组件的状态都是存在内存里的，没法得到组件对象，就不能直接改变 state。
所以只能通过模拟鼠标和键盘的事件来与 React 组件交互。
但是普通的用事件触发，只能改变表明的 DOM 的值，改变不了 state。

所以要参考 React 做测试时用的 [simulated event](https://reactjs.org/docs/test-utils.html#simulate) 的原理来实现改变。

```js
let input = someInput;
let lastValue = input.value;
input.value = 'new value';
let event = new Event('input', { bubbles: true });
// hack React15
event.simulated = true;
// hack React16 内部定义了descriptor拦截value，此处重置状态
let tracker = input._valueTracker;
if (tracker) {
  tracker.setValue(lastValue);
}
input.dispatchEvent(event);
```

具体参见 https://github.com/facebook/react/issues/11488#issuecomment-347775628

https://github.com/facebook/react/blob/ed6798405d610a121b21a4cbf6f74c030e913e35/packages/react-dom/src/client/inputValueTracking.js#L112
