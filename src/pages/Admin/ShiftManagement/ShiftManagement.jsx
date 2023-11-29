import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { toast, ToastContainer } from 'react-toastify';
import { apiAddShift, apiDeleteShift, apiEditShift, apiShiftList } from '../../../services';

const user = JSON.parse(localStorage.getItem('user'))
const ShiftManagement = function () {
    const [openModal, setOpenModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [shifts, setShifts] = useState([]);

    const [object, setObject] = useState({
        shiftName: '',
        startTime: '',
        endTime: '',
    });

    // Hàm để cập nhật một thuộc tính cụ thể của đối tượng
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setObject((prevObject) => ({
            ...prevObject,
            [name]: value,
        }));
    };
    const handleObjectEdit = (o) => {
        setObject({
            id: o.id,
            shiftName: o.shiftName,
            startTime: o.startTime,
            endTime: o.endTime,
        })
    }

    const handleAddService = async () => {
        const { id, ...addObject } = object;
        const response = await apiAddShift(addObject)
        if(response.status) {
            toast.success(response.message || "Thêm ca làm việc thành công");
            setIsSubmitted(true);
            closeModal();
        } else {
            toast.error(response.message || "Thêm ca làm việc thất bại");
        }
           
    }

    const handleEditService = async () => {
        const { id, ...updatedObject } = object;
        const response = await apiEditShift(id, updatedObject)
        if(response.status) {
            toast.success(response.message || "Chỉnh sửa ca làm việc thành công");
            setIsSubmitted(true);
            closeModal();
        } else {
            toast.error(response.message || "Chỉnh sửa ca làm việc thất bại");
        }
            

    }

    const handleDelete = async () => {
        const response = await apiDeleteShift(object.id)
        if(response.status) {
            toast.success(response.message || "Xóa ca làm việc thành công");
            setIsSubmitted(true);
            setOpenDeleteModal(false);
        } else {
            toast.error(response.message || "Xóa ca làm việc thất bại");
        }
        
    };

    const fetchData = async () => {
        const serviceList = await apiShiftList();
        setShifts(serviceList.data)
    };

    useEffect(() => {
        // just call api only once
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

    return (
        <div className="shadow-2xl rounded-xl mt-12 overflow-hidden">
            <ToastContainer />
            <section className="overflow-hidden py-4" style={{ background: "#6b7280" }}>
                <div className='w-11/12 m-auto justify-center items-center px-3'>
                    <div className='my-2 flex-row justify-between items-center'>
                        {user.role === "ADMIN" && <button onClick={() => { setOpenAddModal(true); setOpenModal(true); }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Thêm ca
                        </button>}
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
                                Ca khám
                            </th>
                            <th >
                                Giờ bắt đầu
                            </th>
                            <th >
                                Giờ kết thúc
                            </th>
                            {user.role === "ADMIN" && <th >
                                Thao tác
                            </th>}
                        </tr>
                    </thead>
                    <tbody>
                        {shifts.map((o) => (
                            <tr key={o.id} className="bg-white">
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    <a href="#" className="font-bold text-blue-500 hover:underline">
                                        {o.id}
                                    </a>
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.shiftName}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.startTime}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.endTime}
                                </td>
                                {user.role === 'ADMIN' && <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    <button onClick={() => { setOpenEditModal(true); setOpenModal(true); handleObjectEdit(o); }} className="py-2 px-2 rounded-lg text-sm font-medium bg-teal-200 text-teal-800 hover:bg-teal-600">Sửa</button>
                                    <button onClick={() => { setOpenDeleteModal(true); handleObjectEdit(o); }} className="ml-2 py-2 px-2 rounded-lg text-sm font-medium text-white bg-teal-600 hover:bg-teal-200">Xóa</button>
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
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">{openAddModal && 'Thêm ca'}{openEditModal && 'Sửa thông tin ca'}</h3>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="shiftName" value="Ca" />
                                </div>
                                <TextInput id="shiftName" name='shiftName' required
                                    value={object.shiftName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="startTime" value="Giờ bắt đầu" />
                                </div>
                                <TextInput id="startTime" name='startTime' required
                                    type='time'
                                    value={object.startTime}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="endTime" value="Giờ kết thúc" />
                                </div>
                                <TextInput id="endTime" name='endTime' required
                                    type='time'
                                    value={object.endTime}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex justify-center gap-56">
                                <Button onClick={checkHandleModal} color='success'>{openAddModal && 'Thêm'}{openEditModal && 'Lưu lại'}</Button>
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
                                Bạn có muốn xóa {object.shiftName} ?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={() => handleDelete()}>
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

export default ShiftManagement;
