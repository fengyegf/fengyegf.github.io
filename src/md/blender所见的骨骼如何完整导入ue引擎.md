---
title: blender所见的骨骼如何完整导入ue引擎
published: 2025-06-20
description: "简单讲解如何将blender中绑定好的骨骼完整导入不会掺杂其他的"
image: "https://wp-cdn.4ce.cn/v2/1fgOJTm.png"
tags: [blender, Unreal Engine5]
category: "教程分享"
draft: false
---

本期简单讲解一下如何将你看到的骨骼按照当前状态完整导入，不会出现多余骨骼

# 首先看看默认

也就是什么都不干的情况下使用 fbx 导出，在导入引擎

## 效果如下

:::Diff
![blender骨骼](https://wp-cdn.4ce.cn/v2/qp47jt7.png)
vs
![引擎骨骼](https://wp-cdn.4ce.cn/v2/6l5SXh1.png)
:::

我们理想的**效果**应该是

:::Diff
![blender骨骼](https://wp-cdn.4ce.cn/v2/qp47jt7.png)
vs
![引擎骨骼](https://wp-cdn.4ce.cn/v2/Rh0adZf.png)
:::

主要修改点为骨骼的叶骨
![image.png](https://wp-cdn.4ce.cn/v2/9qbgl0R.png)
其余轴向可以参考也可以不管
其实这个骨骼也是很迷
