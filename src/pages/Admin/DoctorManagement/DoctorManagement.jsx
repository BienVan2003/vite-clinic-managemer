import { Button, Label, Modal, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { ToastContainer, toast } from 'react-toastify';
import { apiDoctorList, apiEditDoctor, apiLockDoctor, apiServiceList, apiSignupDoctor, apiUnlockDoctor } from '../../../services';
import { apiSearchDoctor } from '../../../services/search';
import { formatyyyyMMdd } from '../../../utils/formatDateJs';

const user = JSON.parse(localStorage.getItem('user'))
const DoctorManagement = function () {
    const [openModal, setOpenModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [data, setData] = useState([]);
    const [searchInput, setSearchInput] = useState('')
    const [services, setServices] = useState([]);

    const [object, setObject] = useState({
        id: -1,
        serviceId: 0,
        name: '',
        username: '',
        gender: '',
        email: '',
        numberPhone: '',
        password: '',
        dateOfBirth: '',
        address: '',
        role: 'DOCTOR'
    });

    // Hàm để cập nhật một thuộc tính cụ thể của đối tượng
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setObject((prevObject) => ({
            ...prevObject,
            [name]: value,
        }));
    };
    const handleServiceSelect = (event) => {
        const selectedServiceId = parseInt(event.target.value);
        setObject((prevObject) => ({
            ...prevObject,
            serviceId: selectedServiceId,
        }));
    };
    const handleObjectEdit = (o) => {
        setObject({
            ...object,
            id: o.id,
            serviceId: o.service.id,
            name: o.name,
            username: o.username,
            password: "########",
            gender: o.gender,
            email: o.email,
            numberPhone: o.numberPhone,
            dateOfBirth: formatyyyyMMdd(o.dateOfBirth),
            address: o.address,
            role: 'DOCTOR',
            active: o.active
        })

    }

    const resetObject = () => {
        setObject({
            ...object,
            id: -1,
            serviceId: 0,
            name: '',
            username: '',
            gender: '',
            email: '',
            numberPhone: '',
            password: '',
            dateOfBirth: '',
            address: '',
            role: 'DOCTOR'
        })
    }

    const handleAddService = async () => {
        const check = Object.keys(object).some(key => 
            object[key] === ''
        );

        if(check) {
            toast.error("Vui lòng nhập đủ thông tin", { position: "bottom-left" })
            return;
        }

        if (object.serviceId == 0) {
            toast.error('Vui lòng chọn khoa!', { position: "bottom-left" })
            return;
        }


        const response = await apiSignupDoctor(object) 
        if(response.status) {
            toast.success(response.message || "Thêm tài khoản bác sĩ thành công");
            resetObject()
            closeModal();
            setIsSubmitted(true);
        } else {
            toast.error(response.message);
        }

        
    }

    const handleEditService = async () => {
        if (object.serviceId == 0) {
            toast.error('Vui lòng chọn khoa!')
        } else {
            console.log(object)
            const { id, ...updatedObject } = object;
            const response = await apiEditDoctor(id, updatedObject)
            if(response.status) {
                toast.success(response.message || "Chỉnh sửa thông tin bác sĩ thành công");
                resetObject()
                closeModal();
                setIsSubmitted(true);
            } else {
                toast.error("Vui lòng kiểm tra lại thông tin");
            }
        }
    }

    const handleLock = async () => {
        const response = await apiLockDoctor(object.id)
        if(response.status) {
            toast.success(response.message);
            setIsSubmitted(true);
        } else {
            toast.error(response.message)
        }
          
        setOpenDeleteModal(false);
    };

    const handleUnlock = async () => {
        const res = await apiUnlockDoctor(object.id)

        if(res.status) {
            toast.success(res.message);
            setIsSubmitted(true);
        } else {
            toast.error(res.message)
        }
          
        setOpenDeleteModal(false);
    };

    const fetchData = async () => {
        // API call
        fetchDoctors()
        const serviceList = await apiServiceList();
        setServices(serviceList.data)
    };

    const fetchDoctors = async () => {
        const response = await apiDoctorList();
        setData(response.data)
    }

    useEffect(() => {
        return () => {
            setIsSubmitted(false);
            fetchData();
        };
    }, [isSubmitted]);

    const closeModal = () => {
        setOpenModal(false);
        setOpenAddModal(false);
        setOpenEditModal(false);
    }

    const checkHandleModal = () => {
        if (openAddModal) {
            handleAddService();
        } if (openEditModal) {
            handleEditService();
        }
    }

    const handleSearch = async (e) => {
        const value = e.target.value
        setSearchInput(value)
        if(value.length >= 2) {
            const response = await apiSearchDoctor(value)
            const searchResult = response.data
            setData(searchResult)
        } else fetchDoctors()
    }

    return (
        <div className="shadow-2xl rounded-xl mt-12 overflow-hidden">
            <ToastContainer />
            <section className="overflow-hidden py-4" style={{ background: "#6b7280" }}>
                <div className='flex justify-between items-center px-3'>
                    <div className='my-2 flex-row justify-between items-center'>
                        {user.role === "ADMIN" && <button onClick={() => { setOpenAddModal(true); setOpenModal(true); }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Thêm bác sĩ
                        </button>}
                    </div>

                    <div className='flex gap-2 items-center'>
                        <Label htmlFor="search" className='text-white font-semibold' value="Tìm kiếm bác sĩ" />
                        <TextInput
                            value={searchInput}
                            onChange={handleSearch}
                            id="search"
                            placeholder='Nhập tên bác sĩ'
                        />
                    </div>
                </div>
            </section>

            <section className='table__body'>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th >
                                ID
                            </th>
                            <th >
                                Khoa khám
                            </th>
                            <th >
                                Họ và tên
                            </th>
                            <th >
                                Giới tính
                            </th>
                            <th >
                                Số điện thoại
                            </th>
                            <th >
                                Trạng thái
                            </th>
                           {user.role === "ADMIN" && <th >
                                Thao tác
                            </th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((o) => (
                            <tr key={o.id} className="bg-white">
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    <a href="#" className="font-bold text-blue-500 hover:underline">
                                        {o.id}
                                    </a>
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.service && o.service.name}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.name}
                                </td>
                              
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.gender}
                                </td>
                             
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.numberPhone}
                                </td>
                             
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.active ? "Đang hoạt động" : "Đã khóa"}
                                </td>

                                {user.role === "ADMIN" && <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    <button onClick={() => { setOpenEditModal(true); setOpenModal(true); handleObjectEdit(o); }} className="py-2 px-2 rounded-lg text-sm font-medium bg-teal-200 text-teal-800 hover:bg-teal-600">Sửa</button>
                                    {o.active ? <button onClick={() => { setOpenDeleteModal(true); handleObjectEdit(o); }} className="ml-2 py-2 px-2 rounded-lg text-sm font-medium text-white bg-teal-600 hover:bg-teal-200">Khóa</button>
                                        : <button onClick={() => { setOpenDeleteModal(true); handleObjectEdit(o); }} className="ml-2 py-2 px-2 rounded-lg text-sm font-medium text-white bg-teal-600 hover:bg-teal-200">Mở khóa</button>
                                    }
                                </td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {openModal &&

                <Modal show={openModal} size="md" popup onClose={closeModal} >
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-6">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">{openAddModal && 'Thêm bác sĩ'}{openEditModal && 'Chỉnh sửa thông tin bác sĩ'}</h3>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="username" value="Username" />
                                </div>
                                <TextInput id="username" name='username' required
                                    placeholder='Ví dụ: doctor123'
                                    value={object.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Name" />
                                </div>
                                <TextInput id="name" name='name' required
                                    placeholder='Ví dụ: Trần Văn A'
                                    value={object.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {!openEditModal && <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Password" />
                                </div>
                                <TextInput id="password" name='password' required
                                    type='password'
                                    value={object.password}
                                    onChange={handleInputChange}

                                />
                            </div>}
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Email" />
                                </div>
                                <TextInput id="email" name='email' required
                                    placeholder='Ví dụ: doctor@gmail.com'
                                    value={object.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="numberPhone" value="Number Phone" />
                                </div>
                                <TextInput id="numberPhone" name='numberPhone' required
                                    placeholder='Ví dụ: 0432100200'
                                    value={object.numberPhone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="serviceId" value="Thuộc khoa" />
                                    </div>
                                    <Select
                                        id="serviceId"
                                        name="serviceId"
                                        value={object.serviceId}
                                        onChange={handleServiceSelect}
                                        required
                                    >
                                        <option value="0">--Please choose an option--</option>
                                        {services.map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {s.name}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                            
                            
                                <div className="flex flex-wrap">
                                    <div className="flex items-center me-4">
                                        <input
                                            id="male"
                                            type="radio"
                                            value="Nam"
                                            name="gender"
                                            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            onChange={handleInputChange}
                                            checked={object.gender == 'Nam'}
                                        />
                                        <label
                                            htmlFor="male"
                                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Nam
                                        </label>
                                    </div>
                                    <div className="flex items-center me-4">
                                        <input
                                            id="female"
                                            type="radio"
                                            value="Nữ"
                                            name="gender"
                                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            onChange={handleInputChange}
                                            checked={object.gender == 'Nữ'}
                                        />
                                        <label
                                            htmlFor="female"
                                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Nữ
                                        </label>
                                    </div>
                                </div>
                            
                            
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="dateOfBirth" value="Date Of Birth" />
                                    </div>
                                    <TextInput id="dateOfBirth" name='dateOfBirth' required
                                        type='date'
                                        value={object.dateOfBirth}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            
                            
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="address" value="Address" />
                                    </div>
                                    <TextInput id="address" name='address' required
                                        value={object.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            
                            <div className="flex justify-center gap-56">
                                <Button onClick={checkHandleModal} color='success'>{openAddModal && 'Tạo mới'}{openEditModal && 'Lưu lại'}</Button>
                                <Button color="gray" onClick={closeModal}>
                                    Hủy
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            }

            {openDeleteModal &&
                <Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Bạn có chắc là muốn {object.active ? 'khóa' : 'mở khóa'} tài khoản bác sĩ {object.name} ?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={() => {
                                    object.active ? handleLock() : handleUnlock()
                                }}>
                                    Có, tôi chắc chắn
                                </Button>
                                <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
                                    Không, hủy bỏ
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            }
        </div>
    );
};

export default DoctorManagement;
