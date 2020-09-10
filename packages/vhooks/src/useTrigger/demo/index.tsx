import React from 'react';
import { useTrigger } from '../index';
import './index.less';

export const Demo = () => {
  const Trigger = useTrigger({
    popup: <h1>123</h1>,
    action: 'hover',
    popupStyle: {
      width: '50px',
      height: '50px',
    },
  });

  return (
    <Trigger>
      <div className="trigger">trigger box</div>
    </Trigger>
  );
};

export default Demo;
