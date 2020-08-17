import { useMemo } from 'react';
import { useReactive } from '../useReactive';
import { useCreation } from '../useCreation';
export function useMethods(initialValue, methods) {
  var state = useReactive(initialValue);
  methods = useCreation(function () {
    return methods;
  }, []);
  var boundMethods = useMemo(
    function () {
      return Object.entries(methods).reduce(function (methods, _ref) {
        var name = _ref[0],
          fn = _ref[1];

        var method = function method() {
          fn.apply(void 0, arguments);
        };

        methods[name] = method;
        return methods;
      }, {});
    },
    [methods],
  );
  return [state, boundMethods];
}
