---
title: 状态机与状态图
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


- https://statecharts.github.io/
- https://github.com/davidkpiano/xstate
- https://sketch.systems/

- [How to model the behavior of Redux apps using statecharts](https://medium.freecodecamp.org/how-to-model-the-behavior-of-redux-apps-using-statecharts-5e342aad8f66) ([链接备份](https://web.archive.org/web/20221126090834/https://www.freecodecamp.org/news/how-to-model-the-behavior-of-redux-apps-using-statecharts-5e342aad8f66))
- [Are statecharts the next big UI paradigm?](https://www.slideshare.net/lmatteis/are-statecharts-the-next-big-ui-paradigm)
- [Statecharts - Controlling the behavior of complex systems](https://www.slideshare.net/lmatteis/statecharts-controlling-the-behavior-of-complex-systems)
- [Patterns for using React with Statechart-based state machines](https://medium.freecodecamp.org/patterns-for-using-react-with-statechart-based-state-machines-33e6ab754605) ([链接备份](https://web.archive.org/web/20221225155047/https://www.freecodecamp.org/news/patterns-for-using-react-with-statechart-based-state-machines-33e6ab754605))
- [The state reducer pattern](https://blog.kentcdodds.com/the-state-reducer-pattern-%EF%B8%8F-b40316cfac57) ([链接备份](https://web.archive.org/web/20221004124601/https://kentcdodds.com/blog/the-state-reducer-pattern))
- [高效設計 UI 狀態、以及無痛與工程師溝通的 FSM 表格](https://medium.com/@vinceshao/better-way-of-designing-ui-states-chinese-a5c43e46d391) ([链接备份](https://web.archive.org/web/20210430054937/https://medium.com/@vinceshao/better-way-of-designing-ui-states-chinese-a5c43e46d391))

## 不要混淆状态和数据

状态图是静置的。
数据是动态的。

## 状态图解决什么问题

显示定义 Model 的当前状态和未来状态。可预测未来状态。
以高层视角去理解应用的内部情况。

![what statecharts effect](https://cdn-images-1.medium.com/max/2000/1*HmQXVBOs0Srjr-USFvgcew.png)
([链接备份](https://web.archive.org/web/20230226193039/https://cdn-images-1.medium.com/max/2000/1%2AHmQXVBOs0Srjr-USFvgcew.png))
