declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";

  // Export as component
  const content: ImageProps["source"] | React.FC<SvgProps>;
  export default content;

  // Also export as image source
  export const ReactComponent: React.FC<SvgProps>;
}
