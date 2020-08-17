export declare function useMethods<S extends object, Y extends object>(
  initialValue: S,
  methods: Y,
): [S, { [key in keyof Y]: (...args: any[]) => any }];
