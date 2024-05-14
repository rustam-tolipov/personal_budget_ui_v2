import { NavLink } from "react-router-dom";

const SidebarLink = ({ path, pathName, icon, isShrink }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive, isPending }) =>
        isPending
          ? "pending"
          : isActive
            ? "flex items-center gap-2 rounded-md bg-[#337BFE] px-3 py-2"
            : "flex items-center gap-2 rounded-md px-3 py-2 hover:bg-[#337BFE]"
      }
    >
      {icon}
      {!isShrink && pathName}
    </NavLink>
  );
};

export default SidebarLink;
