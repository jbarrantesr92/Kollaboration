// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type QrCodeSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function QrCodeSvgIcon(props: QrCodeSvgIconProps) {
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
          "M104 40H56a16 16 0 00-16 16v48a16 16 0 0016 16h48a16 16 0 0016-16V56a16 16 0 00-16-16zm0 64H56V56h48v48zm0 32H56a16 16 0 00-16 16v48a16 16 0 0016 16h48a16 16 0 0016-16v-48a16 16 0 00-16-16zm0 64H56v-48h48v48zm96-160h-48a16 16 0 00-16 16v48a16 16 0 0016 16h48a16 16 0 0016-16V56a16 16 0 00-16-16zm0 64h-48V56h48v48zm-64 72v-32a8 8 0 0116 0v32a8 8 0 01-16 0zm80-16a8 8 0 01-8 8h-24v40a8 8 0 01-8 8h-32a8 8 0 010-16h24v-56a8 8 0 0116 0v8h24a8 8 0 018 8zm0 32v16a8 8 0 01-16 0v-16a8 8 0 0116 0z"
        }
      ></path>
    </svg>
  );
}

export default QrCodeSvgIcon;
/* prettier-ignore-end */
