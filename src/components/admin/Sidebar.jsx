/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const menus = [
    { id: 1, title: "Lịch đặt hẹn", src: "Chart_fill", path: "/appointment-schedule" },
    { id: 2, title: "Lịch sử đặt hẹn", src: "Chat", path: "/appointment-history" },
    { id: 3, title: "Phòng khám", src: "Folder", path: "/clinic", gap: true },
    { id: 4, title: "Dịch vụ", src: "Calendar", path: "/service" },
    { id: 5, title: "Thuốc", src: "Search", path: "/medicine" },
    { id: 6, title: "Bác sĩ", src: "Chart", path: "/doctor" },
    { id: 7, title: "Nhân viên y tế", src: "User", path: "/hospital-staff", gap: true },
    { id: 8, title: "Bệnh nhân", src: "Setting", path: "/patient" },
  ];

  return (
    <div
      className={`${open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
    >
      <img
        src="./src/assets/sidebar/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${!open && "rotate-180"
          }`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src="./src/assets/sidebar/logo.png"
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
            }`}
        >
          Designer
        </h1>
      </div>
      <SidebarMenu menus={menus} open={open}></SidebarMenu>
    </div>

  );
};

const SidebarMenu = ({ menus, open }) => {
  return (
    <div className="pt-6">
      {menus.map((menu, index) => (
        <SidebarMenuItem key={index} menu={menu} open={open} />
      ))}
    </div>
  );
};

const SidebarMenuItem = ({ menu, open }) => {
  return (
    <Link
      to={menu.path}
      className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${menu.gap ? "mt-9" : "mt-2"}`}
    >
      <img src={`./src/assets/sidebar/${menu.src}.png`} />
      <span className={`${!open && "hidden"} origin-left duration-200`}>
        {menu.title}
      </span>
    </Link>
  );
};
export default Sidebar;
