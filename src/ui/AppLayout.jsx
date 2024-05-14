import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  const [isShrink, setIsShrink] = useState(true);

  return (
    <div
      className={`grid h-[100dvh] bg-[#1F1F1F] ${isShrink ? "sm:grid-cols-[5%,auto]" : "sm:grid-cols-[20%,auto]"}`}
    >
      <div className="hidden sm:block">
        <Sidebar isShrink={isShrink} setIsShrink={setIsShrink} />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
