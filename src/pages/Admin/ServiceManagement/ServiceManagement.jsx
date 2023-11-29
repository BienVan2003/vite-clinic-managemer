import { Button, Label, Modal, Textarea, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { toast, ToastContainer } from 'react-toastify';
import { apiAddService, apiDeleteService, apiEditService, apiServiceList } from '../../../services';
import { apiSearchService } from '../../../services/search';

const user = JSON.parse(localStorage.getItem('user'))
const ServiceManagement = function () {
    const [openModal, setOpenModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [services, setServices] = useState([]);
    const [searchInput, setSearchInput] = useState('')

    const [object, setObject] = useState({
        name: '',
        description: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setObject((prevObject) => ({
            ...prevObject,
            [name]: value,
        }));
    };
    const handleObjectEdit = (o) => {
        console.log(o)
        setObject({
            ...object,
            id: o.id,
            name: o.name,
            description: o.description,
        })
    }

    const resetObject = () => {
        setObject({
            ...object,
            name: '',
            description: ''
        })
    }

    const handleAddService = async () => {
        const { id, ...addObject } = object;
        const response = await apiAddService(addObject)
            
        if(response.status) {
            toast.success(response.message || "Thêm chuyên khoa thành công");
            setIsSubmitted(true);
            resetObject()
            closeModal();
        } else {
            toast.error(response.message || "Thêm chuyên khoa thất bại")
        }
    }

    const handleEditService = async () => {
        console.log(object)
        const { id, ...updatedObject } = object;
        const response = await apiEditService(id, updatedObject)
        if(response.status) {
            toast.success(response.message);
            setIsSubmitted(true);
            resetObject()
            closeModal();
        } else {
            toast.error(response.message)
        }
    }

    const handleDelete = async () => {
        const response = await apiDeleteService(object.id)
           
        if(response.status) {
            toast.success(response.message || "Xóa chuyên khoa thành công");
            setIsSubmitted(true);
            setOpenDeleteModal(false);
        } else {
            toast.error(response.message || "Xóa chuyên khoa thất bại")
        }
    };

    const fetchData = async () => {
        const serviceList = await apiServiceList();
        setServices(serviceList.data)
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

    const handleSearch = async (e) => {
        const value = e.target.value
        setSearchInput(value)
        if(value.length >= 2) {
            const response = await apiSearchService(value)
            const searchResult = response.data
            setServices(searchResult)
        } else fetchData()
    }

    return (
        <div className="shadow-2xl rounded-xl mt-12 overflow-hidden">
            <ToastContainer />
            <section className="overflow-hidden py-4" style={{ background: "#6b7280" }}>
                <div className='flex justify-between items-center px-3'>
                    <div className='my-2 flex-row justify-between items-center'>
                        {user.role === "ADMIN" && <button onClick={() => { setOpenAddModal(true); setOpenModal(true); }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Thêm khoa
                        </button>}
                    </div>

                    <div className='flex gap-2 items-center'>
                        <Label htmlFor="search" className='text-white font-semibold' value="Tìm kiếm chuyên khoa" />
                        <TextInput
                            value={searchInput}
                            onChange={handleSearch}
                            id="search"
                            placeholder='Nhập tên chuyên khoa'
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
                                Tên khoa
                            </th>
                            <th >
                                Mô tả
                            </th>
                            {user.role === 'ADMIN' && <th >
                                Thao tác
                            </th>}
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((o) => (
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
                                    {o.description}
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
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">{openAddModal && 'Thêm khoa'}{openEditModal && 'Sửa thông tin khoa'}</h3>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Name" />
                                </div>
                                <TextInput id="name" name='name' required
                                    placeholder='Ví dụ: Khoa răng hàm mặt'
                                    value={object.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="description" value="Description" />
                                </div>
                                <Textarea id="description"
                                    name='description'
                                    placeholder="Mô tả về khoa khám..." 
                                    required rows={5} 
                                    value={object.description}
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
                                Bạn có chắc là muốn xóa {object.name} ?
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

export default ServiceManagement;
