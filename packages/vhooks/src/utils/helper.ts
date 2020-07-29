let mapArrMethods = [
  'push',
  'splice',
  'shift',
  'unshift',
  'pop',
  'sort',
  'reverse',
];

export function _traversalObj<S extends object>(obj: S, cb) {
  if (typeof obj === 'object') {
    for (let key in obj) {
      if (typeof obj !== 'object') {
        continue;
      } else if (Array.isArray(obj[key])) {
        mapArrMethods.forEach((method) => {
          let pushTemp = (obj[key] as any)[method];
          obj[key][method] = function (...args) {
            cb();
            pushTemp.apply(this, args);
          };
        });
        continue;
      }
      _traversalObj(obj[key] as any, cb);
    }
  }
}
