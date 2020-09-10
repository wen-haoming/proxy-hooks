import { useMemo } from 'react';
import { useReactive } from '../useReactive';
export function useMethods(initialValue, methods) {
  var _useReactive = useReactive(initialValue),
    state = _useReactive[0],
    immerState = _useReactive[1];

  methods = useMemo(function () {
    return methods;
  }, []);
  var boundMethods = useMemo(
    function () {
      return Object.entries(methods).reduce(function (methods, _ref) {
        var name = _ref[0],
          fn = _ref[1];

        var method = function method() {
          for (
            var _len = arguments.length, args = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            args[_key] = arguments[_key];
          }

          fn.apply(void 0, [state].concat(args));
        };

        methods[name] = method;
        return methods;
      }, {});
    },
    [methods],
  );
  return [immerState, boundMethods];
}
