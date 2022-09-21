import { Newable } from "common/common";

export type constructor = Newable;
export type createAttribsFromArray = (
  numComponents: number,
  numElements: number,
  opt_type: constructor
) => ArrayBuffer;
export type createAttribsFromArrays = (
  gl: WebGLRenderingContext,
  arrays: {
    [x: string]: any[];
  },
  opt_mapping?:
    | {
        [x: string]: string;
      }
    | undefined
) => {
  [x: string]: NodeModule;
};
