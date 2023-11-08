import { Dropdown } from 'flowbite-react';
import { useState } from "react";
import { IoClose, IoLogoIonic, IoMenu } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Nav = () => {
    let Links = [
        { name: "Trang chủ", link: "/" },
        { name: "Đặt lịch hẹn", link: "/create-appointment" },
        { name: "Tin tức", link: "/news" },
        { name: "Liên hệ", link: "/contact" },
    ];
    let [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("username");
        navigate("/");
        toast.success("Đăng xuất thành công!");
    }
    return (
        <div className="shadow-md w-full sticky top-0 left-0">
            <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
                <NavLink to="/"><div
                    className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800"
                >
                    <span className="text-3xl text-indigo-600 mr-1 pt-2">
                        <IoLogoIonic />
                    </span>
                    Biên-Hưng
                </div>
                </NavLink>
                <div
                    onClick={() => setOpen(!open)}
                    className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
                >
                    {open ? <IoClose /> : <IoMenu />}
                </div>

                <ul
                    className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? "top-16 " : "top-[-490px]"
                        }`}
                >
                    {Links.map((link) => (
                        <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
                            <NavLink
                                to={link.link}
                                className="text-indigo-950 hover:text-indigo-400 duration-500"
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                    <li className="md:ml-8 text-xl md:my-0 my-7">
                        {localStorage.getItem("accessToken") ? (
                            // Nếu localStorage có "accessToken"
                            <Dropdown label={localStorage.getItem("username")} size="lg">
                                <Dropdown.Item onClick={() => alert('Profile!')}>Profile</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleLogout()}>Đăng xuất</Dropdown.Item>
                            </Dropdown>
                        ) : (
                            <NavLink to='/auth/login/patient' className='bg-green-600 text-white py-2 px-6 rounded hover:bg-green-400 duration-500'>Đăng nhập</NavLink>
                        )}</li>
                </ul>
            </div>
        </div>
    );
};

export default Nav;
