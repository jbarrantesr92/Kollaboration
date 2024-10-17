// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type TrashDuotoneSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function TrashDuotoneSvgIcon(props: TrashDuotoneSvgIconProps) {
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
        d={"M200 56v152a8 8 0 01-8 8H64a8 8 0 01-8-8V56z"}
        opacity={".2"}
      ></path>

      <path
        d={
          "M216 48h-40v-8a24 24 0 00-24-24h-48a24 24 0 00-24 24v8H40a8 8 0 000 16h8v144a16 16 0 0016 16h128a16 16 0 0016-16V64h8a8 8 0 000-16zM96 40a8 8 0 018-8h48a8 8 0 018 8v8H96zm96 168H64V64h128zm-80-104v64a8 8 0 01-16 0v-64a8 8 0 0116 0zm48 0v64a8 8 0 01-16 0v-64a8 8 0 0116 0z"
        }
      ></path>
    </svg>
  );
}

export default TrashDuotoneSvgIcon;
/* prettier-ignore-end */
