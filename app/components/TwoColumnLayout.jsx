import React from "react";

const TwoColumnLayout = ({ leftChildren, rightChildren }) => (
  <div className="flex flex-col lg:flex-row py-20 gap-10  md:gap-20">
    {/* Description */}
    <div className="lg:w-[30%] w-full border-solid border-black border-1">
      {leftChildren}
    </div>
    {/* Chat */}
    <div className="lg:w-[70%] w-full min-h-screen">{rightChildren}</div>
  </div>
);

export default TwoColumnLayout;
