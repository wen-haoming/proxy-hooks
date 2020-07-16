'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useComputed = void 0;

var reactivity_1 = require('@vue/reactivity');

function useComputed(obj) {
  var _reactivity_1$compute = reactivity_1.computed(obj),
    value = _reactivity_1$compute.value;

  return value;
}

exports.useComputed = useComputed;
