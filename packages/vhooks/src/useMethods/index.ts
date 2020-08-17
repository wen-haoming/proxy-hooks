import { useMemo } from 'react';
import { useReactive } from '../useReactive';
import { useCreation } from '../useCreation';

export function useMethods<S extends object, Y extends object>(
  initialValue: S,
  methods: Y,
) {
  type BoundMethodsObj = {
    [key in keyof Y]: (...args: any[]) => any;
  };

  const state = useReactive(initialValue);

  methods = useCreation(() => methods, []);

  const boundMethods = useMemo(() => {
    return Object.entries(methods).reduce((methods, [name, fn]) => {
      const method = (...args) => {
        fn(...args);
      };
      methods[name] = method;
      return methods;
    }, {});
  }, [methods]);

  return [state, boundMethods] as [S, BoundMethodsObj];
}
