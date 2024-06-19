import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  
  return (
    <div className="grid h-[100dvh] sm:grid-cols-[22%,auto]">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
