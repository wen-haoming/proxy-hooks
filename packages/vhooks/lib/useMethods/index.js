'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useMethods = void 0;

var react_1 = require('react');

var useReactive_1 = require('../useReactive');

function useMethods(initialValue, methods) {
  var _useReactive_1$useRea = useReactive_1.useReactive(initialValue),
    state = _useReactive_1$useRea[0],
    immerState = _useReactive_1$useRea[1];

  methods = react_1.useMemo(function () {
    return methods;
  }, []);
  var boundMethods = react_1.useMemo(
    function () {
      return Object.entries(methods).reduce(function (methods, _ref) {
        var name = _ref[0],
          fn = _ref[1];

        var method = function method() {
          for (
            var _len = arguments.length, args = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            args[_key] = arguments[_key];
          }

          fn.apply(void 0, [state].concat(args));
        };

        methods[name] = method;
        return methods;
      }, {});
    },
    [methods],
  );
  return [immerState, boundMethods];
}

exports.useMethods = useMethods;
