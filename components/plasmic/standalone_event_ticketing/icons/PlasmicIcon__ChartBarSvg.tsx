// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type ChartBarSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function ChartBarSvgIcon(props: ChartBarSvgIconProps) {
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
          "M224 200h-8V40a8 8 0 00-8-8h-56a8 8 0 00-8 8v40H96a8 8 0 00-8 8v40H48a8 8 0 00-8 8v64h-8a8 8 0 000 16h192a8 8 0 000-16zM160 48h40v152h-40zm-56 48h40v104h-40zm-48 48h32v56H56z"
        }
      ></path>
    </svg>
  );
}

export default ChartBarSvgIcon;
/* prettier-ignore-end */
