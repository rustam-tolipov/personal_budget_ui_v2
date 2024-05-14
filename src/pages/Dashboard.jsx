import { BellIcon, CalendarIcon } from "@heroicons/react/24/solid";
import React from "react";
import { SearchBar } from "../ui/Searbar";

const Dashboard = () => {
  return (
    <div className="grid h-full grid-cols-[70%,auto]">
      <div className="shadow-3xl flex h-20 items-end justify-between bg-[#1F1F1F] px-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl">Dashboard</h2>
          <p className="flex gap-1 text-sm text-[#626262]">
            <CalendarIcon className="h-4" />
            Wednesday, June 19, 2029
          </p>
        </div>
        <SearchBar />
        {/* <BellIcon className="h-8 w-8 text-gray-900" /> */}
      </div>

      <div className="hidden bg-[#242424] sm:block"></div>
    </div>
  );
};

export default Dashboard;
