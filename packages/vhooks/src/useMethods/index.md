---
title: useMethods
order: 2
group:
  title: hooks
  path: /hooks
---

## useMethods

基于 useReactive 封装，把状态和更改状态两种思路结合,把各种处理函数使用 useMemo 包裹使得始终是同一个引用,避免多次重复创建函数,能够进一步提升性能,以及维护性。

## 代码演示

<code   src="./demo/index.tsx" />

## API

```js
let [state, methods] = useMethods(initialState, initialMethods);
```

## initialState

| 参数       | 说明           | 类型   | 默认值 |
| ---------- | -------------- | ------ | ------ |
| initialVal | 当前的数据对象 | object | {}     |
| methods    | 封装的函数对象 | object | {}     |
