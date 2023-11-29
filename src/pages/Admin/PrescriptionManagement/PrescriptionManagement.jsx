import React, { useEffect, useState } from 'react'
import { apiAddMedicineInPrescription, apiAddPrescription, apiDeletePrescription, apiEditMedicineInPrescription, apiGetPrescriptionId, apiGetRecord, apiGetRecordByPatient, apiMedicineList, apiPatientList, apiPrescriptionList } from '../../../services';
import { Button, Label, Modal, Select, TextInput } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { formatCurrency } from '../../../utils/formatCurrency';
import { apiSearchPrescriptionByPatient } from '../../../services/search';


export default function PrescriptionManagement() {
    const [openModal, setOpenModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [openAddMedicine, setOpenAddMedicine] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [searchInput, setSearchInput] = useState('')
    

    const [prescription, setPrescription] = useState([]);
    const [patientRecord, setPatientRecord] = useState([])
    const [patient, setPatient] = useState([])
    const [selectPatient, setSelectPatient] = useState(-1)
    const [medicines, setMedicines] = useState([])
    const [prescriptionDetail, setPrescriptionDetail] = useState(null)

    const [prescriptionEdit, setPrescriptionEdit] = useState({
        id: 0,
        idPrescriptionItem: 0,
        idMedicine: 0,
        dose: 0,
        dosePerDay: 0,
        timeUse: '',
        usage: ''
    })
    const [isEditPresciption, setIsEditPrescription] = useState(false)

    const [object, setObject] = useState({
        idPatientRecord: 0,
        note: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setObject((prevObject) => ({
            ...prevObject,
            [name]: value,
        }));
    };

    const handleInputChangePrescription = (event) => {
        const { name, value } = event.target;
        setPrescriptionEdit((prevObject) => ({
            ...prevObject,
            [name]: value,
        }));
    };

    const resetObject = () => {
        setObject({
            ...object,
            idPatientRecord: 0,
            note: ''
        })
    }


    const handleAddPrescription = async () => {
        if(object.idPatientRecord === 0) {
            toast.error("Vui lòng chọn hồ sơ bệnh nhân", {position: "bottom-left"})
            return;
        }
        const response = await apiAddPrescription(object)
        if(response.status) {
            resetObject()
            setIsSubmitted(true);
            closeModal();
            toast.success(response.message);
        } else {
            toast.error(response.message)
        }
           
        
    }


    const fetchData = async () => {
        fetchPresciption()

        const records = await apiGetRecord()
        setPatientRecord(records.data)

        const resPatient = await apiPatientList();
        setPatient(resPatient.data)

        const resMedicines = await apiMedicineList();
        setMedicines(resMedicines.data)
    };

    const fetchPresciption = async() => {
        const data = await apiPrescriptionList();
        setPrescription(data.data)
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
        setOpenViewDetail(false);
    }

    const handleSelectPatient = async (e) => {
        setSelectPatient(e.target.value)

        const data = await apiGetRecordByPatient(e.target.value);
        setPatientRecord(data.data)
    }

    const handleRecordSelect = (event) => {
        const selectedIdRecord = parseInt(event.target.value);
        setObject((prevObject) => ({
            ...prevObject,
            idPatientRecord: selectedIdRecord,
        }));
    };

    const handleSetObjectModify = (o) => {
        console.log(o)
        setPrescriptionDetail(o);
        setPrescriptionEdit({
            ...prescriptionEdit,
            id: o.id
        })
    }

    const handleOpenAddNewMedicine = (o) => {
        setOpenAddMedicine(true)
        setIsEditPrescription(false)
        const usedMedicines = [...new Set(o.prescriptionItem.map(p => p.medicine.id))]
        const availableMedicines = medicines.filter(s => !usedMedicines.includes(s.id))
        
        setMedicines(availableMedicines)
        setPrescriptionEdit({
            ...prescriptionEdit,
            id: o.id
        })
    }

    
    const resetPrescription = () => {
        setPrescriptionEdit({
            ...prescriptionEdit,
            id: 0,
            idPrescriptionItem: 0,
            idMedicine: 0,
            dose: 0,
            dosePerDay: 0,
            timeUse: '',
            usage: ''
        })
    }

    const handleAddNewMedicine = async () => {
        if(idMedicine == 0) {
            toast.error("Vui lòng chọn thuốc", { position: "bottom-left"})
            return;
        }

        const check = Object.keys(prescriptionEdit).some(t => prescriptionEdit[t] === "")
        if(check) {
            toast.error("Vui lòng nhập đủ thông tin", { position: "bottom-left"})
            return;
        }

        const response = await apiAddMedicineInPrescription(prescriptionEdit.id, prescriptionEdit)
           
        if(response.status) {
            toast.success(response.message)
            setOpenAddMedicine(false)
            resetPrescription()

            const resPresc = await apiGetPrescriptionId(prescriptionEdit.id) 
            if(resPresc.status) {
                setPrescriptionDetail(resPresc.data)
            }

            fetchPresciption()
        }
    }

    const handleEditMedicine = async () => {
        const response = await apiEditMedicineInPrescription(prescriptionEdit.id, prescriptionEdit)
            
        if(response.status) {
            toast.success(response.message)
                setOpenAddMedicine(false)
                setIsEditPrescription(false)
                resetPrescription()

            const resPresc = await apiGetPrescriptionId(prescriptionEdit.id)  
            if(resPresc.status) {
                setPrescriptionDetail(resPresc.data)
                
            }

            fetchPresciption()
        }
    }

    const handleBinding = (o) => {
        setOpenAddMedicine(true)
        setIsEditPrescription(true)
        setPrescriptionEdit((prevObject) => ({
            ...prevObject,
            idPrescriptionItem: o.id,
            idMedicine: o.medicine.id,
            dose: o.dose,
            dosePerDay: o.dosePerDay,
            timeUse: o.timeUse,
            usage: o.usage
        }));
    }

    const handleSearch = async (e) => {
        const value = e.target.value
        setSearchInput(value)
        if(value.length >= 2) {
            const response = await apiSearchPrescriptionByPatient(value)
            const searchResult = response.data
            setPrescription(searchResult)
        } else fetchPresciption()
    }

    return (
        <div className="shadow-2xl rounded-xl mt-12 overflow-hidden">
            <ToastContainer />
            <section className="py-4" style={{ background: "#6b7280" }}>
                <div className='flex justify-between items-center px-3'>
                    <div className='my-2 flex-row justify-between items-center'>
                        <button onClick={() => { setOpenAddModal(true); setOpenModal(true); }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Thêm đơn thuốc
                        </button>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <Label htmlFor="search" className='text-white font-semibold' value="Tìm kiếm đơn thuốc" />
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
                                Bệnh nhân
                            </th>
                            <th >
                                Bác sĩ
                            </th>
                            <th >
                                Ngày tạo
                            </th>
                            <th >
                                Thành tiền
                            </th>
                            <th >
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {prescription?.map((o) => (
                            <tr key={o.id} className="bg-white">
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    <a href="#" className="font-bold text-blue-500 hover:underline">
                                        {o.id}
                                    </a>
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.patientRecord.patient.name}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.patientRecord.doctor.name}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.datePrescription}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {formatCurrency(o.totalPrice)}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    <button onClick={() => { setOpenViewDetail(true); handleSetObjectModify(o) }} className="py-2 px-2 rounded-lg text-sm font-medium bg-teal-200 text-teal-800 hover:bg-teal-600">Xem chi tiết</button>
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
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Thêm thuốc</h3>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="patient" value="Chọn bệnh nhân" />
                                </div>
                                <Select
                                    id="patient"
                                    name="patient"
                                    value={selectPatient}
                                    onChange={handleSelectPatient}
                                    required
                                >
                                    <option value="0">--Please choose an option--</option>
                                    {patient.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </Select>

                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="idPatientRecord" value="Chọn hồ sơ bệnh nhân" />
                                </div>

                                <Select
                                    id="idPatientRecord"
                                    name="idPatientRecord"
                                    value={object.idPatientRecord}
                                    onChange={handleRecordSelect}
                                    required
                                    disabled={selectPatient === -1}
                                >
                                    <option value="0">--Please choose an option--</option>
                                    {patientRecord.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            Hồ sơ ngày khám {s.medicalDate} (BS: {s.doctor.name})
                                        </option>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="note" value="note" />
                                </div>
                                <TextInput id="note" name='note' required
                                    placeholder='Nhập ghi chú'
                                    type='text'
                                    value={object.note}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex justify-center gap-56">
                                <Button onClick={handleAddPrescription} color='success'>Tạo mới</Button>
                                <Button color="gray" onClick={closeModal}>
                                    Hủy bỏ
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            }


            {
                openAddMedicine && <Modal position="top-center" show={openAddMedicine} size="md" popup onClose={() => setOpenAddMedicine(false)} >
                    <Modal.Header />
                    <Modal.Body>
                        <div className="relative p-8 z-50 rounded-md bg-white">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="idMedicine" value="Chọn thuốc" />
                                </div>
                                <Select
                                    id="idMedicine"
                                    name="idMedicine"
                                    onChange={handleInputChangePrescription}
                                    value={prescriptionEdit.idMedicine}
                                    required
                                >
                                    <option value="0">--Please choose an option--</option>
                                    {medicines.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </Select>

                            </div>
                            <div className='mt-4'>
                                <div className="mb-2 block">
                                    <Label htmlFor="dose" value="Nhập số liều" />
                                </div>
                                <TextInput
                                    placeholder='Số liều'
                                    type='number'
                                    name="dose"
                                    value={prescriptionEdit.dose}
                                    onChange={handleInputChangePrescription}
                                />
                            </div>
                            <div className='mt-4'>
                                <div className="mb-2 block">
                                    <Label htmlFor="dosePerDay" value="Nhập số liều/ngày" />
                                </div>
                                <TextInput
                                    placeholder='Số liều trên/ngày'
                                    type='number'
                                    name="dosePerDay"
                                    value={prescriptionEdit.dosePerDay}
                                    onChange={handleInputChangePrescription}
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
                                    value={prescriptionEdit.timeUse}
                                    onChange={handleInputChangePrescription}
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
                                    value={prescriptionEdit.usage}
                                    onChange={handleInputChangePrescription}
                                />
                            </div>

                            
                            {isEditPresciption ? <Button onClick={handleEditMedicine} className='mt-4' color='success'>Lưu lại</Button> : <Button onClick={handleAddNewMedicine} className='mt-4' color='success'>Thêm</Button>}

                        </div>
                    </Modal.Body>
                </Modal>
            }

            {
                openViewDetail && <Modal show={openViewDetail} size="3xl" popup onClose={() => setOpenViewDetail(false)} >
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-2">
                            <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white mb-2">THÔNG TIN ĐƠN THUỐC</h3>

                            <div className='flex items-center gap-x-2'>
                                <span className='font-semibold'>Bệnh nhân: </span>
                                <span>{prescriptionDetail.patientRecord.patient.name}</span>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <span className='font-semibold'>Bác sĩ: </span>
                                <span>{prescriptionDetail.patientRecord.doctor.name}</span>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <span className='font-semibold'>Ngày tạo: </span>
                                <span>{prescriptionDetail.datePrescription}</span>
                            </div>

                            <div className='flex items-center gap-x-2'>
                                <span className='font-semibold'>Tổng tiền: </span>
                                <span>{formatCurrency(prescriptionDetail.totalPrice)}</span>
                            </div>

                            <div>
                                <div className='flex justify-between items-center'>
                                    <p className='mb-2 font-semibold'>Danh sách các loại thuốc trong đơn</p>
                                    <Button className="mb-2" onClick={() => handleOpenAddNewMedicine(prescriptionDetail)}>Thêm thuốc mới</Button>
                                </div>
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
                                                Số liều
                                            </th>
                                            <th >
                                                Giá
                                            </th>
                                            <th >
                                                Thành tiền
                                            </th>
                                            <th >
                                                Thao tác
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prescriptionDetail?.prescriptionItem?.map((o) => (
                                            <tr key={o.id} className="bg-white">
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                    <a href="#" className="font-bold text-blue-500 hover:underline">
                                                        {o.medicine.id}
                                                    </a>
                                                </td>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                    {o.medicine.name}
                                                </td>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                    {o.dose}
                                                </td>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                    {formatCurrency(o.price)}
                                                </td>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                    {formatCurrency(o.priceItem)}
                                                </td>
                                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                                    <button onClick={() => handleBinding(o)} className="ml-2 py-2 px-2 rounded-lg text-sm font-medium text-white bg-teal-600 hover:bg-teal-200">Chỉnh sửa</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            }

        </div>
    );
}
