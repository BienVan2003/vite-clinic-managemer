import { Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { apiLoginPatient } from '../../../../services';


function LoginPatient() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loadingAPI, setLoadingAPI] = useState(false);

    const validateUsername = (value) => {
        if (!value.trim()) {
            return 'Vui lòng nhập tên người dùng.';
        } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
            return 'Tên người dùng chỉ được chứa chữ cái và số.';
        }
        return '';
    };

    const validatePassword = (value) => {
        if (value.length < 6) {
            return 'Mật khẩu phải chứa ít nhất 6 ký tự.';
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'username') {
            setUsername(value);
            const usernameError = validateUsername(value);
            setErrors((prevErrors) => ({ ...prevErrors, username: usernameError }));
        } else if (name === 'password') {
            setPassword(value);
            const passwordError = validatePassword(value);
            setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
        }
    };


    useEffect(() => {
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
        let response = await apiLoginPatient(username, password);

        if (response.user) {
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("user", JSON.stringify(response.user));
            toast.success("Đăng nhập thành công");
            await new Promise((resolve) => setTimeout(resolve, 500));
            navigate("/");
        } else {
            toast.error(response.message || "Đăng nhập thất bại");
        }
        
        setLoadingAPI(false);
    }

    return (

        <div className="w-[500px] p-6 shadow-lg bg-white rounded-md">
            <h1 className="text-3xl block text-center font-semibold">
                <i className="fa-solid fa-user" /> Đăng nhập cho người dùng
            </h1>
            <hr className="mt-3" />
            <div className="mt-3">

                <label htmlFor="username" className="block text-base mb-2">
                    Tên người dùng
                </label>

                <input
                    type="text"
                    id="username"
                    name="username"
                    className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                    placeholder="Nhập tên người dùng"
                    value={username}
                    onChange={handleChange}
                />
                {errors.username && <div className='text-xs mt-1' style={{ color: 'red' }}>{errors.username}</div>}
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
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={handleChange}
                />
                {errors.password && <div className='text-xs mt-1' style={{ color: 'red' }}>{errors.password}</div>}
            </div>
            <div className="mt-3 flex justify-between items-center">

                <div>
                    <a href="/forgot-password" className="text-indigo-800 font-semibold">
                        Quên mật khẩu?
                    </a>
                </div>
            </div>
            <div className="mt-5">
                <button
                    disabled={loadingAPI || !(username && password)}
                    onClick={() => handleLogin()}
                    className={`${(loadingAPI || !(username && password)) ? 'hover:bg-transparent hover:text-green-700' : ''} border-2 border-green-700 bg-green-700 text-white py-1 w-full cursor-pointer rounded-md font-semibold`}
                >
                    {loadingAPI && <Spinner />}
                    &nbsp;&nbsp;Đăng nhập
                </button>
            </div>
            <div className="text-center mt-5">
                Bạn chưa có tài khoản?
                <Link className="text-sky-500" to={'/auth/signup/patient'}> Đăng ký</Link>
            </div>
        </div>


    );
}

export default LoginPatient;
