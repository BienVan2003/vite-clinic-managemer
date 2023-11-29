import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { apiForgotPassword, apiResetPassword } from '../../services'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [isSend, setIsSend] = useState(false)
    const [object, setObject] = useState({
        token: '',
        newPassword: '',
        confirmPassword: ''
    })

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setObject((prevObject) => ({
            ...prevObject,
            [name]: value
        }))
    }

    function isEmailValid(email) {
        // Biểu thức chính quy kiểm tra email
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailRegex.test(email);
    }

    const sendCodeByEmail = async (email) => {
        if(!email) {
            toast("Vui lòng nhập email", { position: "bottom-left"})
            return;
        }

        if(!isEmailValid(email)) {
            toast("Định dạng email không hợp lệ", { position: "bottom-left"})
            return;
        }
        const response = await apiForgotPassword(email)
        if(response.status) {
            toast.success(response.message || "Vui lòng kiểm tra gmail của bạn")
            setIsSend(true)
        } else {
            toast.error(response.message || "Có lỗi xảy ra")
            setIsSend(false)
        }
           
    }

    const handleForgotPassword = async () => {
        if(!object.token || !object.newPassword || !object.confirmPassword) {
            toast.error("Vui lòng nhập đủ thông tin")
            return;
        } 

        if(object.newPassword !== object.confirmPassword) {
            toast.error("Mật khẩu không khớp")
            return;
        }

        const response = await apiResetPassword({
            token: object.token,
            newPassword: object.newPassword
        })

        if(response.status) {
            toast.success(response.message || "Thay đổi mật khẩu thành công")
            setIsSend(false);
            navigate("/auth/login/patient")
        }else {
            toast.error(response.message || "Thay đổi mật khẩu thất bại")
            setIsSend(false)
        }  


    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                    Quên mật khẩu
                </h1>
                {!isSend && <form className="mt-4" >
                    <div className="mb-4">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-[4px]"
                            htmlFor="email"
                        >
                            Nhập gmail
                        </label>
                        <input
                            className="w-full px-3 mt-1 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <button
                            className="mt-2 w-full px-4 py-2 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700"
                            type="button"
                            onClick={() => sendCodeByEmail(email)}
                        >
                            Gửi mã
                        </button>
                        <button
                            className="mt-2 w-full px-4 py-2 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700"
                            type="button"
                            onClick={() => setIsSend(true)}
                        >
                            Nhập mã
                        </button>
                    </div>
                </form>}

                {isSend && <>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="token"
                        >
                            Mã code
                        </label>
                        <input
                            className="w-full px-3 mt-1 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                            type="text"
                            id="token"
                            name="token"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="new-password"
                        >
                            Mật khẩu mới
                        </label>
                        <input
                            className="w-full px-3 mt-1 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                            type="password"
                            id="new-password"
                            name="newPassword"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="confirm-password"
                        >
                            Xác nhận mật khẩu mới
                        </label>
                        <input
                            className="w-full px-3 mt-1 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <button
                            className="mt-2 w-full px-4 py-2 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700"
                            type="button"
                            onClick={() => handleForgotPassword()}
                        >
                            Đổi mật khẩu
                        </button>
                        {email ? <button
                            className="mt-2 w-full px-4 py-2 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700"
                            type="button"
                            onClick={() => sendCodeByEmail(email)}
                        >
                            Gửi lại mã
                        </button> : <button
                            className="mt-2 w-full px-4 py-2 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700"
                            type="button"
                            onClick={() => setIsSend(false)}
                        >
                            Nhập lại email
                        </button>}
                    </div>
                </>}
            </div>
        </div>
    )
}
