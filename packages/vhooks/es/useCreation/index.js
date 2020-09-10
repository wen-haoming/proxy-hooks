import { useRef } from 'react';
export function useCreation(factory, deps) {
  var _useRef = useRef({
      deps: deps,
      obj: undefined,
      initialized: false,
    }),
    current = _useRef.current;

  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = factory();
    current.initialized = true;
  }

  return current.obj;
}

function depsAreSame(oldDeps, deps) {
  if (oldDeps === deps) return true;

  for (var i in oldDeps) {
    if (oldDeps[i] !== deps[i]) return false;
  }

  return true;
}

export default useCreation;
