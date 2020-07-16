import { useState, useEffect, useRef } from 'react';
import { reactive, effect } from '@vue/reactivity';
import { useCreation } from '../useCreation';
import debounceFunc from 'lodash.debounce';
import throttleFunc from 'lodash.throttle';

function _traversalObj(obj) {
  if (typeof obj === 'object') {
    for (var key in obj) {
      if (typeof obj !== 'object') {
        continue;
      }

      _traversalObj(obj[key]);
    }
  }
}

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
    return debounceFunc(function () {
      return changeState(Object.assign({}, state));
    }, debounce);
  }, []);
  var throttleFu = useCreation(function () {
    return throttleFunc(function () {
      return changeState(Object.assign({}, state));
    }, throttle);
  }, []);
  useEffect(function () {
    effect(function () {
      if (!isUmount) {
        _traversalObj(state);

        if (debounce || throttle) {
          if (debounce) {
            debounceFn();
          } else if (throttle) {
            throttleFu();
          }
        } else {
          changeState(Object.assign({}, state));
        }
      }
    });
    return function () {
      isUmount = true;
    };
  }, []);
  return state;
}
