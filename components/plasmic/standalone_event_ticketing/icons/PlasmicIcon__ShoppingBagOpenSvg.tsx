// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type ShoppingBagOpenSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function ShoppingBagOpenSvgIcon(props: ShoppingBagOpenSvgIconProps) {
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
          "M216 40H40a16 16 0 00-16 16v144a16 16 0 0016 16h176a16 16 0 0016-16V56a16 16 0 00-16-16zm0 16v16H40V56zm0 144H40V88h176v112zm-40-88a48 48 0 01-96 0 8 8 0 0116 0 32 32 0 0064 0 8 8 0 0116 0z"
        }
      ></path>
    </svg>
  );
}

export default ShoppingBagOpenSvgIcon;
/* prettier-ignore-end */
