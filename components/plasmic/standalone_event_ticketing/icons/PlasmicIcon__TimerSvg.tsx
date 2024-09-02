// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type TimerSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function TimerSvgIcon(props: TimerSvgIconProps) {
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
          "M128 40a96 96 0 1096 96 96.11 96.11 0 00-96-96zm0 176a80 80 0 1180-80 80.09 80.09 0 01-80 80zm45.66-125.66a8 8 0 010 11.32l-40 40a8 8 0 01-11.32-11.32l40-40a8 8 0 0111.32 0zM96 16a8 8 0 018-8h48a8 8 0 010 16h-48a8 8 0 01-8-8z"
        }
      ></path>
    </svg>
  );
}

export default TimerSvgIcon;
/* prettier-ignore-end */
