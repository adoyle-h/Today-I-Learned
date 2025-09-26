---
title: CLD 图
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


[CLD (Causal Loop Diagram)][CLD] 是一种以有向图的方式可视化地展示一个系统里变量间的关系。

该图由节点和有向边组成，节点代表变量，有向边代表变量之间的关系。
边标记 `+` 号，代表两个节点的变化趋势是同向的，称作 S(Same) 型关系。
边标记 `-` 号，代表两个节点的变化趋势是反向的，称作 O(Opposite) 关系。

CLD 的概念出自于系统思考 (System Think)。


CLD 有两种回路：增强回路 (Reinforcing Loop) 和平衡回路 (Balancing loop)。

画 CLD 图的方法：

1. 寻找变量
2. 寻找因果
3. 寻找回路
4. 回路与主题的关系

CLD 图虽然呈现了变量间的关系，但没有表现关系的相关程度。可以再加个关于「程度」的标记来筛选弱回路。

（注意：以上都是我的个人意见，不具有权威性）


## 参考

- [CAUSAL LOOP CONSTRUCTION: THE BASICS](https://thesystemsthinker.com/causal-loop-construction-the-basics/)
- [大规模产品开发组织系统动态 - 第二章 系统思考](https://yilv.github.io/LargeScaleProductDevelopmentOrganization/Chapter2/SystemsThinking.html)

[CLD]: https://www.wikiwand.com/en/Causal_loop_diagram
