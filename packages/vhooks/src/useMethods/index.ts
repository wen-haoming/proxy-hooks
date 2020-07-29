import { useMemo } from 'react';
import { useReactive } from '../useReactive';

export function useMethods<S extends object, Y extends object>(
  initialValue: S,
  methods: Y,
) {
  const state = useReactive(initialValue);
  const boundMethods = useMemo(
    () =>
      Object.entries(methods).reduce((methods, [name, fn]) => {
        const method = (...args) => {
          fn(state as S);
        };
        methods[name] = method;
        return methods;
      }, {}),
    [methods],
  );

  return [state, boundMethods] as [S, Y];
}
