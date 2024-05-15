import { BellIcon, CalendarIcon } from "@heroicons/react/24/solid";
import React from "react";
import { SearchBar } from "../ui/Searbar";

const Dashboard = () => {
  return (
    <div className="grid h-full grid-cols-[auto,24rem]">
      <div className="flex flex-col gap-4 px-4">
        <div className="flex h-24 items-end justify-between bg-[#1F1F1F]">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl">Dashboard</h2>
            <p className="flex gap-1 text-sm text-[#626262]">
              <CalendarIcon className="h-4" />
              Wednesday, June 19
            </p>
          </div>
          <SearchBar />
          {/* <BellIcon className="h-8 w-8 text-gray-900" /> */}
        </div>

        <div className="flex h-full w-full flex-col gap-4">
          <div className="grid grid-cols-[60%,auto] gap-4">
            <div className="flex h-[40dvh] w-full items-center justify-center rounded-md bg-[#232323]">
              CHART
            </div>
            <div className="flex h-[40dvh] w-full items-center justify-center rounded-md bg-[#232323]">
              CATEGORIES
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex h-[14dvh] w-full items-center justify-center rounded-md bg-[#232323]">
              CURRENCY
            </div>
            <div className="flex h-[14dvh] w-full items-center justify-center rounded-md bg-[#232323]">
              CURRENCY
            </div>
            <div className="flex h-[14dvh] w-full items-center justify-center rounded-md bg-[#232323]">
              CURRENCY
            </div>
          </div>

          <div className="grid grid-cols-[60%,auto] gap-4">
            <div className="flex h-[40dvh] w-full items-center justify-center rounded-md bg-[#232323]">
              CALENDAR
            </div>
            <div className="flex h-[40dvh] w-full items-center justify-center rounded-md bg-[#232323]">
              TRANSACTIONS
            </div>
          </div>
        </div>
      </div>

      <div className="hidden flex-col gap-4 bg-[#242424] p-4 sm:flex">
        <div className="flex h-[8dvh] w-full items-center justify-center rounded-md bg-[#1F1F1F]">
          PROFILE
        </div>
        <div className="flex h-[40%] w-full items-center justify-center rounded-md bg-[#1F1F1F]">
          SAVINGS
        </div>
        <div className="flex h-[30%] w-full items-center justify-center rounded-md bg-[#1F1F1F]">
          MEMBERS
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
