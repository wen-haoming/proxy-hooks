'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useReactive = void 0;

var tslib_1 = require('tslib');

var react_1 = require('react');

var reactivity_1 = require('@vue/reactivity');

var useCreation_1 = require('../useCreation');

var lodash_debounce_1 = tslib_1.__importDefault(require('lodash.debounce'));

var lodash_throttle_1 = tslib_1.__importDefault(require('lodash.throttle'));

var helper_1 = require('../utils/helper');

function useReactive(initialState, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
    _options$debounce = _options.debounce,
    debounce = _options$debounce === void 0 ? 0 : _options$debounce,
    _options$throttle = _options.throttle,
    throttle = _options$throttle === void 0 ? 0 : _options$throttle;

  var _react_1$useState = react_1.useState(initialState),
    cueState = _react_1$useState[0],
    changeState = _react_1$useState[1];

  var _react_1$useRef = react_1.useRef(false),
    isUmount = _react_1$useRef.current;

  var state = useCreation_1.useCreation(function () {
    return reactivity_1.reactive(cueState);
  }, []);
  var debounceFn = useCreation_1.useCreation(function () {
    return lodash_debounce_1['default'](function () {
      return changeState(Object.assign({}, state));
    }, debounce);
  }, []);
  var throttleFu = useCreation_1.useCreation(function () {
    return lodash_throttle_1['default'](function () {
      return changeState(Object.assign({}, state));
    }, throttle);
  }, []);
  react_1.useEffect(function () {
    console.log('update');
    reactivity_1.effect(function () {
      if (!isUmount) {
        helper_1._traversalObj(state, function () {
          changeState(Object.assign({}, state));
        });

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

exports.useReactive = useReactive;
