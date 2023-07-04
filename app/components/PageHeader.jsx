import React from "react";
import { pressStart2P, sourceCodePro, instrumentSans } from "../styles/fonts";

const PageHeader = ({ heading1, heading2, boldText, description }) => {
  return (
    <>
      <h1 className={`${pressStart2P.className} mb-3 text-4xl uppercase`}>
        {heading1}
      </h1>
      <h2 className={`${sourceCodePro.className} mb-10 text-3xl uppercase`}>
        {heading2}
      </h2>

      <p className={`${instrumentSans.className} text-xl mb-10`}>
        <strong>{boldText}</strong> {description}
      </p>
    </>
  );
};

export default PageHeader;
