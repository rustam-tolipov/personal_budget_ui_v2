import { CalendarIcon } from "@heroicons/react/24/solid";
import React from "react";
import { SearchBar } from "../ui/Searbar";

const Expenses = () => {
  return (
    <div className="grid h-full">
      <div className="flex flex-col gap-4 px-4 pb-4">
        <div className="flex h-24 items-end justify-between bg-[#1F1F1F]">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl">Expenses</h2>
            <p className="flex gap-1 text-sm text-[#626262]">
              <CalendarIcon className="h-4" />
              Wednesday, June 19
            </p>
          </div>
          <SearchBar />
          {/* <BellIcon className="h-8 w-8 text-gray-900" /> */}
        </div>

        <div className="grid h-full w-full grid-cols-6 gap-4">
          {Array(32)
            .fill(null)
            .map((_, index) => {
              return (
                <div
                  key={index}
                  className="flex h-full min-h-[10rem] w-full items-center justify-center rounded-md bg-[#232323]"
                >
                  CATEGORY
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
