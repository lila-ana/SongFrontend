import React from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { DASHBOARD_SIDEBAR_LINKS } from "./SidebarData";
import LOGO from "../Assets/logo.png";

interface SidebarLinkProps {
  item: {
    key: string;
    path: string;
    icon: JSX.Element;
    label: string;
  };
}

const linkClasses =
  "flex items-center gap-2 px-3 py-2 font-medium hover:no-underline h-14";

const SidebarLink: React.FC<SidebarLinkProps> = ({ item }) => {
  const { pathname } = useLocation();
  return (
    <Link
      to={`/dashboard/${item.path}`}
      className={classNames(
        pathname.includes(item.path)
          ? "bg-navyBlue px-4 text-blueGreen font-extrabold"
          : "text-blueGrotto px-4 h-14",
        linkClasses
      )}
    >
      <span className="text-xl">{item.icon}</span>
      <span className="hidden lg:inline-block font-quicksand font-normal">
        {item.label}
      </span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="hidden sm:flex flex-col col-span-1 md:col-span-2 md:px-4 font-quicksand overflow-hidden scrollbar-hide">
      <Link
        to="/main"
        className="flex flex-col justify-center items-center gap-2 py-2"
      >
        <img src={LOGO} alt="Hulu Beje Logo" />
      </Link>
      <div className="flex-1 py-3 flex-col gap-0.5 text-sm">
        {DASHBOARD_SIDEBAR_LINKS.map((item: any) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
