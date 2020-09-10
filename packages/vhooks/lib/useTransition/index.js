'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.Transition = exports.transitionEndName = exports.animationEndName = void 0;

var tslib_1 = require('tslib');

var react_1 = tslib_1.__importStar(require('react'));

var classnames_1 = tslib_1.__importDefault(require('classnames'));

var raf_1 = tslib_1.__importDefault(require('raf'));

require('./index.less'); // 自动嗅探目标元素是否应用了 CSS 过渡或动画，如果是，在恰当的时机添加/删除 CSS 类名。
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

exports.animationEndName = 'animationend';
exports.transitionEndName = 'transitionend'; // function

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

exports.Transition = function (props) {
  var _classnames_1$default;

  var name = props.name,
    visible = props.visible;

  var _react_1$useState = react_1.useState(stateObj.NONE),
    state = _react_1$useState[0],
    setState = _react_1$useState[1];

  var _react_1$useState2 = react_1.useState(statusObj.ENTER),
    statusActive = _react_1$useState2[0],
    setStatusActive = _react_1$useState2[1];

  var childRef = react_1.useRef(null);
  var refRef = react_1.useRef(null); // useEffect(()=>{
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

  var nextFrame = react_1.useCallback(function (func) {
    cancelNextFrame();
    refRef.current = raf_1['default'](func);
  }, []);
  var cancelNextFrame = react_1.useCallback(
    function () {
      if (refRef.current) {
        refRef.current.cancel(raf_1['default']);
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

  react_1.useEffect(
    function () {
      var $el = childRef.current;

      if ($el) {
        $el.addEventListener(exports.transitionEndName, onMotionEnd);
        $el.addEventListener(exports.animationEndName, onMotionEnd);
      }

      return function () {
        $el.removeEventListener(exports.transitionEndName, onMotionEnd);
        $el.removeEventListener(exports.animationEndName, onMotionEnd);
        $el = null;
      };
    },
    [childRef.current, state],
  );
  react_1.useEffect(
    function () {
      if (visible) {
        setState(stateObj.ENTER);
      }
    },
    [visible],
  );
  var child = react_1['default'].Children.only(props.children);
  var newChild = react_1['default'].cloneElement(child, {
    className: classnames_1['default'](
      ((_classnames_1$default = {}),
      (_classnames_1$default[name + '-' + state] = state && true),
      (_classnames_1$default[child.props.className] = true),
      _classnames_1$default),
    ),
    ref: childRef,
  });
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    newChild,
  );
};
