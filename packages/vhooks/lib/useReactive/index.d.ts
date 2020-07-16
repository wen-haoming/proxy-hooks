interface Options {
  debounce?: number;
  throttle?: number;
}
export declare function useReactive<S extends object>(
  initialState: S,
  options?: Options,
): S;
export {};
