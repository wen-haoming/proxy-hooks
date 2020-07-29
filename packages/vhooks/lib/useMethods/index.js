'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useMethods = void 0;

var react_1 = require('react');

var useReactive_1 = require('../useReactive');

function useMethods(initialValue, methods) {
  var state = useReactive_1.useReactive(initialValue);
  var boundMethods = react_1.useMemo(
    function () {
      return Object.entries(methods).reduce(function (methods, _ref) {
        var name = _ref[0],
          fn = _ref[1];

        var method = function method() {
          fn(state);
        };

        methods[name] = method;
        return methods;
      }, {});
    },
    [methods],
  );
  return [state, boundMethods];
}

exports.useMethods = useMethods;
