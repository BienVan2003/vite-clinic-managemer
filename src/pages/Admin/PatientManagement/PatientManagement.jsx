import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { ToastContainer, toast } from 'react-toastify';
import {  apiLockPatient, apiPatientList, apiUnlockPatient } from '../../../services';
import { apiSearchPatient } from '../../../services/search';

const user = JSON.parse(localStorage.getItem('user'))
const PatientManagement = function () {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [data, setData] = useState([]);
    const [searchInput, setSearchInput] = useState('')

    const [object, setObject] = useState({
        id: 0,
        name: '',
        username: '',
        gender: '',
        email: '',
        numberPhone: '',
        password: '',
        dateOfBirth: '',
        address: '',
        role: 'PATIENT'
    });

   
    const handleObjectEdit = (o) => {
        setObject({
            id: o.id,
            name: o.name,
            username: o.username,
            gender: o.gender,
            email: o.email,
            numberPhone: o.numberPhone,
            dateOfBirth: o.dateOfBirth,
            address: o.address,
            role: 'PATIENT',
            active: o.active
        })
    }


    const handleLock = async () => {
        const res = await apiLockPatient(object.id)
        if(res.status) {
            toast.success(res.message);
            setIsSubmitted(true);
        } else {
            toast.error(res.message);
        }
          
           
        setOpenDeleteModal(false);
    };

    const handleUnlock = async () => {
        const res = await apiUnlockPatient(object.id)
        if(res.status) {
            toast.success(res.message);
            setIsSubmitted(true);
        } else {
            toast.error(res.message);
        }
          
           
        setOpenDeleteModal(false);
    };

    const fetchData = async () => {
        // API call
        const response = await apiPatientList();
        setData(response.data)
    };

    useEffect(() => {
        // just call api only once
        return () => {
            setIsSubmitted(false);
            fetchData();
        };
    }, [isSubmitted]);



    const handleSearch = async (e) => {
        const value = e.target.value
        setSearchInput(value)
        if(value.length >= 2) {
            const response = await apiSearchPatient(value)
            const searchResult = response.data
            setData(searchResult)
        } else fetchData()
    }

    return (
        <div className="shadow-2xl rounded-xl mt-12 overflow-hidden">
            <ToastContainer />
            <section className="overflow-hidden py-4" style={{ background: "#6b7280" }}>
                <div className='flex justify-between items-center px-3'>
                    <div className='my-2 flex-row justify-between items-center'>
                        
                    </div>

                    <div className='flex gap-2 items-center'>
                        <Label htmlFor="search" className='text-white font-semibold' value="Tìm kiếm bệnh nhân" />
                        <TextInput
                            value={searchInput}
                            onChange={handleSearch}
                            id="search"
                            placeholder='Nhập tên bệnh nhân'
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
                                Họ và tên
                            </th>
                  
                            <th >
                                Giới tính
                            </th>
                       
                            <th >
                                Số điện thoại
                            </th>
                            <th >
                                Ngày sinh
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
                                    {o.name}
                                </td>
                            
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.gender}
                                </td>
                            
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.numberPhone}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.dateOfBirth}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.active ? "Đang hoạt động" : 'Đã khóa'}
                                </td>

                                {user.role === "ADMIN" && <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.active ? <button onClick={() => { setOpenDeleteModal(true); handleObjectEdit(o); }} className="ml-2 py-2 px-2 rounded-lg text-sm font-medium text-white bg-teal-600 hover:bg-teal-200">Khóa tài khoản</button>
                                    : <button onClick={() => { setOpenDeleteModal(true); handleObjectEdit(o); }} className="ml-2 py-2 px-2 rounded-lg text-sm font-medium text-white bg-teal-600 hover:bg-teal-200">Mở khóa</button>}
                                </td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

          

            {openDeleteModal &&
                <Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Bạn có chắc là muốn {object.active ? "khóa" : "mở khóa"} tài khoản bệnh nhân {object.name} ?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={() => {object.active ? handleLock() : handleUnlock()} }>
                                    Có, tôi muốn
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

export default PatientManagement;
