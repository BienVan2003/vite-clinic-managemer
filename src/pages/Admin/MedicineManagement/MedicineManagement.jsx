import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { toast, ToastContainer } from 'react-toastify';
import { apiAddMedicine, apiDeleteMedicine, apiEditMedicine, apiMedicineList } from '../../../services';
import { formatCurrency } from '../../../utils/formatCurrency';
import { apiSearchMedicine } from '../../../services/search';

const user = JSON.parse(localStorage.getItem('user'))
const MedicineManagement = function () {
    const [openModal, setOpenModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [searchInput, setSearchInput] = useState('')

    const [medicines, setMedicines] = useState([]);

    const [object, setObject] = useState({
        name: '',
        price: 1
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
            name: o.name,
            price: o.price,
        })
    }

    const resetObject = () => {
        setObject({
            name: '',
            price: 1
        })
    }

    const handleAddService = async () => {
        const { id, ...addObject } = object;
        if(object.name === '') {
            toast.error("Vui lòng nhập tên thuốc", { position: "bottom-left" })
            return;
        }

        if(object.price === 0) {
            toast.error("Vui lòng nhập giá thuốc", { position: "bottom-left" })
            return;
        }

        const response = await apiAddMedicine(addObject)
        console.log(response)
        if(response.status) {
            toast.success(response.message || "Thêm dữ liệu thuốc thành công");
            setIsSubmitted(true);
            closeModal();
            resetObject()
        } else {
            toast.error(response.message || "Thêm dữ liệu thuốc thất bại");
        }
    }

    const handleEditService = async () => {
        console.log(object)
        const { id, ...updatedObject } = object;
        
        const response = await apiEditMedicine(id, updatedObject)
        console.log(response)
        if(response.status) {
            toast.success(response.message || "Chỉnh sửa thông tin thuốc thành công");
            setIsSubmitted(true);
            closeModal();
            resetObject()
        } else {
            toast.error(response.message || "Chỉnh sửa thông tin thuốc thất bại");
        }
        

    }

    const handleDelete = async () => {
        const response = await apiDeleteMedicine(object.id)
        console.log(response)

        if(response.status) {
            toast.success(response.message || "Xóa dữ liệu thuốc thành công");
            closeModal();
            setIsSubmitted(true);
            setOpenDeleteModal(false);
        } else {
            toast.error(response.message || "Xóa dữ liệu thuốc thất bại");
        }
        
    };

    const fetchData = async () => {
        const data = await apiMedicineList();
        setMedicines(data.data)
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
            const response = await apiSearchMedicine(value)
            const searchResult = response.data
            setMedicines(searchResult)
        } else fetchData()
    }

    return (
        <div className="shadow-2xl rounded-xl mt-12 overflow-hidden">
            <ToastContainer />
            <section className="overflow-hidden py-4" style={{ background: "#6b7280" }}>
                <div className='flex justify-between items-center px-3'>
                    <div className='my-2 flex-row justify-between items-center'>
                        {user.role === "ADMIN" && <button onClick={() => { setOpenAddModal(true); setOpenModal(true); }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Thêm thuốc
                        </button>}
                    </div>

                    <div className='flex gap-2 items-center'>
                        <Label htmlFor="search" className='text-white font-semibold' value="Tìm kiếm thuốc" />
                        <TextInput
                            value={searchInput}
                            onChange={handleSearch}
                            id="search"
                            placeholder='Nhập tên thuốc'
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
                                Tên thuốc
                            </th>
                            <th >
                                Giá
                            </th>
                            {user.role === "ADMIN" && <th >
                                Thao tác
                            </th>}
                        </tr>
                    </thead>
                    <tbody>
                        {medicines?.map((o) => (
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
                                    {formatCurrency(o.price)}
                                </td>
                                {user.role === "ADMIN" && <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
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
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">{openAddModal && 'Thêm thuốc'}{openEditModal && 'Sửa thông tin thuốc'}</h3>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Name" />
                                </div>
                                <TextInput id="name" name='name' required
                                    placeholder='Ví dụ: Paracetamol'
                                    value={object.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="price" value="Price" />
                                </div>
                                <TextInput id="price" name='price' required
                                    placeholder='Ví dụ: 2000'
                                    type='number'
                                    value={object.price}
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
                                Bạn có chắc là muốn xóa thuốc {object.name} ?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={() => handleDelete()}>
                                    {"Yes, I'm sure"}
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

export default MedicineManagement;
