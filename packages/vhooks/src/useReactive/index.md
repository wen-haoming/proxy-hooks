---
title: useReactivity
order: 0
group:
  title: hooks
  path: /hooks
---

## useReactive

基于 proxy 的使用，能够直接操作可变数据的进而刷新视图.

## 代码演示

<code src="./demo/index.tsx" />

## API

```js
let [state, immutableState] = useReactive({});
```

## initialState

| 参数         | 说明           | 类型   | 默认值 |
| ------------ | -------------- | ------ | ------ |
| initialState | 当前的数据对象 | object | {}     |
