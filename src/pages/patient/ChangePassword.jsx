import { useState } from "react";
import { toast } from "react-toastify";
import { apiChangePassword } from "../../services";

const ChangePassword = function () {
    const [object, setObject] = useState({
        username: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const resetObject = () => {
        setObject({
            username: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setObject((prevObject) => ({
            ...prevObject,
            [name]: value
        }))
    }

    const handleChangePassword = async () => {
        if (!object.username || !object.oldPassword || !object.newPassword || !object.confirmPassword) {
            toast.error("Vui lòng nhập đủ thông tin")
            return;
        }

        if (object.newPassword !== object.confirmPassword) {
            toast.error("Mật khẩu không khớp")
        }

        const response = await apiChangePassword({
            username: object.username,
            oldPassword: object.oldPassword,
            newPassword: object.newPassword,
        })

        if(response.status) {
            toast(response.message || "Thay đổi mật khẩu thành công", { position: 'bottom-left'})
            resetObject()
        } else {
            toast.error(response.message || "Thay đổi mật khẩu thất bại") 
        }
           


    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                    Đổi mật khẩu
                </h1>
                <form className="mt-4" >
                    <div className="mb-4">
                        <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="old-password"
                        >
                            Tên người dùng
                        </label>
                        <input
                            className="w-full px-3 mt-1 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                            type="text"
                            id="old-password"
                            name="username"
                            value={object.username}
                            onChange={handleInputChange}
                            required=""
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="old-password"
                        >
                            Mật khẩu cũ
                        </label>
                        <input
                            className="w-full px-3 mt-1 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                            type="password"
                            id="old-password"
                            name="oldPassword"
                            value={object.oldPassword}
                            onChange={handleInputChange}
                            required=""
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
                            value={object.newPassword}
                            onChange={handleInputChange}
                            required=""
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
                            value={object.confirmPassword}
                            onChange={handleInputChange}
                            required=""
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="w-full px-4 py-2 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700"
                            onClick={handleChangePassword}
                            type="button"
                        >
                            Đổi mật khẩu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
