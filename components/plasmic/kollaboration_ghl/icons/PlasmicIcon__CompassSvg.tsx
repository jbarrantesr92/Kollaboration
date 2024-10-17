// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type CompassSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function CompassSvgIcon(props: CompassSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"currentColor"}
      viewBox={"0 0 256 256"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M128 24a104 104 0 10104 104A104.11 104.11 0 00128 24zm0 192a88 88 0 1188-88 88.1 88.1 0 01-88 88zm44.42-143.16l-64 32a8.05 8.05 0 00-3.58 3.58l-32 64A8 8 0 0080 184a8.1 8.1 0 003.58-.84l64-32a8.05 8.05 0 003.58-3.58l32-64a8 8 0 00-10.74-10.74zM138 138l-40.11 20.11L118 118l40.15-20.07z"
        }
      ></path>
    </svg>
  );
}

export default CompassSvgIcon;
/* prettier-ignore-end */
