'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useTrigger = void 0;

var tslib_1 = require('tslib');

var react_1 = tslib_1.__importStar(require('react'));

var helper_1 = require('../utils/helper');

var Popup_1 = tslib_1.__importDefault(require('./Popup'));

var TriggerContext = react_1['default'].createContext(null);

function useTrigger(props) {
  var triggerRef = props.triggerRef,
    popupMotion = props.popupMotion,
    popup = props.popup,
    placement = props.placement,
    popupStyle = props.popupStyle,
    action = props.action; // popupVisible
  // wrapper 包裹着

  var TriggerWrapper = react_1.useCallback(function (props) {
    var _react_1$useState = react_1.useState(false),
      popupVisible = _react_1$useState[0],
      setVisible = _react_1$useState[1]; // 创建event数组

    var events = react_1.useMemo(function () {
      var events = [];

      if (typeof action === 'string') {
        events = [action];
      } else if (Array.isArray(action)) {
        events = action;
      } else {
        console.error('action must be a array or string');
        return [];
      }

      return events;
    }, []); // 对应的dom绑定事件处理函数

    var triggerBindEvents = react_1.useMemo(function () {
      return events.reduce(function (preObj, event) {
        if (event === 'click') {
          preObj.onMouseDown = function (e) {
            console.log('onMouseDown');
          };

          preObj.onTouchStart = function (e) {
            console.log('onTouchStart');
          };

          preObj.onClick = function (e) {
            console.log('onClick');
          };
        } else if (event === 'hover') {
          preObj.onMouseEnter = function (e) {
            console.log('onMouseEnter');
          };

          preObj.onMouseMove = function (e) {
            console.log('onMouseMove');
          };

          preObj.onMouseLeave = function (e) {
            console.log('onMouseLeave');
          };
        }

        return preObj;
      }, {});
    }, []); // 使用一个新的React节点来代理

    var Trigger = react_1['default'].cloneElement(
      props.children,
      Object.assign({}, triggerBindEvents),
    );
    var popupContent = react_1.useMemo(function () {
      return react_1['default'].createElement(Popup_1['default'], null, popup);
    }, []);
    var popupObj = react_1.useMemo(function () {
      var popupContainer = document.createElement('div');
      popupContainer.style.position = 'absolute';
      popupContainer.style.top = '0';
      popupContainer.style.left = '0';
      popupContainer.style.width = '100%';
      document.body.appendChild(popupContainer);
      return helper_1.portal(popupContainer, popupContent);
    }, []);
    var setPopupVisible = react_1.useCallback(function () {}, []);
    var delaySetPopupVisible = react_1.useCallback(function () {}, []);
    react_1.useEffect(function () {
      var onDocumentClick = function onDocumentClick(e) {
        setVisible(false);

        if (!helper_1.contains(window.document, e.target)) {
        }
      };

      var clickRef = [];
      events.forEach(function (event) {
        if (event === 'click') {
          clickRef.push(
            helper_1.addEventListener(
              window.document,
              'click',
              onDocumentClick,
            ),
          );
        }
      }); // ---------------------------------------------------------------------------------------------------------------------------------

      return function () {
        clickRef.forEach(function (fn) {
          return fn.remove();
        });
        popupObj.remove();
      };
    }, []);
    return react_1['default'].createElement(
      TriggerContext.Provider,
      {
        value: {},
      },
      Trigger,
      popupObj.add(),
    );
  }, []);
  return TriggerWrapper;
}

exports.useTrigger = useTrigger;
