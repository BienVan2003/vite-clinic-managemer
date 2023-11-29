import { AiFillSchedule } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { FaClinicMedical, FaHospitalAlt } from "react-icons/fa";
import { FaChevronDown, FaUserDoctor } from "react-icons/fa6";
import { GiHeartPlus, GiMedicines } from "react-icons/gi";
import { MdMiscellaneousServices, MdOutlineSick, MdWorkHistory } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate()
  function dropDown() {
    document.querySelector('#submenu').classList.toggle('hidden')
    document.querySelector('#arrow').classList.toggle('rotate-180')
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    window.location.href = '/auth/login/admin'
  }

  return (
    <div
      className="sidebar p-4 w-[300px] overflow-y-auto text-center bg-gray-900 shadow h-screen"
    >
      <div className="text-gray-100 text-xl">
        <div className="p-2.5 mt-1 flex items-center rounded-md ">
          <FaHospitalAlt />
          <h1 className="ml-3 text-xl text-gray-200 font-bold">
            Trang quản trị
          </h1>

        </div>
        <hr className="my-2 text-gray-600" />
        <div>

          <div key={1} onClick={() => {navigate('/admin/appointment-management'); setSelectedItem(1)}} className={`${1 === selectedItem ? 'bg-blue-600' : 'hover:bg-blue-600'} p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer`}>
            <AiFillSchedule />
            <span className="ml-4 text-gray-200">Lịch hẹn</span>
          </div>
          <div key={2} onClick={() => {navigate('/admin/clinic-management'); setSelectedItem(2)}} className={`${2 === selectedItem ? 'bg-blue-600' : 'hover:bg-blue-600'} p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer`}>
            <FaClinicMedical />
            <span className="ml-4 text-gray-200">Phòng khám</span>
          </div>
          <div key={3} onClick={() => {navigate('/admin/doctor-management'); setSelectedItem(3)}} className={`${3 === selectedItem ? 'bg-blue-600' : 'hover:bg-blue-600'} p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer`}>
            <FaUserDoctor />
            <span className="ml-4 text-gray-200">Bác sĩ</span>
          </div>
          <hr className="my-4 text-gray-600" />
          <div key={4} onClick={() => {navigate('/admin/medicine-management'); setSelectedItem(4)}} className={`${4 === selectedItem ? 'bg-blue-600' : 'hover:bg-blue-600'} p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer`}>
            <GiMedicines />
            <span className="ml-4 text-gray-200">Thuốc điều trị</span>
          </div>
          <div key={5} onClick={() => {navigate('/admin/patient-management'); setSelectedItem(5)}} className={`${5 === selectedItem ? 'bg-blue-600' : 'hover:bg-blue-600'} p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer`}>
            <MdOutlineSick />
            <span className="ml-4 text-gray-200">Bệnh nhân</span>
          </div>
          <div key={6} onClick={() => {navigate('/admin/prescription-management'); setSelectedItem(6)}} className={`${6 === selectedItem ? 'bg-blue-600' : 'hover:bg-blue-600'} p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer`}>
            <GiHeartPlus />
            <span className="ml-4 text-gray-200">Đơn thuốc</span>
          </div>
          <hr className="my-4 text-gray-600" />
          <div key={7} onClick={() => {navigate('/admin/service-management'); setSelectedItem(7)}} className={`${7 === selectedItem ? 'bg-blue-600' : 'hover:bg-blue-600'} p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer`}>
            <MdMiscellaneousServices />
            <span className="ml-4 text-gray-200">Khoa khám</span>
          </div>
          <div key={8} onClick={() => {navigate('/admin/shift-management'); setSelectedItem(8)}} className={`${8 === selectedItem ? 'bg-blue-600' : 'hover:bg-blue-600'} p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer`}>
            <MdWorkHistory />
            <span className="ml-4 text-gray-200">Ca làm việc</span>
          </div>
          <div key={9} onClick={() => {navigate('/admin/record-management'); setSelectedItem(9)}} className={`${9 === selectedItem ? 'bg-blue-600' : 'hover:bg-blue-600'} p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer`}>
            <MdWorkHistory />
            <span className="ml-4 text-gray-200">Hồ sơ khám</span>
          </div>
          <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
            <BsPersonCircle />
            <div
              className="flex justify-between w-full items-center"
              onClick={() => dropDown()}
            >
              <span className="ml-4 text-gray-200">Quản trị</span>
              <span className="text-sm rotate-0 " id="arrow">
                <FaChevronDown />
              </span>
            </div>
          </div>
          <div
            className="leading-7 text-left text-lg font-thin mt-2 w-4/5 mx-auto hidden"
            id="submenu"
          >
         
            <h1 onClick={handleLogout} className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
              Logout
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Sidebar;
