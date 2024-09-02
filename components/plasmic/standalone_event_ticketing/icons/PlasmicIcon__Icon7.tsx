// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Icon7IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Icon7Icon(props: Icon7IconProps) {
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
          "M128 24a104 104 0 10104 104A104.11 104.11 0 00128 24zm45.66 109.66l-32 32a8 8 0 01-11.32-11.32L148.69 136H88a8 8 0 010-16h60.69l-18.35-18.34a8 8 0 0111.32-11.32l32 32a8 8 0 010 11.32z"
        }
      ></path>
    </svg>
  );
}

export default Icon7Icon;
/* prettier-ignore-end */
