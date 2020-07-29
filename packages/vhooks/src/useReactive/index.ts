import { useState, useEffect, useRef } from 'react';

import { reactive, effect } from '@vue/reactivity';
import { useCreation } from '../useCreation';
import debounceFunc from 'lodash.debounce';
import throttleFunc from 'lodash.throttle';
import { _traversalObj } from '../utils/helper';

interface Options {
  debounce?: number; // 防抖
  throttle?: number; // 节流
}

export function useReactive<S extends object>(
  initialState: S,
  options: Options = {},
): S {
  let { debounce = 0, throttle = 0 } = options;
  const [cueState, changeState] = useState<S>(initialState);
  let { current: isUmount } = useRef(false);

  let state = useCreation(() => reactive(cueState), []);

  let debounceFn = useCreation(
    () => debounceFunc(() => changeState({ ...(state as S) }), debounce),
    [],
  );

  let throttleFu = useCreation(
    () => throttleFunc(() => changeState({ ...(state as S) }), throttle),
    [],
  );

  useEffect(() => {
    console.log('update');
    effect(() => {
      if (!isUmount) {
        _traversalObj(state, () => {
          changeState({ ...(state as S) });
        });
        if (debounce || throttle) {
          if (debounce) {
            debounceFn();
          } else if (throttle) {
            throttleFu();
          }
        } else {
          changeState({ ...(state as S) });
        }
      }
    });

    return () => {
      isUmount = true;
    };
  }, []);

  return state as S;
}
