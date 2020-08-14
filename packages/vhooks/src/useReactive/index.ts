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
    () =>
      debounce &&
      debounceFunc(() => {
        !isUmount && changeState({ ...(state as S) });
      }, debounce),
    [],
  );

  let throttleFu = useCreation(
    () =>
      throttle &&
      throttleFunc(() => {
        !isUmount && changeState({ ...(state as S) });
      }, throttle),
    [],
  );

  useEffect(() => {
    effect(() => {
      if (isUmount) return;

      _traversalObj(state, () => {
        changeState({ ...(state as S) });
      });

      if (debounce) {
        debounceFn();
        return;
      }

      if (throttle) {
        throttleFu();
        return;
      }

      changeState({ ...(state as S) });
    });

    return () => {
      isUmount = true;
      state = null;
      debounceFn = null;
      throttleFu = null;
    };
  }, []);

  return state as S;
}
