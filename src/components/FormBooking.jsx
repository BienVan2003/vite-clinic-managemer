import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { apiAddAppointment, apiClinicList, apiDoctorList, apiServiceList, apiShiftList } from "../services";

export default function FormBooking() {
    const [services, setServices] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [appointment, setAppointment] = useState({
        doctorId: 0,
        serviceId: 0,
        clinicId: 0,
        bookingDate: "2023-11-15T16:04:20.963Z",
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
            const res4 = await apiClinicList();
            setClinics(res4.data);
        }
        return () => {
            fetchData();
        }
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAppointment((prevObject) => ({
            ...prevObject,
            [name]: value,
        }));
    };
    const handleSelect = (event) => {
        const { name, value } = event.target;
        setAppointment((prevObject) => ({
            ...prevObject,
            [name]: parseInt(value),
        }));
    };

    const handleAddAppointment = () => {
        apiAddAppointment(appointment)
            .then((res) => {
                if (res.status === true) {
                    toast.success(res.message)
                } else {
                    toast.error(res.message)
                }
            }).catch(error => {
                console.log('Error: ' + error);
            })
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Đặt lịch hẹn
                </h2>
                <form>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

                        <div className="w-full">
                            <label
                                htmlFor="bookingDate"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Thời gian khám bệnh
                            </label>
                            <input
                                type="date"
                                name="bookingDate"
                                id="bookingDate"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Product brand"
                                value={appointment.bookingDate}
                                onChange={handleInputChange}
                                
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
                                
                            >
                                <option value="0">--Please choose an option--</option>
                                {shifts.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.shiftName}
                                    </option>
                                ))}
                            </select>
                        </div>
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
                                <option value="0">--Please choose an option--</option>
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
                            >
                                <option value="0">--Please choose an option--</option>
                                {doctors.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="clinicId"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Phòng
                            </label>
                            <select
                                id="clinicId"
                                name="clinicId"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={appointment.clinicId}
                                onChange={handleSelect}
                                required
                            >
                                <option value="0">--Please choose an option--</option>
                                {clinics.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
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
                        onClick={() => {console.log(appointment)}}
                    >
                        Đặt lịch hẹn
                    </button>
                </form>
            </div>
        </section>

    )
}