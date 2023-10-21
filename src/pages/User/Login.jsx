import { Link } from "react-router-dom";
import UserLayout from "../../layouts/UserLayout";
const Login = function () {
    return (
        <UserLayout>
            <div className="flex justify-center items-center h-screen bg-slate-300">
                <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                    <h1 className="text-3xl block text-center font-semibold">
                        <i className="fa-solid fa-user" /> Đăng nhập
                    </h1>
                    <hr className="mt-3" />
                    <div className="mt-3">
                        <label htmlFor="email" className="block text-base mb-2">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="password" className="block text-base mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                        <div>
                            <input type="checkbox" />
                            <label className="ml-4">Remember Me</label>
                        </div>
                        <div>
                            <a href="#" className="text-indigo-800 font-semibold">
                                Quên mật khẩu?
                            </a>
                        </div>
                    </div>
                    <div className="mt-5">
                        <button
                            type="submit"
                            className="border-2 border-green-700 bg-green-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-green-700 font-semibold"
                        >
                            <i className="fa-solid fa-right-to-bracket" />
                            &nbsp;&nbsp;Login
                        </button>
                    </div>
                    <div className="text-center mt-5">
                        Bạn chưa có tài khoản?
                        <Link className="text-sky-500" to={'/register'}> Đăng ký</Link>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default Login;
