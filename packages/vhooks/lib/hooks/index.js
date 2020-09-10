'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useProxy = void 0;

var react_1 = require('react');

function observer(
  initialState,
  rootObj,
  curObj,
  initState,
  setStateCb,
  arrkey,
) {
  if (rootObj === void 0) {
    rootObj = {};
  }

  if (curObj === void 0) {
    curObj = rootObj;
  }

  return new Proxy(initialState, {
    get: function get(target, props) {
      if (typeof target[props] === 'object' && Array.isArray(target[props])) {
        var newObj = (curObj[props] = {});
        return observer(target[props], rootObj, newObj, initState, setStateCb);
      } else if (
        typeof target[props] === 'object' &&
        !Array.isArray(target[props])
      ) {
        var _newObj = (curObj[props] = {});

        return observer(
          target[props],
          rootObj,
          _newObj,
          initState,
          setStateCb,
          props,
        );
      } else {
        return Reflect.get(target, props);
      }
    },
    set: function set(target, props, val) {
      if (arrkey) {
        curObj[arrkey] = target;
        setStateCb(Object.assign({}, rootObj, initState));
      } else {
        curObj[props] = val;
        setStateCb(Object.assign({}, rootObj, initState));
      }

      return Reflect.set(target, props, val);
    },
  });
}

function useProxy(initialState) {
  var _react_1$useState = react_1.useState(initialState),
    immerState = _react_1$useState[0],
    setImmerState = _react_1$useState[1];

  var state = react_1.useMemo(function () {
    var newObj = {};
    return observer(initialState, newObj, newObj, initialState, function (
      newState,
    ) {
      setImmerState(newState);
    });
  }, []);
  return [state, immerState];
}

exports.useProxy = useProxy;
