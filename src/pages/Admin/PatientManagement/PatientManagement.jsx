import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { ToastContainer, toast } from 'react-toastify';
import { apiDeletePatient, apiEditPatient, apiPatientList, apiSignupPatient } from '../../../services';

const PatientManagement = function () {
    const [openModal, setOpenModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [data, setData] = useState([]);

    const [object, setObject] = useState({
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

    const handleObjectEdit = (o) => {
        setObject({
            serviceId: o.serviceId,
            name: o.name,
            username: o.username,
            gender: o.gender,
            email: o.email,
            numberPhone: o.numberPhone,
            dateOfBirth: o.dateOfBirth,
            address: o.address,
            role: 'DOCTOR'
        })
    }

    const handleAddService = () => {
        if (object.idService == 0) {
            toast.error('Vui lòng chọn khoa!')
        } else {
            apiSignupPatient(object.username, object.name, object.password, object.email, object.phoneNumber)
                .then((response) => {
                    // console.log(response)
                    toast.success(response.message);
                    setIsSubmitted(true);
                })
                .catch(error => toast.error("Thất bại! " + error));
            closeModal();
        }
    }

    const handleEditService = () => {
        if (object.idService == 0) {
            toast.error('Vui lòng chọn khoa!')
        } else {
            console.log(object)
            const { id, ...updatedObject } = object;
            apiEditPatient(id, updatedObject)
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
    }

    const handleDelete = () => {
        apiDeletePatient(object.id)
            .then(res => {
                toast.success(res.message);
                setIsSubmitted(true);
            })
            .catch(error => toast.error("Thất bại! " + error));
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
                            Thêm bệnh nhân
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
                                Username
                            </th>
                            <th >
                                Gender
                            </th>
                            <th >
                                Email
                            </th>
                            <th >
                                Number Phone
                            </th>
                            <th >
                                Day Of Birth
                            </th>
                            <th >
                                Address
                            </th>
                            <th >
                                Actions
                            </th>
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
                                    {o.username}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.gender}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.email}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.numberPhone}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.dateOfBirth}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.address}
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
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">{openAddModal && 'Thêm bệnh nhân'}{openEditModal && 'Sữa thông tin bệnh nhân'}</h3>
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
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Password" />
                                </div>
                                <TextInput id="password" name='password' required
                                    type='password'
                                    value={object.password}
                                    onChange={handleInputChange}
                                />
                            </div>
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
                            {openEditModal &&
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
                            }
                            {openEditModal &&
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
                            }
                            {openEditModal &&
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="address" value="Address" />
                                    </div>
                                    <TextInput id="address" name='address' required
                                        value={object.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            }
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

export default PatientManagement;
