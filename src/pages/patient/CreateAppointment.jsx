import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { apiAddAppointment, apiDoctorList, apiServiceList, apiShiftList, apiDoctorListByServiceID, apiAvailableShiftList, apiCreatePayment } from "../../services";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const CreateAppointment = function () {
    const [services, setServices] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [isPayment, setIsPayment] = useState(false)
    const [infoPayment, setInfoPayment] = useState(null)


    const [appointment, setAppointment] = useState({
        doctorId: 0,
        serviceId: 0,
        bookingDate: null,
        shiftId: 0,
        note: "This is description"
    });

    useEffect(() => {
        const fetchData = async () => {
            const res1 = await apiServiceList();
            setServices(res1.data);
            const res2 = await apiDoctorList();
            setDoctors(res2.data);
            const res3 = await apiShiftList();
            setShifts(res3.data);

        }
        return () => {
            fetchData();
        }
    }, []);

    const fetchDoctorByServiceId = async (id) => {
        const res = await apiDoctorListByServiceID(id)
        setDoctors(res.data)
    }

    const fetchAvailableShift = async (params) => {
        const res = await apiAvailableShiftList(params)
        console.log(res)
        setShifts(res.data)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === "bookingDate") {
            const payload = {
                doctorID: appointment.doctorId,
                date: value
            }

            fetchAvailableShift(payload)
        }

        setAppointment((prevObject) => ({
            ...prevObject,
            [name]: value,
        }));
    };

    const handleSelect = async (event) => {
        const { name, value } = event.target;

        if (name === "serviceId") {
            fetchDoctorByServiceId(value)
        }

        setAppointment((prevObject) => ({
            ...prevObject,
            [name]: parseInt(value),
        }));


    };

    const resetObject = () => {
        setAppointment({
            doctorId: 0,
            serviceId: 0,
            bookingDate: null,
            shiftId: 0,
            note: "This is description"
        })
    }


    const handleAddAppointment = async () => {
        if (appointment.serviceId === 0) {
            toast.error("Vui lòng chọn khoa khám", { position: "bottom-left" })
            return;
        }

        if (appointment.doctorId === 0) {
            toast.error("Vui lòng chọn bác sĩ", { position: "bottom-left" })
            return;
        }

        if (appointment.bookingDate === null) {
            toast.error("Vui lòng chọn ngày khám", { position: "bottom-left" })
            return;
        }

        if (appointment.shiftId === 0) {
            toast.error("Vui lòng chọn ca khám", { position: "bottom-left" })
            return;
        }

        const response = await apiAddAppointment(appointment)
        if (response.status) {
            resetObject()
            // toast.success(response.message, { position: "top-center" })
            setIsPayment(true)
            const data = response.data
            console.log(data)
            setInfoPayment(data)
        } else {
            toast.error(response.message, { position: "top-center" })
        }

    }

    const handleCreatePayment = async (appoinmentId) => {
        const response = await apiCreatePayment({ appoinmentId, price: 100000 })
        if(response.status) {
            console.log(response.data)
            window.location.href = response.data;
        } else {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau")
        }
            
    };

    const extraShift = (shift) => {
        const replacements = {
            'ONE': '1',
            'TWO': '2',
            'THREE': '3',
            'FOUR': '4',
            'FIVE': '5',
            'SIX': '6',
            'SEVEN': '7'
        };

        let convertedElement = shift.replace('SHIFT_', 'Ca ');

        for (const key in replacements) {
            convertedElement = convertedElement.replace(key, replacements[key]);
        }

        return convertedElement;
    }

    const handleNavToPayment = () => {
        console.log(infoPayment.id)
        if(infoPayment) {
            handleCreatePayment(infoPayment.id)
        }
    }

    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                        Đặt lịch hẹn
                    </h2>
                    <form>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div>
                                <label
                                    htmlFor="serviceId"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Chuyên khoa
                                </label>
                                <select
                                    id="serviceId"
                                    name="serviceId"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={appointment.serviceId}
                                    onChange={handleSelect}
                                    required
                                >
                                    <option value="0">--Chọn chuyên khoa khám--</option>
                                    {services.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="doctorId"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Bác sĩ
                                </label>
                                <select
                                    id="doctorId"
                                    name="doctorId"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={appointment.doctorId}
                                    onChange={handleSelect}
                                    required
                                    disabled={appointment.serviceId === 0}
                                >
                                    <option value="0">--Chọn bác sĩ--</option>
                                    {doctors.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="bookingDate"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Ngày muốn khám
                                </label>
                                <input
                                    type="date"
                                    name="bookingDate"
                                    id="bookingDate"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Product brand"
                                    min={new Date().toISOString().split('T')[0]}
                                    value={appointment.bookingDate}
                                    onChange={handleInputChange}
                                    disabled={appointment.doctorId === 0}

                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="shiftId"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Ca khám
                                </label>
                                <select
                                    id="shiftId"
                                    name="shiftId"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={appointment.shiftId}
                                    onChange={handleSelect}
                                    disabled={appointment.bookingDate === null}

                                >
                                    <option value="0">--Chọn ca khám--</option>
                                    {shifts?.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            Từ {s.startTime} giờ - {s.endTime} giờ ({extraShift(s.shiftName)})
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="note"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Lý do khám
                                </label>
                                <textarea
                                    id="note"
                                    name="note"
                                    rows={8}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Your description here"
                                    value={appointment.note}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800"
                            onClick={() => { handleAddAppointment() }}
                        >
                            Đặt lịch hẹn
                        </button>
                    </form>
                </div>

            </section>

            {isPayment &&  <Modal show={isPayment} size="md" onClose={() => setIsPayment(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Thanh toán với VNPAY để hoàn tất việc đặt lịch khám
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="success" onClick={ 
                                    handleNavToPayment
                                }>
                                    Thanh toán ngay
                                </Button>
                                <Button color="gray" onClick={() => setIsPayment(false)}>
                                    Để sau
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>}
        </>

    )
};

export default CreateAppointment;
