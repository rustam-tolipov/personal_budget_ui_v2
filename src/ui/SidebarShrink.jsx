import React from "react";
import SidebarLink from "./SidebarLink";
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

const SidebarShrink = ({ isOpen, setIsOpen, isShrink, setIsShrink }) => {
  return (
    <div
      className={`flex h-full w-full flex-col bg-[#232323] transition-all duration-75`}
    >
      <div className="flex h-20 items-center justify-center">
        <img src="images/beedget.svg" alt="logo" className="h-8" />
      </div>

      <div
        className="flex h-full w-full flex-col items-center gap-4 pb-8 pt-4"
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
        <ArrowRightStartOnRectangleIcon
          className="mt-auto h-6 w-6 cursor-pointer"
          onClick={() => setIsShrink(false)}
        />
      </div>
    </div>
  );
};

export default SidebarShrink;
