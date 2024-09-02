// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type CalendarDotsDuotone1SvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function CalendarDotsDuotone1SvgIcon(
  props: CalendarDotsDuotone1SvgIconProps
) {
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
        d={"M216 48v40H40V48a8 8 0 018-8h160a8 8 0 018 8z"}
        opacity={".2"}
      ></path>

      <path
        d={
          "M208 32h-24v-8a8 8 0 00-16 0v8H88v-8a8 8 0 00-16 0v8H48a16 16 0 00-16 16v160a16 16 0 0016 16h160a16 16 0 0016-16V48a16 16 0 00-16-16zM72 48v8a8 8 0 0016 0v-8h80v8a8 8 0 0016 0v-8h24v32H48V48zm136 160H48V96h160v112zm-68-76a12 12 0 11-12-12 12 12 0 0112 12zm44 0a12 12 0 11-12-12 12 12 0 0112 12zm-88 40a12 12 0 11-12-12 12 12 0 0112 12zm44 0a12 12 0 11-12-12 12 12 0 0112 12zm44 0a12 12 0 11-12-12 12 12 0 0112 12z"
        }
      ></path>
    </svg>
  );
}

export default CalendarDotsDuotone1SvgIcon;
/* prettier-ignore-end */
