import { Dropdown } from 'flowbite-react';
import { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Nav = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const tmp = localStorage.getItem("user")
        if (tmp) {
            setUser(JSON.parse(tmp))
        }
    }, [])


    let [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("user");
        window.location.replace("/");
        toast("Đăng xuất thành công", { position: "top-center" });

    }
    return (
        <div className="shadow-md w-full sticky z-50 top-0 left-0">
            <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
                <NavLink to="/"><div
                    className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800"
                >
                    <span className="text-3xl text-indigo-600 mr-1 pt-2">
                        <img src="../../public/logo.svg" alt="logo" />
                    </span>
                    Phòng khám Biên Hưng
                </div>
                </NavLink>
                <div
                    onClick={() => setOpen(!open)}
                    className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
                >
                    {open ? <IoClose /> : <IoMenu />}
                </div>

                <ul
                    className={`shadow-md sm:shadow-none md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? "top-16 " : "top-[-490px]"
                        }`}
                >
                    <li className="md:ml-8 text-xl md:my-0 my-7">
                        <NavLink
                            to={"/"}
                            className="text-indigo-950 hover:text-indigo-400 duration-500"
                        >
                            Trang chủ
                        </NavLink>
                    </li>
                    {user && user.role === "PATIENT" &&
                        <>
                            <li className="md:ml-8 text-xl md:my-0 my-7">
                                <NavLink
                                    to={"/create-appointment"}
                                    className="text-indigo-950 hover:text-indigo-400 duration-500"
                                >
                                    Đặt lịch hẹn
                                </NavLink>
                            </li>
                            <li className="md:ml-8 text-xl md:my-0 my-7">
                                <NavLink
                                    to={"/appointment-schedule"}
                                    className="text-indigo-950 hover:text-indigo-400 duration-500"
                                >
                                    Lịch khám
                                </NavLink>
                            </li>
                        </>
                    }

                    {user && user.role === "DOCTOR" &&
                        <li className="md:ml-8 text-xl md:my-0 my-7">
                            <NavLink
                                to={"/doctor/schedule"}
                                className="text-indigo-950 hover:text-indigo-400 duration-500"
                            >
                                Lịch làm việc
                            </NavLink>
                        </li>
                    }
                    <li className="md:ml-8 text-xl md:my-0 my-7">
                        {user ? (
                            <Dropdown label={user && user.name} size="lg">
                                {user.role === "PATIENT" &&
                                    <>
                                        <Dropdown.Item onClick={() => navigate('/change-password')}>Đổi mật khẩu</Dropdown.Item>
                                        <Dropdown.Item onClick={() => navigate('/profile')}>Hồ sơ cá nhân</Dropdown.Item>
                                    </>
                                }

                                {(user.role === "ADMIN" || user.role === "DOCTOR") && <Dropdown.Item onClick={() => navigate('/admin/appointment-management')}>Trang quản trị</Dropdown.Item>}
                                <Dropdown.Item onClick={() => handleLogout()}>Đăng xuất</Dropdown.Item>
                            </Dropdown>
                        ) : (
                            <Dropdown label={"Đăng nhập"} size="lg">
                                <Dropdown.Item onClick={() => navigate('/auth/login/admin')}>Quản trị viên</Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate('/auth/login/doctor')}>Bác sĩ</Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate('/auth/login/patient')}>Bệnh nhân</Dropdown.Item>

                            </Dropdown>

                        )}</li>
                </ul>
            </div>
        </div>
    );
};

export default Nav;
