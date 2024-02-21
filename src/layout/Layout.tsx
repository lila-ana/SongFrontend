import Sidebar from "./Sidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="sm:grid sm:grid-cols-12 gap-3 bg-navyBlue h-screen w-screen">
      <Sidebar />
      <div className="col-span-10">
        <div className=" scrollbar-hide min-w-[680px] h-full p-10  overflow-auto ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
