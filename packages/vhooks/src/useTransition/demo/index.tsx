import React from 'react';
import { Transition } from '../index';
import { useReactive } from 'v-reactive-hooks';
import './index.less';

export const Demo = () => {
  const state = useReactive({
    flag: false,
  });

  return (
    <div>
      <button onClick={() => (state.flag = !state.flag)}>
        {state.flag ? '显示' : '隐藏'}
      </button>
      <Transition name="fade" visible={state.flag}>
        <div className="box1">111</div>
      </Transition>
    </div>
  );
};

export default Demo;
