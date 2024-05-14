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
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import SidebarLink from "./SidebarLink";
import SidebarShrink from "./SidebarShrink";
import SidebarFull from "./SidebarFull";

const Sidebar = ({ isShrink, setIsShrink }) => {
  const [isOpen, setIsOpen] = useState(false);

  return isShrink ? (
    <SidebarShrink
      isShrink={isShrink}
      setIsShrink={setIsShrink}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  ) : (
    <SidebarFull
      isShrink={isShrink}
      setIsShrink={setIsShrink}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
};

export default Sidebar;
