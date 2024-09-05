// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: MtmcKR1GuwbKEBJfYkVdj
// Component: Me-_EDmy2oEE

import * as React from "react";

import Head from "next/head";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

import {
  Flex as Flex__,
  MultiChoiceArg,
  PlasmicDataSourceContextProvider as PlasmicDataSourceContextProvider__,
  PlasmicIcon as PlasmicIcon__,
  PlasmicImg as PlasmicImg__,
  PlasmicLink as PlasmicLink__,
  PlasmicPageGuard as PlasmicPageGuard__,
  SingleBooleanChoiceArg,
  SingleChoiceArg,
  Stack as Stack__,
  StrictProps,
  Trans as Trans__,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts,
  ensureGlobalVariants,
  generateOnMutateForSpec,
  generateStateOnChangeProp,
  generateStateOnChangePropForCodeComponents,
  generateStateValueProp,
  get as $stateGet,
  hasVariant,
  initializeCodeComponentStates,
  initializePlasmicStates,
  makeFragment,
  omit,
  pick,
  renderPlasmicSlot,
  set as $stateSet,
  useCurrentUser,
  useDollarState,
  usePlasmicTranslator,
  useTrigger,
  wrapWithClassName
} from "@plasmicapp/react-web";
import {
  DataCtxReader as DataCtxReader__,
  useDataEnv,
  useGlobalActions
} from "@plasmicapp/react-web/lib/host";

import Button from "../../Button"; // plasmic-import: 7c1YDuGGoKuq/component

import "@plasmicapp/react-web/lib/plasmic.css";

import plasmic_antd_5_hostless_css from "../antd_5_hostless/plasmic.module.css"; // plasmic-import: ohDidvG9XsCeFumugENU3J/projectcss
import plasmic_plasmic_rich_components_css from "../plasmic_rich_components/plasmic.module.css"; // plasmic-import: jkU633o1Cz7HrJdwdxhVHk/projectcss
import projectcss from "./plasmic.module.css"; // plasmic-import: MtmcKR1GuwbKEBJfYkVdj/projectcss
import sty from "./PlasmicDeletePurchaseButton.module.css"; // plasmic-import: Me-_EDmy2oEE/css

import TrashSvgIcon from "./icons/PlasmicIcon__TrashSvg"; // plasmic-import: dKZ8ZQGn2s_e/icon
import IconIcon from "./icons/PlasmicIcon__Icon"; // plasmic-import: _VJXnu9sySb9/icon

createPlasmicElementProxy;

export type PlasmicDeletePurchaseButton__VariantMembers = {};
export type PlasmicDeletePurchaseButton__VariantsArgs = {};
type VariantPropType = keyof PlasmicDeletePurchaseButton__VariantsArgs;
export const PlasmicDeletePurchaseButton__VariantProps =
  new Array<VariantPropType>();

export type PlasmicDeletePurchaseButton__ArgsType = {
  handleDelete?: () => void;
};
type ArgPropType = keyof PlasmicDeletePurchaseButton__ArgsType;
export const PlasmicDeletePurchaseButton__ArgProps = new Array<ArgPropType>(
  "handleDelete"
);

export type PlasmicDeletePurchaseButton__OverridesType = {
  root?: Flex__<typeof Button>;
  svg?: Flex__<"svg">;
};

export interface DefaultDeletePurchaseButtonProps {
  handleDelete?: () => void;
  className?: string;
}

const $$ = {};

function useNextRouter() {
  try {
    return useRouter();
  } catch {}
  return undefined;
}

function PlasmicDeletePurchaseButton__RenderFunc(props: {
  variants: PlasmicDeletePurchaseButton__VariantsArgs;
  args: PlasmicDeletePurchaseButton__ArgsType;
  overrides: PlasmicDeletePurchaseButton__OverridesType;
  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;

  const args = React.useMemo(
    () =>
      Object.assign(
        {},
        Object.fromEntries(
          Object.entries(props.args).filter(([_, v]) => v !== undefined)
        )
      ),
    [props.args]
  );

  const $props = {
    ...args,
    ...variants
  };

  const __nextRouter = useNextRouter();
  const $ctx = useDataEnv?.() || {};
  const refsRef = React.useRef({});
  const $refs = refsRef.current;

  const currentUser = useCurrentUser?.() || {};

  return (
    <Button
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      className={classNames("__wab_instance", sty.root)}
      color={"softRed"}
      onClick={async event => {
        const $steps = {};

        $steps["runHandleDelete"] = true
          ? (() => {
              const actionArgs = { eventRef: $props["handleDelete"] };
              return (({ eventRef, args }) => {
                return eventRef?.(...(args ?? []));
              })?.apply(null, [actionArgs]);
            })()
          : undefined;
        if (
          $steps["runHandleDelete"] != null &&
          typeof $steps["runHandleDelete"] === "object" &&
          typeof $steps["runHandleDelete"].then === "function"
        ) {
          $steps["runHandleDelete"] = await $steps["runHandleDelete"];
        }
      }}
      startIcon={
        <TrashSvgIcon
          data-plasmic-name={"svg"}
          data-plasmic-override={overrides.svg}
          className={classNames(projectcss.all, sty.svg)}
          role={"img"}
        />
      }
    >
      {"Clear your cart"}
    </Button>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ["root", "svg"],
  svg: ["svg"]
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: typeof Button;
  svg: "svg";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicDeletePurchaseButton__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicDeletePurchaseButton__VariantsArgs;
    args?: PlasmicDeletePurchaseButton__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicDeletePurchaseButton__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    /* Specify args directly as props*/ Omit<
      PlasmicDeletePurchaseButton__ArgsType,
      ReservedPropsType
    > &
    /* Specify overrides for each element directly as props*/ Omit<
      NodeOverridesType<T>,
      ReservedPropsType | VariantPropType | ArgPropType
    > &
    /* Specify props for the root element*/ Omit<
      Partial<React.ComponentProps<NodeDefaultElementType[T]>>,
      ReservedPropsType | VariantPropType | ArgPropType | DescendantsType<T>
    >;

function makeNodeComponent<NodeName extends NodeNameType>(nodeName: NodeName) {
  type PropsType = NodeComponentProps<NodeName> & { key?: React.Key };
  const func = function <T extends PropsType>(
    props: T & StrictProps<T, PropsType>
  ) {
    const { variants, args, overrides } = React.useMemo(
      () =>
        deriveRenderOpts(props, {
          name: nodeName,
          descendantNames: PlasmicDescendants[nodeName],
          internalArgPropNames: PlasmicDeletePurchaseButton__ArgProps,
          internalVariantPropNames: PlasmicDeletePurchaseButton__VariantProps
        }),
      [props, nodeName]
    );
    return PlasmicDeletePurchaseButton__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicDeletePurchaseButton";
  } else {
    func.displayName = `PlasmicDeletePurchaseButton.${nodeName}`;
  }
  return func;
}

export const PlasmicDeletePurchaseButton = Object.assign(
  // Top-level PlasmicDeletePurchaseButton renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    svg: makeNodeComponent("svg"),

    // Metadata about props expected for PlasmicDeletePurchaseButton
    internalVariantProps: PlasmicDeletePurchaseButton__VariantProps,
    internalArgProps: PlasmicDeletePurchaseButton__ArgProps
  }
);

export default PlasmicDeletePurchaseButton;
/* prettier-ignore-end */
