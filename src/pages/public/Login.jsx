import { Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import UserLayout from "../../layouts/UserLayout";
import { apiLogin } from '../../services/auth';


function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loadingAPI, setLoadingAPI] = useState(false);

    useEffect(() => {
        document.title = 'Đăng nhập';
        let accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            navigate("/");
        }
    }, [navigate]);

    const handleLogin = async () => {

        if (!username || !password) {
            toast.error("Username/Password is required!");
            return;
        }
        setLoadingAPI(true);
        let res = await apiLogin(username, password);

        if (res && res.accessToken) {
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("username", username);
            toast.success("Đăng nhập thành công!");
            // Đợi một chút trước khi chuyển hướng
            await new Promise((resolve) => setTimeout(resolve, 1500));
            navigate("/");
        } else if (res && res.status === 400) {
            toast.error(res.data.message);
        }
        setLoadingAPI(false);
    }

    return (
        <UserLayout>
            <div className="flex justify-center items-center h-screen bg-slate-300">
                <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                    <h1 className="text-3xl block text-center font-semibold">
                        <i className="fa-solid fa-user" /> Đăng nhập
                    </h1>
                    <hr className="mt-3" />
                    <div className="mt-3">
                        <label htmlFor="username" className="block text-base mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            disabled={loadingAPI || !(username && password)}
                            onClick={() => handleLogin()}
                            className={`${(loadingAPI || !(username && password)) ? 'hover:bg-transparent hover:text-green-700' : ''} border-2 border-green-700 bg-green-700 text-white py-1 w-full rounded-md font-semibold`}
                        >
                            {loadingAPI && <Spinner />}
                            &nbsp;&nbsp;Login
                        </button>
                    </div>
                    <div className="text-center mt-5">
                        Bạn chưa có tài khoản?
                        <Link className="text-sky-500" to={'/auth/signup/patient'}> Đăng ký</Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </UserLayout>

    );
}

export default Login;
