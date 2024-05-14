import { BellIcon } from "@heroicons/react/24/solid";
import React from "react";
import { SearchBar } from "../ui/Searbar";

const Dashboard = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-20 items-center bg-white px-4 shadow-3xl">
        <SearchBar />
        <BellIcon className="ml-auto h-8 w-8 text-gray-900" />
      </div>
      <div className="h-full w-full bg-[#F1F1F1] p-4">Dashboard</div>
    </div>
  );
};

export default Dashboard;
