import React, { useRef, CSSProperties } from 'react';
declare type Placement =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft';
declare type Action = 'click' | 'hover';
export interface TriggerProps {
  triggerRef?: ReturnType<typeof useRef>;
  action: Action | Array<Action>;
  popupMotion?: string;
  popup?: React.ReactElement;
  placement?: Placement;
  popupStyle?: CSSProperties;
  closeCb?: () => void;
}
export declare function useTrigger(props: TriggerProps): React.FC;
export {};
