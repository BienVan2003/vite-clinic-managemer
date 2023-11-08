import React, { useState } from 'react';
import DeleteModel from '../Modals/DeleteModel';

const sampleData = [
    { id: 1, name: 'Item 1', description: 'Description for Item 1' },
    { id: 2, name: 'Item 2', description: 'Description for Item 2' },
    { id: 3, name: 'Item 3', description: 'Description for Item 3' },
];

const ServiceTable = () => {
    const [openAddServiceModal, setOpenAddServiceModal] = useState(0);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [openEditServiceModal, setOpenEditServiceModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const [serviceEdit, setServiceEdit] = useState();

    const handleDelete = () => {
        // Gửi yêu cầu API để xóa dữ liệu ở đây
        // Sau khi xóa thành công, bạn có thể đóng modal.
        setDeleteModalOpen(false);
    };
    return (
        <div className="shadow-2xl rounded-xl mt-12 overflow-hidden">
            <section className="overflow-hidden py-4" style={{ background: "#6b7280" }}>
                <div className='w-11/12 m-auto justify-center items-center px-3'>
                    <div className='my-2 flex-row justify-between items-center'>
                        <button onClick={() => setOpenAddServiceModal(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Add service
                        </button>
                    </div>
                </div>
            </section>

            <section className='w-11/12 m-auto'>
                <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <DeleteModel isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)} onDelete={handleDelete} message={selectedItem} />
                    <AddServiceModal isOpen={openAddServiceModal} onClose={() => setOpenAddServiceModal(false)} />
                    <EditServiceModal isOpen={isEditModalOpen} onClose={() => setOpenAddServiceModal(false)} />
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                                    No.
                                </th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                    Name
                                </th>
                                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                                    Description
                                </th>
                                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {sampleData.map((service) => (
                                <tr key={service.id} className="bg-white">
                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                        <a href="#" className="font-bold text-blue-500 hover:underline">
                                            {service.id}
                                        </a>
                                    </td>
                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                        {service.name}
                                    </td>
                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                        {service.description}
                                    </td>
                                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                        <button className="py-2 px-2 rounded-lg text-sm font-medium bg-teal-200 text-teal-800 hover:bg-teal-600">Edit</button>
                                        <button onClick={() => { setDeleteModalOpen(true); setSelectedItem(service.name); }} className="ml-2 py-2 px-2 rounded-lg text-sm font-medium text-white bg-teal-600 hover:bg-teal-200">Del</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </section>
        </div>
    )
}


import { Button, Label, Modal, TextInput, Textarea } from 'flowbite-react';

// eslint-disable-next-line react/prop-types
function AddServiceModal({ isOpen, onClose }) {
    // const emailInputRef = useRef < HTMLInputElement > (null);
    const [name, setName] = useState();
    const [description, setDescription] = useState();

    return (
        <>
            {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
            <Modal show={isOpen} size="md" popup onClose={onClose} >
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add new service</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Name of the service" />
                            </div>
                            <TextInput id="name" required
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Description of the service" />
                            </div>
                            <Textarea id="comment" placeholder="This is description..." required rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="flex justify-center gap-40">
                            <Button color='success'>Add service</Button>
                            <Button color="gray" onClick={onClose}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

function EditServiceModal({ isOpen, onClose , serviceEdit}) {
    // const emailInputRef = useRef < HTMLInputElement > (null);
    const [name, setName] = useState();
    const [description, setDescription] = useState();

    return (
        <>
            {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
            <Modal show={isOpen} size="md" popup onClose={onClose} >
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit service</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Name of the service" />
                            </div>
                            <TextInput id="name" required
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Description of the service" />
                            </div>
                            <Textarea id="comment" placeholder="This is description..." required rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="flex justify-center gap-40">
                            <Button color='success'>Add service</Button>
                            <Button color="gray" onClick={onClose}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}


export default ServiceTable