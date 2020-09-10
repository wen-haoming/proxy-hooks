import React, { useEffect, memo, useState } from 'react';
import { useReactive } from 'proxy-hooks';

const Demo = () => {
  const [state, immerState] = useReactive({
    count: 0,
    count2: {
      count3: 0,
      arr: [],
    },
  });

  return (
    <div>
      <p>
        count<span role="addCount">{immerState.count}</span>
      </p>
      <p>
        arr：
        <span role="addCount">{JSON.stringify(immerState.count2.arr)}</span>
      </p>

      <button
        onClick={() => {
          state.count += 1;
        }}
      >
        count++
      </button>

      <button
        onClick={() => {
          state.count2.arr.push((Math.random() * 10) | 0);
        }}
      >
        push
      </button>
    </div>
  );
};

export default memo(Demo);
