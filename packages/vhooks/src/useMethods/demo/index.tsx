import React, { useState, useEffect } from 'react';
import { useMethods } from '../index';

export default () => {
  const [state, boundMethods] = useMethods(
    { val: [] },
    {
      push(state) {
        state.val.push(1);
      },
      pop(state) {
        state.val.pop();
      },
    },
  );
  return (
    <div>
      <p>val:{JSON.stringify(state.val)}</p>
      <button onClick={boundMethods.push}>push</button>
      <button onClick={boundMethods.pop}>pop</button>
    </div>
  );
};
