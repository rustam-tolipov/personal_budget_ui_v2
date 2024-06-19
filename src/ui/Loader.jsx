import { Spinner } from "@material-tailwind/react";
import React from "react";

const Loader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-transparent">
      <Spinner className="h-12 w-12" />
    </div>
  );
};

export default Loader;
