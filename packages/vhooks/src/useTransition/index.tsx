import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';
import ReactDom from 'react-dom';
import classNames from 'classnames';
import raf from 'raf';
import './index.less';

// 自动嗅探目标元素是否应用了 CSS 过渡或动画，如果是，在恰当的时机添加/删除 CSS 类名。

// 如果过渡组件提供了 JavaScript 钩子函数，这些钩子函数将在恰当的时机被调用。

// 如果没有找到 JavaScript 钩子并且也没有检测到 CSS 过渡/动画，DOM 操作 (插入/删除) 在下一帧中立即执行。(注意：此指浏览器逐帧动画机制，和 Vue 的 nextTick 概念不同)

// visible

// motionName

// v-enter
// v-enter-active
// v-enter-to

// v-leave
// v-leave-active
// v-leave-to

export const animationEndName = 'animationend';
export const transitionEndName = 'transitionend';

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

// function

let stateObj = {
  NOSTATUS: 'none',
  ENTER: 'enter',
  ENTER_ACTIVE: 'enter-active',
  ENTER_TO: 'enter-to',

  LEAVE: 'leave',
  LEAVE_ACTIVE: 'leave-active',
  LEAVE_TO: 'leave-to',

  NONE: '',
};

let statusObj = {
  ENTER: 'enter',
  LEAVE: 'leave',
};

export const Transition: React.FC<TransitionProps> = (props) => {
  const { name, visible } = props;
  const [state, setState] = useState(stateObj.NONE);
  const [statusActive, setStatusActive] = useState(statusObj.ENTER);

  const childRef = useRef(null);
  const refRef = useRef(null);

  // useEffect(()=>{
  //   if(!childRef.current) return
  // //   ( async ()=>{
  // //     for(let name in stateObj){
  // //           await (()=>{
  // //             return new Promise((resolve)=>{
  // //                 setTimeout(()=>{
  // //                   setState(stateObj[name])
  // //                   resolve()
  // //                 },1000)
  // //             })
  // //           })()
  // //     }
  // // })()
  // },[childRef.current])

  const nextFrame = useCallback((func: (timestamp?: number) => void) => {
    cancelNextFrame();
    refRef.current = raf(func);
  }, []);

  const cancelNextFrame = useCallback(() => {
    if (refRef.current) {
      refRef.current.cancel(raf);
      refRef.current = null;
    }
  }, [refRef.current]);

  const updateState = (state, e) => {
    console.log(state, '---');
    // cancelNextFrame()
    let $el = childRef.current;
    if (!$el) return;

    switch (state) {
      case stateObj.NOSTATUS:
        setState(stateObj.ENTER);
        break;
      case stateObj.ENTER:
        setState(stateObj.ENTER_ACTIVE);
        break;
      case stateObj.ENTER_ACTIVE:
        setState(stateObj.ENTER_TO);
        break;
      case stateObj.ENTER_TO:
        setState(stateObj.LEAVE);
        setStatusActive(stateObj.LEAVE);
        break;
      case stateObj.LEAVE:
        setState(stateObj.LEAVE_ACTIVE);
        break;
      case stateObj.LEAVE_ACTIVE:
        setState(stateObj.LEAVE_TO);
        break;
      case stateObj.LEAVE_TO:
        setState(stateObj.NONE);
        break;
      case stateObj.NONE:
        setState(stateObj.LEAVE);
        break;
      default:
    }
  };

  const onMotionEnd = (e) => {
    updateState(state, e);
  };

  useEffect(() => {
    let $el = childRef.current;

    if ($el) {
      $el.addEventListener(transitionEndName, onMotionEnd);
      $el.addEventListener(animationEndName, onMotionEnd);
    }

    return () => {
      $el.removeEventListener(transitionEndName, onMotionEnd);
      $el.removeEventListener(animationEndName, onMotionEnd);
      $el = null;
    };
  }, [childRef.current, state]);

  useEffect(() => {
    if (visible) {
      setState(stateObj.ENTER);
    }
  }, [visible]);

  const child = React.Children.only(props.children);

  const newChild = React.cloneElement(child as React.ReactElement, {
    className: classNames({
      [`${name}-${state}`]: state && true,
      [(child as React.ReactElement).props.className]: true,
    }),
    ref: childRef,
  });

  return <>{newChild}</>;
};
