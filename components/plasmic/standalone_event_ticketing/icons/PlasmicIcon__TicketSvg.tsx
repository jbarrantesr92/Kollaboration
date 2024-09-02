// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type TicketSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function TicketSvgIcon(props: TicketSvgIconProps) {
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
          "M232 104a8 8 0 008-8V64a16 16 0 00-16-16H32a16 16 0 00-16 16v32a8 8 0 008 8 24 24 0 010 48 8 8 0 00-8 8v32a16 16 0 0016 16h192a16 16 0 0016-16v-32a8 8 0 00-8-8 24 24 0 010-48zM32 167.2a40 40 0 000-78.4V64h56v128H32zm192 0V192H104V64h120v24.8a40 40 0 000 78.4z"
        }
      ></path>
    </svg>
  );
}

export default TicketSvgIcon;
/* prettier-ignore-end */
