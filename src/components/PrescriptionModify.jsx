import { Button, Label, Modal, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { apiEditPrescription } from '../services';
import { toast } from 'react-toastify';

export default function PrescriptionModify({ medicine, onChange, prescription }) {
    const [isShow, setIsShow] = useState(false)
    const [object, setObject] = useState({
        idMedicine: medicine?.id,
        dose: 0,
        dosePerDay: 0,
        timeUse: '',
        usage: ''
    });


    const handleCheck = (e) => {
        onChange(e)
        if (e.target.checked) {
            setIsShow(true)
        } else setIsShow(false)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setObject((prevObject) => ({
            ...prevObject,
            [name]: value,
        }));
    }

    const handleSavePresciptionItem = async () => {
        console.log(object)
        const payload = {
            id: prescription.id,
            ...object

        }

        await apiEditPrescription(payload.id, payload)
            .then(response => toast.success(response.message))
            
    }
    return (
        <div className='flex items-center gap-3 relative'>
            <TextInput value={medicine.id} name="medicine" onChange={(e) => handleCheck(e)} type='radio' />
            <span>{medicine.name}</span>

            {isShow && <Modal position="top-center" show={isShow} size="md" popup onClose={() => setIsShow(false)} >
                <Modal.Header />
                <Modal.Body>
                    <div className="relative p-8 z-50 rounded-md bg-white">
                        <div className='mt-4'>
                            <div className="mb-2 block">
                                <Label htmlFor="id" value="ID thuốc" />
                            </div>
                            <TextInput
                                placeholder='Số liều'
                                type='text'
                                name="id"
                                value={medicine.id}
                                readOnly
                            />
                        </div>
                        <div className='mt-4'>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Tên thuốc" />
                            </div>
                            <TextInput
                                placeholder='Tên thuốc'
                                type='text'
                                name="name"
                                value={medicine.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='mt-4'>
                            <div className="mb-2 block">
                                <Label htmlFor="dose" value="Nhập số lượng" />
                            </div>
                            <TextInput
                                placeholder='Số liều'
                                type='number'
                                name="dose"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='mt-4'>
                            <div className="mb-2 block">
                                <Label htmlFor="dosePerDay" value="Nhập số lượng" />
                            </div>
                            <TextInput
                                placeholder='Số liều trên/ngày'
                                type='number'
                                name="dosePerDay"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='mt-4'>
                            <div className="mb-2 block">
                                <Label htmlFor="timeUse" value="Thời hạn sử dụng" />
                            </div>
                            <TextInput
                                placeholder='Ví dụ: 5 ngày'
                                type='text'
                                name="timeUse"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='mt-4'>
                            <div className="mb-2 block">
                                <Label htmlFor="usage" value="Cách sử dụng" />
                            </div>
                            <TextInput
                                placeholder='Ví dụ: Uống sau ăn'
                                type='text'
                                name="usage"
                                onChange={handleInputChange}
                            />
                        </div>

                        <Button onClick={handleSavePresciptionItem} className='mt-4' color='success'>Lưu lại</Button>

                    </div>
                </Modal.Body>
            </Modal>}
        </div>
    )
}


