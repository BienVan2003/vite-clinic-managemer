/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function LayoutAdmin() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 flex-1">
        <Outlet />
      </div>
    </div>
  );
}


export default LayoutAdmin;
