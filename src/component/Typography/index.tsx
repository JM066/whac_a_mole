import React from "react";

interface ITypography {
  as?: React.ElementType;
}
export default function Typography(
  props: React.PropsWithChildren<ITypography>
) {
  const Text = props.as || "div";
  const handleSize = () => {
    if (props.as === "h1") {
      return { fontSize: "20px" };
    }
    if (props.as === "h2") {
      return { fontSize: "18px" };
    }
    return { fontSize: "16px" };
  };

  return <Text style={handleSize()}>{props.children}</Text>;
}
