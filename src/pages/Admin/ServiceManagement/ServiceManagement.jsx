import { Button, Label, Modal, Textarea, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { toast, ToastContainer } from 'react-toastify';
import { apiAddService, apiDeleteService, apiEditService, apiServiceList } from '../../../services';
// import './ServiceManagement.css';

const ServiceManagement = function () {
    const [openModal, setOpenModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [services, setServices] = useState([]);

    const [object, setObject] = useState({
        name: '',
        description: ''
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
            description: o.description,
        })
    }

    const handleAddService = () => {
        const { id, ...addObject } = object;
        console.log(id)
        apiAddService(addObject)
            .then((response) => {
                // console.log(response)
                toast.success(response.message);
                setIsSubmitted(true);
            })
            .catch(error => toast.error("Thất bại! " + error));
        closeModal();
    }

    const handleEditService = () => {
        console.log(object)
        const { id, ...updatedObject } = object;
        apiEditService(id, updatedObject)
            .then((response) => {
                console.log('response' + response)

                toast.success(response.message);
                setIsSubmitted(true);
            })
            .catch(error => {
                // Xử lý khi có lỗi
                if (error.response) {
                    // Nếu response có tồn tại
                    console.log('Data from server:', error.response.data);
                    console.log('Status code:', error.response.status);
                } else if (error.request) {
                    // Nếu request được thực hiện nhưng không nhận được response
                    console.log('Request made but no response received');
                } else {
                    // Lỗi trong quá trình thiết lập request
                    console.log('Error setting up the request:', error.message);
                }
            });
        closeModal();

    }

    const handleDelete = () => {
        apiDeleteService(object.id)
            .then(res => {
                toast.success(res.message);
                setIsSubmitted(true);
            })
            .catch(error => toast.error("Thất bại! " + error));
        setOpenDeleteModal(false);
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

    return (
        <div className="shadow-2xl rounded-xl mt-12 overflow-hidden">
            <ToastContainer />
            <section className="overflow-hidden py-4" style={{ background: "#6b7280" }}>
                <div className='w-11/12 m-auto justify-center items-center px-3'>
                    <div className='my-2 flex-row justify-between items-center'>
                        <button onClick={() => { setOpenAddModal(true); setOpenModal(true); }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Thêm khoa
                        </button>
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
                                Name
                            </th>
                            <th >
                                Description
                            </th>
                            <th >
                                Actions
                            </th>
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
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    <button onClick={() => { setOpenEditModal(true); setOpenModal(true); handleObjectEdit(o); }} className="py-2 px-2 rounded-lg text-sm font-medium bg-teal-200 text-teal-800 hover:bg-teal-600">Edit</button>
                                    <button onClick={() => { setOpenDeleteModal(true); handleObjectEdit(o); }} className="ml-2 py-2 px-2 rounded-lg text-sm font-medium text-white bg-teal-600 hover:bg-teal-200">Del</button>
                                </td>
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
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">{openAddModal && 'Thêm khoa'}{openEditModal && 'Sữa thông tin khoa'}</h3>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Name" />
                                </div>
                                <TextInput id="name" name='name' required
                                    placeholder='Ví dụ: Phòng khám răng hàm mặt'
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
                                placeholder="Leave a description..." 
                                required rows={5} 
                                value={object.description}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex justify-center gap-56">
                                <Button onClick={checkHandleModal} color='success'>{openAddModal && 'Add'}{openEditModal && 'Edit'}</Button>
                                <Button color="gray" onClick={closeModal}>
                                    Cancel
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
                                Bạn có muốn xóa {object.name} ?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={() => handleDelete()}>
                                    {"Yes, I'm sure"}
                                </Button>
                                <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
                                    No, cancel
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
