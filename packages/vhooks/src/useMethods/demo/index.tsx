import React from 'react';
import { useMethods } from 'v-reactive-hooks';

export default () => {
  const [state, boundMethods] = useMethods(
    { val: [], str: ' ', count: 0 },
    {
      push() {
        state.val.push(Math.floor(Math.random() * 100));
      },
      pop() {
        state.val.pop();
      },
      addCount() {
        state.count += 1;
      },
      changeStr(e: React.ChangeEvent<HTMLInputElement>) {
        state.str = e.target.value;
      },
    },
  );
  return (
    <div>
      <p role="countVal">{state.count}</p>
      <button role="addCount" onClick={boundMethods.addCount}>
        count++
      </button>
      <p>
        val: <span role="arrVal">{JSON.stringify(state.val)}</span>{' '}
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
