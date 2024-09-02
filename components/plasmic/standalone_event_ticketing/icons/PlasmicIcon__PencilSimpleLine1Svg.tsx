// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type PencilSimpleLine1SvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function PencilSimpleLine1SvgIcon(props: PencilSimpleLine1SvgIconProps) {
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
          "M227.32 73.37l-44.69-44.68a16 16 0 00-22.63 0L36.69 152A15.86 15.86 0 0032 163.31V208a16 16 0 0016 16h168a8 8 0 000-16H115.32l112-112a16 16 0 000-22.63zM92.69 208H48v-44.69l88-88L180.69 120zM192 108.69L147.32 64l24-24L216 84.69z"
        }
      ></path>
    </svg>
  );
}

export default PencilSimpleLine1SvgIcon;
/* prettier-ignore-end */
