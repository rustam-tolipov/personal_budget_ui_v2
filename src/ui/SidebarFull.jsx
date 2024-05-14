import React from "react";
import {
  ArrowLeftCircleIcon,
  ArrowLeftStartOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import SidebarLink from "./SidebarLink";

const SidebarFull = ({ isOpen, setIsOpen, isShrink, setIsShrink }) => {
  return (
    <div
      className={`flex h-full w-full flex-col bg-[#232323] transition-all duration-75`}
    >
      <div className="flex h-20 items-center px-4">
        <div className="flex select-none items-center gap-4">
          <img src="images/beedget.svg" alt="logo" className="h-8" />
          <p className="text-xl">beedget</p>
        </div>

        <UserCircleIcon className="ml-auto h-8 w-8 cursor-pointer text-[#337BFE]" />
      </div>

      <div
        className="flex h-full w-full flex-col gap-4 pb-8 pl-4 pt-4"
        onClick={() => setIsOpen(false)}
      >
        <SidebarLink
          isShrink={isShrink}
          path="/dashboard"
          pathName="Dashboard"
          icon={<HomeIcon className="h-6 w-6" />}
        />
        <SidebarLink
          isShrink={isShrink}
          path="/incomes"
          pathName="Incomes"
          icon={<BanknotesIcon className="h-6 w-6" />}
        />
        <SidebarLink
          isShrink={isShrink}
          path="/expenses"
          pathName="Expenses"
          icon={<ClipboardDocumentCheckIcon className="h-6 w-6" />}
        />
        <SidebarLink
          isShrink={isShrink}
          path="/calendar"
          pathName="Calendar"
          icon={<CalendarDaysIcon className="h-6 w-6" />}
        />
        <SidebarLink
          isShrink={isShrink}
          path="/savings"
          pathName="Savings"
          icon={<CreditCardIcon className="h-6 w-6" />}
        />
        <SidebarLink
          isShrink={isShrink}
          path="/currency"
          pathName="Currency"
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
        />
        <ArrowLeftStartOnRectangleIcon
          className="ml-4 mt-auto h-6 w-6 cursor-pointer"
          onClick={() => setIsShrink(true)}
        />
      </div>
    </div>
  );
};
export default SidebarFull;
