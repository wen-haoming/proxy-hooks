'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports._traversalObj = void 0;
var mapArrMethods = [
  'push',
  'splice',
  'shift',
  'unshift',
  'pop',
  'sort',
  'reverse',
];

function _traversalObj(obj, cb) {
  if (typeof obj === 'object') {
    var _loop = function _loop(key) {
      if (typeof obj !== 'object') {
        return 'continue';
      } else if (Array.isArray(obj[key])) {
        mapArrMethods.forEach(function (method) {
          var pushTemp = obj[key][method];

          obj[key][method] = function () {
            cb();

            for (
              var _len = arguments.length, args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              args[_key] = arguments[_key];
            }

            pushTemp.apply(this, args);
          };
        });
        return 'continue';
      }

      _traversalObj(obj[key], cb);
    };

    for (var key in obj) {
      var _ret = _loop(key);

      if (_ret === 'continue') continue;
    }
  }
}

exports._traversalObj = _traversalObj;
