/** React's development JSX runtime, with admin text overrides applied (see ./transform.ts). */
import * as R from "react/jsx-dev-runtime";
import { withTextOverrides } from "./transform";

export { Fragment } from "react/jsx-dev-runtime";
export type { JSX } from "react/jsx-dev-runtime";

type Args = Parameters<typeof R.jsxDEV>;

export function jsxDEV(type: Args[0], props: Args[1], key: Args[2], isStatic: Args[3], source?: Args[4], self?: Args[5]) {
  return R.jsxDEV(type, withTextOverrides(type, props), key, isStatic, source, self);
}
