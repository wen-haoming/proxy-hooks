import React, { useEffect } from 'react';
import { useMethods } from '../index';

export default () => {
  const [state, boundMethods] = useMethods(
    { arr: [], str: ' ', count: 0 },
    {
      push(state) {
        state.arr.push(11);
      },
      pop(state) {
        state.arr.pop();
      },
      addCount(state) {
        state.count += 1;
      },
      changeStr(state, e: React.ChangeEvent<HTMLInputElement>) {
        state.str = e.target.value;
      },
    },
  );

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      <p role="countVal">{state.count}</p>
      <button role="addCount" onClick={boundMethods.addCount}>
        count++
      </button>
      <p>
        arr: <span role="arrVal">{JSON.stringify(state.arr)}</span>{' '}
      </p>
      <button role="pushArr" onClick={boundMethods.push}>
        push
      </button>
      <button
        role="subArr"
        style={{ marginLeft: 10 }}
        onClick={boundMethods.pop}
      >
        pop
      </button>
      <p role="strVal">{state.str}</p>
      <input role="changeVal" type="text" onChange={boundMethods.changeStr} />
    </div>
  );
};
