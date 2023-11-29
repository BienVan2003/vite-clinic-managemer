import { Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { apiLoginAdmin } from '../../../../services/auth';


function LoginAdmin() {
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
            toast.error("Vui lòng nhập đủ thông tin");
            return;
        }

        setLoadingAPI(true);
        let response = await apiLoginAdmin(username, password);
       

        if (response.user) {
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("user", JSON.stringify(response.user));
            toast.success("Đăng nhập thành công");
            await new Promise((resolve) => setTimeout(resolve, 500));
            navigate("/admin/appointment-management");
        } else {
            toast.error(response.message || "Đăng nhập thất bại");
        }
        
        setLoadingAPI(false);
    }

    return (
        <>
            <div className="w-[500px] p-6 shadow-lg bg-white rounded-md">
                <h1 className="text-3xl block text-center font-semibold">
                    <i className="fa-solid fa-user" /> Đăng nhập dành cho Quản trị viên
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
                        className="rounded-lg w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                        placeholder="Nhập username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        className="rounded-lg w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                        placeholder="Nhập mật khẩu..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            
                <div className="mt-8">
                    <button
                        // disabled={loadingAPI || !(username && password)}
                        onClick={() => handleLogin()}
                        className={`${(loadingAPI || !(username && password)) ? 'hover:bg-transparent hover:text-green-700' : ''} border-2 border-green-700 cursor-pointer bg-green-700 text-white py-1 w-full rounded-md font-semibold`}
                    >
                        {loadingAPI && <Spinner />}
                        &nbsp;&nbsp;Đăng nhập
                    </button>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default LoginAdmin;
