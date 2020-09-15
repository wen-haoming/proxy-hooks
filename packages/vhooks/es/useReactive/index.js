import { useState, useMemo } from 'react';
import { isObject, isArray } from '../utils/helper';
/**
 *
 * @param initialState 当前代理的对象(嵌套对象)
 * @param callback 每次set的时候触发
 * @param rootObj 根对象
 * @param layerObj 基于root根对象扩展
 * @param immutableState 初始值
 */

function observer(initialState, callback, rootObj, layerObj, immutableState) {
  if (rootObj === void 0) {
    rootObj = {};
  }

  if (layerObj === void 0) {
    layerObj = rootObj;
  }

  if (immutableState === void 0) {
    immutableState = initialState;
  }

  return new Proxy(initialState, {
    get: function get(obj, prop, receiver) {
      if (isObject(obj[prop])) {
        var newObj = (layerObj[prop] = Object.assign({}, obj[prop])); // 传递一个新对象下一层

        return observer(obj[prop], callback, rootObj, newObj, immutableState);
      } else if (isArray(obj[prop])) {
        //  传递当前的数组下一层
        var _newObj = (layerObj[prop] = [].concat(obj[prop]));

        return observer(obj[prop], callback, rootObj, _newObj, immutableState);
      } else {
        //获取数据
        return Reflect.get(obj, prop, receiver);
      }
    },
    set: function set(obj, prop, value, receiver) {
      // 写入当前对象key val
      layerObj[prop] = value;
      callback(Object.assign({}, immutableState, rootObj));
      return Reflect.set(obj, prop, value, receiver);
    },
  });
}

export function useReactive(initialState) {
  var _useState = useState(initialState),
    immutable = _useState[0],
    setImmutable = _useState[1];

  var proxyState = useMemo(function () {
    var pending = false;
    var callback = [];

    function nextTick() {
      var newState = Object.assign.apply(null, callback);
      setImmutable(newState);
      callback = [];
      pending = false;
    }

    return observer(
      initialState,
      function (newState) {
        // setImmutable(newState);
        if (pending) {
          callback.push(newState);
        } else {
          pending = true;
          callback.push(newState);
          Promise.resolve().then(nextTick);
        }
      },
      {},
    );
  }, []);
  return [proxyState, immutable];
}
