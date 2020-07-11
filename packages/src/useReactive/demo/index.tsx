import React, { useEffect, memo } from 'react';
import { useReactive } from '../index';
import { useComputed } from '../../useComputed';

const Demo = () => {
  let state = useReactive({
    count: 0,
    val: {
      val1: {
        val2: '',
      },
    },
  });

  let state2 = useReactive(
    {
      val: '',
    },
    {
      debounce: 300,
    },
  );

  let state3 = useReactive(
    {
      val: '',
    },
    {
      throttle: 500,
    },
  );

  return (
    <div>
      <p>计数器 state.count：{state.count}</p>
      <button onClick={() => (state.count += 1)}>state.count++</button>
      <p>支持数据嵌套 state.val.val1.val2：{state.val.val1.val2}</p>
      <input
        style={{ width: 220, borderWidth: 1 }}
        type="text"
        onChange={e => {
          state.val.val1.val2 = e.target.value;
        }}
      />

      <p>支持防抖 state2.val：{state2.val}</p>
      <input
        style={{ width: 220, borderWidth: 1 }}
        type="text"
        onChange={e => {
          state2.val = e.target.value;
        }}
      />

      <p>支持节流 state3.val：{state3.val}</p>
      <input
        style={{ width: 220, borderWidth: 1 }}
        type="text"
        onChange={e => {
          state3.val = e.target.value;
        }}
      />
    </div>
  );
};

export default memo(Demo);
