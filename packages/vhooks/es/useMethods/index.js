import { useMemo } from 'react';
import { useReactive } from '../useReactive';
export function useMethods(initialValue, methods) {
  var state = useReactive(initialValue);
  var boundMethods = useMemo(
    function () {
      return Object.entries(methods).reduce(function (methods, _ref) {
        var name = _ref[0],
          fn = _ref[1];

        var method = function method() {
          fn(state);
        };

        methods[name] = method;
        return methods;
      }, {});
    },
    [methods],
  );
  return [state, boundMethods];
}
