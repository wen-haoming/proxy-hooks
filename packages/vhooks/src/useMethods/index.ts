import { useMemo } from 'react';
import { useReactive } from '../useReactive';
import { useCreation } from '../useCreation';

type BoundMethodsObj<O, M> = {
  [key in keyof M]: (state: O, ...args: Array<any>) => any;
};

type BoundReturnObjs<O> = {
  [key in keyof O]: (...args: Array<any>) => void;
};

export function useMethods<S extends object, Y extends object>(
  initialValue: S,
  methods: BoundMethodsObj<S, Y>,
) {
  const [state, immerState] = useReactive(initialValue);

  methods = useMemo(() => methods, []);

  const boundMethods = useMemo(() => {
    return Object.entries(methods).reduce((methods, [name, fn]) => {
      const method = (...args) => {
        (fn as Function)(state, ...args);
      };
      methods[name] = method;
      return methods;
    }, {});
  }, [methods]);

  return [immerState, boundMethods] as [S, BoundReturnObjs<Y>];
}
