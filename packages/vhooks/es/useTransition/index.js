import React, { useCallback, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import raf from 'raf';
import './index.less'; // 自动嗅探目标元素是否应用了 CSS 过渡或动画，如果是，在恰当的时机添加/删除 CSS 类名。
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

export var animationEndName = 'animationend';
export var transitionEndName = 'transitionend'; // function

var stateObj = {
  NOSTATUS: 'none',
  ENTER: 'enter',
  ENTER_ACTIVE: 'enter-active',
  ENTER_TO: 'enter-to',
  LEAVE: 'leave',
  LEAVE_ACTIVE: 'leave-active',
  LEAVE_TO: 'leave-to',
  NONE: '',
};
var statusObj = {
  ENTER: 'enter',
  LEAVE: 'leave',
};
export var Transition = function Transition(props) {
  var _classNames;

  var name = props.name,
    visible = props.visible;

  var _useState = useState(stateObj.NONE),
    state = _useState[0],
    setState = _useState[1];

  var _useState2 = useState(statusObj.ENTER),
    statusActive = _useState2[0],
    setStatusActive = _useState2[1];

  var childRef = useRef(null);
  var refRef = useRef(null); // useEffect(()=>{
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

  var nextFrame = useCallback(function (func) {
    cancelNextFrame();
    refRef.current = raf(func);
  }, []);
  var cancelNextFrame = useCallback(
    function () {
      if (refRef.current) {
        refRef.current.cancel(raf);
        refRef.current = null;
      }
    },
    [refRef.current],
  );

  var updateState = function updateState(state, e) {
    console.log(state, '---'); // cancelNextFrame()

    var $el = childRef.current;
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

  var onMotionEnd = function onMotionEnd(e) {
    updateState(state, e);
  };

  useEffect(
    function () {
      var $el = childRef.current;

      if ($el) {
        $el.addEventListener(transitionEndName, onMotionEnd);
        $el.addEventListener(animationEndName, onMotionEnd);
      }

      return function () {
        $el.removeEventListener(transitionEndName, onMotionEnd);
        $el.removeEventListener(animationEndName, onMotionEnd);
        $el = null;
      };
    },
    [childRef.current, state],
  );
  useEffect(
    function () {
      if (visible) {
        setState(stateObj.ENTER);
      }
    },
    [visible],
  );
  var child = React.Children.only(props.children);
  var newChild = /*#__PURE__*/ React.cloneElement(child, {
    className: classNames(
      ((_classNames = {}),
      (_classNames[name + '-' + state] = state && true),
      (_classNames[child.props.className] = true),
      _classNames),
    ),
    ref: childRef,
  });
  return /*#__PURE__*/ React.createElement(React.Fragment, null, newChild);
};
