import React from "react";

interface inputLabelType {
  text: React.ReactNode ;
  requiredLabel?: string;
}
export default function InputLabel({
  text = " ",
  requiredLabel = "*",
}: inputLabelType) {
  return (
    <label>
      <>
        {text} <span style={{ color: "red" }}>{requiredLabel}</span>
      </>
    </label>
  );
}
