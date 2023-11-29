import React, { useEffect, useState } from "react";
import {
    apiAddRecord,
    apiAppointmentNoneRecordByPatient,
    apiGetRecord,
    apiPatientList,
} from "../../../services";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import {  apiSearchRecordByPatient } from "../../../services/search";

export default function PatientRecordManagement() {
    const [openModal, setOpenModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);

    const [patientRecords, setPatientRecords] = useState([]);
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [searchInput, setSearchInput] = useState('')

    const [object, setObject] = useState({
        appointmentID: 0,
        patientID: 0,
        symptom: "",
        diagnose: "",
        treatments: "",
        conclusion: "",
        note: "",
    });

    const resetObject = () => {
        setObject({
            ...object,
            appointmentID: 0,
            patientID: 0,
            symptom: "",
            diagnose: "",
            treatments: "",
            conclusion: "",
            note: "",
        })
    }

    // Hàm để cập nhật một thuộc tính cụ thể của đối tượng
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if(name === "patientID") {
            fetchAppointmentByPatient(value)
        }

        setObject((prevObject) => ({
            ...prevObject,
            [name]: value,
        }));
    };

    const fetchAppointmentByPatient = async (id) => {
        const data = await apiAppointmentNoneRecordByPatient(id)
        setAppointments(data.data)
    }

    const handleAddRecord = async () => {
        if(object.patientID === 0) {
            toast.error("Vui lòng chọn bệnh nhân", { position: "bottom-left" })
            return;
        }

        if(object.appointmentID === 0) {
            toast.error("Vui lòng chọn thông tin hồ sơ khám bệnh", { position: "bottom-left" })
            return;
        }

        const check = Object.keys(object).some(key => 
            object[key] === ''
        );

        if(check) {
            toast.error("Vui lòng nhập đủ thông tin", { position: "bottom-left" })
            return;
        }

        const newObject = {
            ...object,
            appointmentID: Number.parseInt(object["appointmentID"]),
            patientID: Number.parseInt(object["patientID"])
        }
        
        const response = await apiAddRecord(newObject)
        if(response.status) {
            toast.success(response.message || "Thêm thông tin khám của bệnh nhân thành công");
            resetObject()
            fetchData();
            closeModal();
        } else {
            toast.error(response.message || "Thêm thông tin khám của bệnh nhân thất bại");
        }
            
        
    };

    const fetchData = async () => {
        fetchRecords()

        const resPatient = await apiPatientList();
        setPatients(resPatient.data);

    };

    const fetchRecords = async () => {
        const data = await apiGetRecord();
        setPatientRecords(data.data);
    }

    useEffect(() => {
      
        fetchData();
        
    }, []);

    const closeModal = () => {
        setOpenModal(false);
        setOpenAddModal(false);
    };

    const checkHandleModal = () => {
        if (openAddModal) {
            handleAddRecord();
        }
    };

    const handleSearch = async (e) => {
        const value = e.target.value
        setSearchInput(value)
        if(value.length >= 2) {
            const response = await apiSearchRecordByPatient(value)
            const searchResult = response.data
            setPatientRecords(searchResult)
        } else fetchRecords()
    }

    return (
        <div className="shadow-2xl rounded-xl mt-12 overflow-hidden">
            <ToastContainer />
            <section
                className="overflow-hidden py-4"
                style={{ background: "#6b7280" }}
            >
                <div className="flex justify-between items-center px-3">
                    <div className="my-2 flex-row justify-between items-center">
                        <button
                            onClick={() => {
                                setOpenAddModal(true);
                                setOpenModal(true);
                            }}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Tạo kết quả khám bệnh
                        </button>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <Label htmlFor="search" className='text-white font-semibold' value="Tìm kiếm hồ sơ" />
                        <TextInput
                            value={searchInput}
                            onChange={handleSearch}
                            id="search"
                            placeholder='Nhập tên bệnh nhân'
                        />
                    </div>
                </div>
            </section>

            <section className="table__body">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Bệnh nhân</th>
                            <th>Ngày khám</th>
                            <th>Triệu chứng</th>
                            <th>Chẩn đoán</th>
                            <th>Phương pháp điều trị</th>
                            <th>Kết luận</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientRecords?.map((o) => (
                            <tr key={o.id} className="bg-white">
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    <a
                                        href="#"
                                        className="font-bold text-blue-500 hover:underline"
                                    >
                                        {o.id}
                                    </a>
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.patient.name}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.medicalDate}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.symptom}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.diagnose}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.treatments}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {o.conclusion}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {openModal && (
                <Modal show={openModal} size="md" popup onClose={closeModal}>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-6">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                {openAddModal && "Thêm thông tin bệnh nhân"}
                            </h3>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="patientID" value="Bệnh nhân" />
                                </div>
                                <Select
                                    id="patientID"
                                    name="patientID"
                                    value={object.patientID}
                                    onChange={handleInputChange}
                                    required
                                    
                                >
                                    <option value="0">--Please choose an option--</option>
                                    {patients.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="appointmentID" value="Cuộc hẹn khám" />
                                </div>
                                <Select
                                    id="appointmentID"
                                    name="appointmentID"
                                    value={object.appoinmentID}
                                    onChange={handleInputChange}
                                    required
                                    disabled={object.patientID === -1}
                                >
                                    <option value="0">--Please choose an option--</option>
                                    {appointments.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {`Ca khám ${s.shiftSchedule.startTime} - ${s.shiftSchedule.endTime} ngày ${s.dateSchedule}`}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                            
                        
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="Symptom" value="Triệu chứng" />
                                </div>
                                <TextInput
                                    id="Symptom"
                                    name="symptom"
                                    required
                                    placeholder="Triệu chứng"
                                    value={object.symptom}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="Diagnose" value="Chẩn đoán" />
                                </div>
                                <TextInput
                                    id="Diagnose"
                                    name="diagnose"
                                    required
                                    placeholder="Chẩn đoán"
                                    value={object.diagnose}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="Treatments" value="Phương pháp điều trị" />
                                </div>
                                <TextInput
                                    id="Treatments"
                                    name="treatments"
                                    required
                                    placeholder="Phương pháp điều trị"
                                    value={object.treatments}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="Conclusion" value="Kết luận" />
                                </div>
                                <TextInput
                                    id="Conclusion"
                                    name="conclusion"
                                    required
                                    placeholder="Kết luận"
                                    value={object.conclusion}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="Note" value="Ghi chú" />
                                </div>
                                <TextInput
                                    id="Note"
                                    name="note"
                                    required
                                    placeholder="Ghi chú"
                                    value={object.note}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex justify-center gap-56">
                                <Button onClick={checkHandleModal} color="success">
                                    Thêm mới
                                </Button>
                                <Button color="gray" onClick={closeModal}>
                                    Hủy
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            )}

            
        </div>
    );
}
