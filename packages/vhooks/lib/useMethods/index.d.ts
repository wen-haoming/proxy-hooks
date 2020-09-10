declare type BoundMethodsObj<O, M> = {
  [key in keyof M]: (state: O, ...args: Array<any>) => any;
};
declare type BoundReturnObjs<O> = {
  [key in keyof O]: (...args: Array<any>) => void;
};
export declare function useMethods<S extends object, Y extends object>(
  initialValue: S,
  methods: BoundMethodsObj<S, Y>,
): [S, BoundReturnObjs<Y>];
export {};
