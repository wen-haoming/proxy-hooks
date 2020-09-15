import React, { useEffect, memo, useState } from 'react';
import { useReactive } from 'proxy-hooks';

const Demo = () => {
  const [state, immerState] = useReactive({
    count: 0,
    count2: {
      count3: 0,
      count4: 0,
      arr: [],
    },
  });

  useEffect(() => {
    console.timeEnd('trace');
  }, [immerState]);

  return (
    <div>
      <p>
        count<span role="addCount">{immerState.count}</span>
      </p>
      <p>
        count2{' '}
        <span role="addCount">{JSON.stringify(immerState.count2.count3)}</span>
      </p>
      <p>
        arr：
        <span role="addCount">{JSON.stringify(immerState.count2.arr)}</span>
      </p>
      <p>{JSON.stringify(immerState)}</p>
      <button
        onClick={() => {
          state.count += 100;
          state.count += 100;
          state.count += 100;
          state.count *= 3;
          state.count += 1;
          state.count += 1;
          console.time('trace');
        }}
      >
        count++
      </button>
      <button
        onClick={() => {
          state.count2.count3 += 1;
          state.count2.count3 += 1;
          state.count2.count3 += 1;
          state.count2.count4 += 1;
          state.count2.count4 += 1;
          console.time('trace');
        }}
      >
        count3++
      </button>
      <button
        onClick={() => {
          state.count2.arr.push(1);
          state.count2.arr.push(1);
          state.count2.arr.push(1);
          state.count2.arr.push(1);
          state.count2.arr.push(1);
          console.time('trace');
        }}
      >
        push
      </button>
    </div>
  );
};

export default memo(Demo);
