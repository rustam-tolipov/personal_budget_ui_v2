import {
  BanknotesIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`absolute ${isOpen ? "" : "-translate-x-full"} z-10 h-full w-[70%] bg-[#252525] transition-all duration-75 sm:relative sm:w-full sm:-translate-x-0`}
    >
      <Header />

      <div
        className="flex h-full w-full flex-col gap-4 pl-6 pt-4"
        onClick={() => setIsOpen(false)}
      >
        <SidebarLink
          path="/dashboard"
          pathName="Dashboard"
          icon={<HomeIcon className="h-6 w-6" />}
        />
        <SidebarLink
          path="/incomes"
          pathName="Incomes"
          icon={<BanknotesIcon className="h-6 w-6" />}
        />
        <SidebarLink
          path="/expenses"
          pathName="Expenses"
          icon={<ClipboardDocumentCheckIcon className="h-6 w-6" />}
        />
        <SidebarLink
          path="/calendar"
          pathName="Calendar"
          icon={<CalendarDaysIcon className="h-6 w-6" />}
        />
        <SidebarLink
          path="/savings"
          pathName="Savings"
          icon={<CreditCardIcon className="h-6 w-6" />}
        />
        <SidebarLink
          path="/currency"
          pathName="Currency"
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
        />
      </div>
    </div>
  );
};

export default Sidebar;

const Header = () => {
  return (
    <div className="flex h-20 items-center bg-[#1f1f1f] px-4">
      <div className="flex select-none items-center gap-4">
        <img src="images/beedget.svg" alt="logo" className="h-8" />
        <p className="text-xl text-gray-50">beedget</p>
      </div>

      <UserCircleIcon className="ml-auto h-8 w-8 cursor-pointer text-[#FFCB03]" />
    </div>
  );
};

const SidebarLink = ({ path, pathName, icon }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive, isPending }) =>
        isPending
          ? "pending"
          : isActive
            ? "flex items-center gap-2 rounded-md	 rounded-r-none bg-[#303030] p-4 py-2 text-gray-50"
            : "flex items-center gap-2 rounded-md rounded-r-none p-4 py-2 text-gray-50 hover:bg-[#303030]"
      }
    >
      {icon}
      <p>{pathName}</p>
    </NavLink>
  );
};
