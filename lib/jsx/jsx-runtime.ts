/** React's JSX runtime, with admin text overrides applied (see ./transform.ts). */
import * as R from "react/jsx-runtime";
import { withTextOverrides } from "./transform";

export { Fragment } from "react/jsx-runtime";
export type { JSX } from "react/jsx-runtime";

type Args = Parameters<typeof R.jsx>;

export function jsx(type: Args[0], props: Args[1], key?: Args[2]) {
  return R.jsx(type, withTextOverrides(type, props), key);
}

export function jsxs(type: Args[0], props: Args[1], key?: Args[2]) {
  return R.jsxs(type, withTextOverrides(type, props), key);
}
