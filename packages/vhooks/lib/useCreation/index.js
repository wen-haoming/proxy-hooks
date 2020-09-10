'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useCreation = void 0;

var react_1 = require('react');

function useCreation(factory, deps) {
  var _react_1$useRef = react_1.useRef({
      deps: deps,
      obj: undefined,
      initialized: false,
    }),
    current = _react_1$useRef.current;

  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = factory();
    current.initialized = true;
  }

  return current.obj;
}

exports.useCreation = useCreation;

function depsAreSame(oldDeps, deps) {
  if (oldDeps === deps) return true;

  for (var i in oldDeps) {
    if (oldDeps[i] !== deps[i]) return false;
  }

  return true;
}

exports['default'] = useCreation;
