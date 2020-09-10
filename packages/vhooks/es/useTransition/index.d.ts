import React from 'react';
import './index.less';
export declare const animationEndName = 'animationend';
export declare const transitionEndName = 'transitionend';
export interface TransitionProps {
  visible: boolean;
  name: string;
  onEnter: () => void;
  onEnterActive: () => void;
  onEnterTo: () => void;
  onLeave: () => void;
  onLeaveActive: () => void;
  onLeaveTo: () => void;
}
export declare const Transition: React.FC<TransitionProps>;
