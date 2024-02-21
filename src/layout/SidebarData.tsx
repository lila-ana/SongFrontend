import { LuLayoutDashboard } from "react-icons/lu";
import { LuLayoutList } from "react-icons/lu";
import { MdOutlineManageAccounts } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { MdCategory } from "react-icons/md";

interface SidebarLinkItem {
  key: string;
  label: string;
  path: string;
  icon: JSX.Element;
}

export const DASHBOARD_SIDEBAR_LINKS: SidebarLinkItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "overview",
    icon: <LuLayoutDashboard />,
  },
  {
    key: "accounts",
    label: "Accounts",
    path: "accounts",
    icon: <MdOutlineManageAccounts />,
  },
  {
    key: "Products",
    label: "Products",
    path: "products",
    icon: <LuLayoutList />,
  },
  {
    key: "Categories",
    label: "Categories",
    path: "categories",
    icon: <MdCategory />,
  },
  {
    key: "orders",
    label: "Orders",
    path: "orders",
    icon: <AiOutlineShoppingCart />,
  },
  {
    key: "settings",
    label: "Settings",
    path: "settings",
    icon: <FiSettings />,
  },
];
