/// <reference types="react" />
export declare let isObject: (obj: any) => boolean;
export declare let isArray: (arr: any) => boolean;
export declare function contains(root: any, n: any): boolean;
export declare function addEventListener(
  target: any,
  eventType: any,
  cb: any,
  option?: {},
): {
  remove: () => void;
};
export declare function portal(
  container: any,
  children: any,
): {
  add(): import('react').ReactPortal;
  remove(): void;
};
