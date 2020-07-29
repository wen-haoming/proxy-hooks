---
title: useMethods
group:
  title: useMethods
  path: /reactivity
---

## useMethods

基于 useReactive 封装，能够把各种处理函数使用 useMemo 包裹使得始终是同一个引用

## 代码演示

<code src="./demo/index.tsx" />

## API

```js
let {} = useMethods(initialVal, methods);
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
