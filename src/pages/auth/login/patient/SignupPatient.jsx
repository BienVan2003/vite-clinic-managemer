import { Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import UserLayout from "../../layouts/UserLayout";
import { apiSignup } from '../../services/auth';

const SignupPatient = function () {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loadingAPI, setLoadingAPI] = useState(false);

    function isEmailValid(email) {
        // Biểu thức chính quy kiểm tra email
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailRegex.test(email);
    }
    
    function isPhoneNumberValid(phoneNumber) {
        // Biểu thức chính quy kiểm tra số điện thoại (dựa trên số điện thoại 10 chữ số)
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
    }

    useEffect(() => {
        let accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            navigate("/");
        }
    }, [navigate]);

    const handleSignup = async () => {
        if (!username || !name || !email || !password || !passwordConfirm || !phoneNumber) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        } else if (!isEmailValid(email)) {
            toast.error("Email không hợp lệ");
            return;
        } else if (password.length < 6) {
            toast.error("Password phải trên 6 kí tự");
            return;
        } else if (password !== passwordConfirm) {
            toast.error("Mật khẩu không trùng khớp");
            return;
        } else if (isPhoneNumberValid(phoneNumber)) {
            console.log("Số điện thoại không hợp lệ");
        }

        setLoadingAPI(true);
        let res = await apiSignup(username, name, password, email, phoneNumber);

        if (res && res.status === true) {
            toast.success("Đăng ký thành công!");
            // Đợi một chút trước khi chuyển hướng
            await new Promise((resolve) => setTimeout(resolve, 2000));
            navigate("/auth/login/patient");
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
                        <i className="fa-solid fa-user" /> Đăng ký
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
                            placeholder="Ví dụ: admin"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="passwordConfirm" className="block text-base mb-2">
                            Nhập lại mật khẩu
                        </label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                            placeholder="Confirm password"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
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
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="mt-5">
                        <button
                            disabled={loadingAPI || !(username && name && password && email && phoneNumber)}
                            onClick={() => handleSignup()}
                            className="border-2 border-green-700 bg-green-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-green-700 font-semibold"
                        >
                            {loadingAPI && <Spinner />}
                            &nbsp;&nbsp;Register
                        </button>
                    </div>
                    <div className="text-center mt-5">
                        Đã có tài khoản?
                        <Link className="text-sky-500" to={'/auth/login/patient'}> Đăng nhập</Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </UserLayout>
    );
};

export default SignupPatient;