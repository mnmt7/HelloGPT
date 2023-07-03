"use client";

import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // const Navbar = () => {
  return (
    <nav className="fixed z-10 top-0 bg-gray-50 text-gray-800 w-full p-4 items-center">
      <a href="/" className="text-center flex items-center justify-center">
        <span className="text-4xl">👋 HelloGPT</span>
      </a>
    </nav>
  );
};

export default Navbar;
