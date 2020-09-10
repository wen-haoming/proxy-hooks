import { useState, useMemo } from 'react';

function observer<S extends object>(
  initialState: S,
  rootObj: any = {},
  curObj: any = rootObj,
  initState: any,
  setStateCb,
  arrkey?: any,
): S {
  return new Proxy(initialState, {
    get(target: any, props) {
      if (typeof target[props] === 'object' && Array.isArray(target[props])) {
        let newObj = (curObj[props] = {});
        return observer(target[props], rootObj, newObj, initState, setStateCb);
      } else if (
        typeof target[props] === 'object' &&
        !Array.isArray(target[props])
      ) {
        let newObj = (curObj[props] = {});
        return observer(
          target[props],
          rootObj,
          newObj,
          initState,
          setStateCb,
          props,
        );
      } else {
        return Reflect.get(target, props);
      }
    },
    set(target, props, val) {
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

export function useProxy<S extends object>(initialState: S): [S, S] {
  const [immerState, setImmerState] = useState<S>(initialState);

  let state = useMemo(() => {
    let newObj = {};
    return observer(initialState, newObj, newObj, initialState, (newState) => {
      setImmerState(newState);
    });
  }, []);

  return [state, immerState];
}
