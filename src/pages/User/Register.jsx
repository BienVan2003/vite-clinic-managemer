import { Link } from "react-router-dom";
import UserLayout from "../../layouts/UserLayout";
const Register = function () {
    return (
        <UserLayout>
            <div className="flex justify-center items-center h-screen bg-slate-300">
                <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                    <h1 className="text-3xl block text-center font-semibold">
                        <i className="fa-solid fa-user" /> Đăng ký
                    </h1>
                    <hr className="mt-3" />
                    <div className="mt-3">
                        <label htmlFor="fullName" className="block text-base mb-2">
                            Họ tên
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                            placeholder="Ví dụ: Trần Văn A"
                        />
                    </div>
                    <div className="mt-3 flex items-center">
                        <label htmlFor="male" className="text-gray-700 mr-2">
                            Nam
                        </label>
                        <input type="radio" id="male" name="gender" className="mr-2" checked />
                        <label htmlFor="female" className="text-gray-700 mr-2">
                            Nữ
                        </label>
                        <input type="radio" id="female" name="gender" className="mr-2" />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="birthday" className="block text-base mb-2">
                            Ngày sinh
                        </label>
                        <input
                            type="date"
                            id="birthday"
                            name="birthday"
                            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                        />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="email" className="block text-base mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                            placeholder="Ví dụ: User@gmail.com"
                        />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="password" className="block text-base mb-2">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                            placeholder="Create password"
                        />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="password_confirm" className="block text-base mb-2">
                            Nhập lại mật khẩu
                        </label>
                        <input
                            type="password"
                            id="password_confirm"
                            name="password_confirm"
                            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                            placeholder="Confirm password"
                        />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="phone" className="block text-base mb-2">
                            Số điện thoại
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                            placeholder="Ví dụ: 0123456789"
                        />
                    </div>
                    <div className="mt-5">
                        <button
                            type="submit"
                            className="border-2 border-green-700 bg-green-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-green-700 font-semibold"
                        >
                            <i className="fa-solid fa-right-to-bracket" />
                            &nbsp;&nbsp;Register
                        </button>
                    </div>
                    <div className="text-center mt-5">
                        Đã có tài khoản?
                        <Link className="text-sky-500" to={'/login'}> Đăng nhập</Link>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default Register;
