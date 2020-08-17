import { useState, useEffect, useRef } from 'react';
import { reactive, effect } from '@vue/reactivity';
import { useCreation } from '../useCreation';
import debounceFunc from 'lodash.debounce';
import throttleFunc from 'lodash.throttle';
import { _traversalObj } from '../utils/helper';
export function useReactive(initialState, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
    _options$debounce = _options.debounce,
    debounce = _options$debounce === void 0 ? 0 : _options$debounce,
    _options$throttle = _options.throttle,
    throttle = _options$throttle === void 0 ? 0 : _options$throttle;

  var _useState = useState(initialState),
    cueState = _useState[0],
    changeState = _useState[1];

  var _useRef = useRef(false),
    isUmount = _useRef.current;

  var state = useCreation(function () {
    return reactive(cueState);
  }, []);
  var debounceFn = useCreation(function () {
    return (
      debounce &&
      debounceFunc(function () {
        !isUmount && changeState(Object.assign({}, state));
      }, debounce)
    );
  }, []);
  var throttleFu = useCreation(function () {
    return (
      throttle &&
      throttleFunc(function () {
        !isUmount && changeState(Object.assign({}, state));
      }, throttle)
    );
  }, []);
  useEffect(function () {
    effect(function () {
      if (isUmount) return;

      _traversalObj(state, function () {
        changeState(Object.assign({}, state));
      });

      if (debounce) {
        debounceFn();
        return;
      }

      if (throttle) {
        throttleFu();
        return;
      }

      changeState(Object.assign({}, state));
    });
    return function () {
      isUmount = true;
      state = null;
      debounceFn = null;
      throttleFu = null;
    };
  }, []);
  return state;
}
