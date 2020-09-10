import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { contains, addEventListener, portal } from '../utils/helper';
import Popup from './Popup';
var TriggerContext = /*#__PURE__*/ React.createContext(null);
export function useTrigger(props) {
  var triggerRef = props.triggerRef,
    popupMotion = props.popupMotion,
    popup = props.popup,
    placement = props.placement,
    popupStyle = props.popupStyle,
    action = props.action; // popupVisible
  // wrapper 包裹着

  var TriggerWrapper = useCallback(function (props) {
    var _useState = useState(false),
      popupVisible = _useState[0],
      setVisible = _useState[1]; // 创建event数组

    var events = useMemo(function () {
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

    var triggerBindEvents = useMemo(function () {
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

    var Trigger = /*#__PURE__*/ React.cloneElement(
      props.children,
      Object.assign({}, triggerBindEvents),
    );
    var popupContent = useMemo(function () {
      return /*#__PURE__*/ React.createElement(Popup, null, popup);
    }, []);
    var popupObj = useMemo(function () {
      var popupContainer = document.createElement('div');
      popupContainer.style.position = 'absolute';
      popupContainer.style.top = '0';
      popupContainer.style.left = '0';
      popupContainer.style.width = '100%';
      document.body.appendChild(popupContainer);
      return portal(popupContainer, popupContent);
    }, []);
    var setPopupVisible = useCallback(function () {}, []);
    var delaySetPopupVisible = useCallback(function () {}, []);
    useEffect(function () {
      var onDocumentClick = function onDocumentClick(e) {
        setVisible(false);

        if (!contains(window.document, e.target)) {
        }
      };

      var clickRef = [];
      events.forEach(function (event) {
        if (event === 'click') {
          clickRef.push(
            addEventListener(window.document, 'click', onDocumentClick),
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
    return /*#__PURE__*/ React.createElement(
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
