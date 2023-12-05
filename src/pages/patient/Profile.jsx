import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { apiEditProfile } from '../../services';
import { formatyyyyMMdd } from '../../utils/formatDateJs';

const user = JSON.parse(localStorage.getItem('user'))
const Profile = function () {
    const [object, setObject] = useState({
        name: user.name,
        username: user.username,
        gender: user.gender,
        email: user.email,
        numberPhone: user.numberPhone,
        password: '',
        dateOfBirth: formatyyyyMMdd(user.dateOfBirth) || null,
        address: user.address || '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setObject({
            ...object,
            [name]: value
        })
    }

    const handleSaveProfile = async () => {
        const check = Object.keys(object).some(o => object[o] == "")
        if(check) {
            toast.error("Vui lòng nhập đủ thông tin", {position:"bottom-left"})
            return;
        }

        if(dateOfBirth == null) {
            toast.error("Vui lòng chọn ngày sinh", {position:"bottom-left"})
            return;
        }

        console.log(object)

        const response = await apiEditProfile(object)
        if(response.status) {
            toast.success("Cập nhật hồ sơ cá nhân thành công")
            localStorage.setItem('user', JSON.stringify(response.data))
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        } else {
            toast.error(response.message)
        }
    }
    return (
            <div className="container mx-auto pt-8 bg-slate-300 pb-6">
                <div className="md:w-[800px] mx-auto bg-white p-8 border rounded shadow-md">
                    <h2 className="text-2xl font-semibold mb-6">Chỉnh sửa profile</h2>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-gray-600 text-sm font-medium mb-2"
                            >
                                Họ và tên
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={object.name}
                                onChange={handleInputChange}
                                className="form-input w-full rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="block text-gray-600 text-sm font-medium mb-2"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={object.username}
                                onChange={handleInputChange}
                                className="form-input w-full rounded-md"
                            />
                        </div>
                        {/* Gender */}
                        <div className="mb-4">
                            <label
                                htmlFor="gender"
                                className="block text-gray-600 text-sm font-medium mb-2"
                            >
                                Giới tính
                            </label>
                            <select id="gender" name="gender" 
                            value={object.gender}
                            onChange={handleInputChange}
                            className="form-select w-full">
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </div>
                        {/* Email */}
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-600 text-sm font-medium mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={object.email}
                                onChange={handleInputChange}
                                className="form-input w-full rounded-md"
                            />
                        </div>
                        {/* NumberPhone */}
                        <div className="mb-4">
                            <label
                                htmlFor="numberPhone"
                                className="block text-gray-600 text-sm font-medium mb-2"
                            >
                                Số điện thoại
                            </label>
                            <input
                                type="text"
                                id="numberPhone"
                                name="numberPhone"
                                value={object.numberPhone}
                                onChange={handleInputChange}
                                className="form-input w-full rounded-md"
                            />
                        </div>
                        {/* Password */}
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-gray-600 text-sm font-medium mb-2"
                            >
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={object.password}
                                onChange={handleInputChange}
                                className="form-input w-full rounded-md"
                            />
                        </div>
                        {/* Date of Birth */}
                        <div className="mb-4">
                            <label
                                htmlFor="dateOfBirth"
                                className="block text-gray-600 text-sm font-medium mb-2"
                            >
                                Ngày sinh
                            </label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={object.dateOfBirth}
                                onChange={handleInputChange}
                                className="form-input w-full rounded-md"
                            />
                        </div>
                        {/* Address */}
                        <div className="mb-4">
                            <label
                                htmlFor="address"
                                className="block text-gray-600 text-sm font-medium mb-2"
                            >
                                Địa chỉ
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                value={object.address}
                                onChange={handleInputChange}
                                className="form-textarea w-full rounded-md"
                            />
                        </div>
                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={handleSaveProfile}
                                className="bg-green-700 text-white px-4 py-2 rounded"
                            >
                                Lưu lại
                            </button>
                        </div>
                    </div>
                </div>
            </div>

    );
};

export default Profile;
