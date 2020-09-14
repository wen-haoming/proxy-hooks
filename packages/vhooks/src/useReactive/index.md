---
title: useReactivity
order: 0
nav:
  title: hooks
  path: /hooks
group:
  title: hooks
  path: /hooks
---

## useReactive

基于 proxy 的使用，能够直接操作可变数据的进而刷新视图.

## 代码演示

<code src="./demo/index.tsx" desc="为了保持react的数据不可变性,`useReactive` 第一个参数 为操作数据的`可变对象`直接属性修改能够触发视图更新 , 第二个参数为一个`全新的引用地址` ,视图每次更新后都是一个全新的引用" />

## API

```js
let [state, immutableState] = useReactive({});
```

## initialState

| 参数         | 说明           | 类型   | 默认值 |
| ------------ | -------------- | ------ | ------ |
| initialState | 当前的数据对象 | object | {}     |
