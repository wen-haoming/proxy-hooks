---
title: useReactivity
order: 0
group:
  title: hooks
  path: /hooks
---

## useReactive

基于 vue 的响应式原理,使得我们在数据层面减少很多的代码逻辑,大大提高整体代码的可读性和维护性

## 代码演示

<code src="./demo/index.tsx" />

## API

```js
let state = useReactive({});
```

## initialState

| 参数         | 说明           | 类型   | 默认值 |
| ------------ | -------------- | ------ | ------ |
| initialState | 当前的数据对象 | object | {}     |

## options

| 参数     | 说明         | 类型   | 默认值 |
| -------- | ------------ | ------ | ------ |
| debounce | 防抖的毫秒数 | number | 0      |
| throttle | 节流的毫秒数 | number | 0      |
