/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { apiAppointmentsByUsername } from '../../services';
import { apiCreatePayment } from '../../services';

const AppointmentsList = ({ appointments }) => {

    const handlePayment = (appoinmentId) => {
        apiCreatePayment({ appoinmentId, price: 50000 })
            .then(res => {
                console.log(res)

                window.location.href = res;
            }).catch(error => {
                console.log('Error: ' + error);
            })
    };

    return (
        <div>
            {appointments.map((appointment, index) => (
                <div key={index} className="bg-gray-200 p-4 rounded mb-4 cursor-pointer">
                    <p className="text-lg font-bold">Ngày: {appointment.dateSchedule}</p>
                    <p className="text-gray-600">Thời gian: {appointment.shiftSchedule.startTime + ' -> ' + appointment.shiftSchedule.endTime}</p>
                    <p className="text-gray-600">Người đặt: {appointment.patient.name}</p>
                    <button onClick={() => {appointment.status === "PENDING" && handlePayment(appointment.id) }} className={`mt-2 ${appointment.status === "PENDING" ? 'bg-blue-500 hover:bg-blue-700' : '' || appointment.status === "SUCCESS" ? 'bg-green-500' : '' || appointment.status === "REJECT" ? 'bg-slate-500' : '' || appointment.status === "CANCEL" ? 'bg-red-500' : ''} text-white px-4 py-2 rounded`}>{appointment.status === "PENDING" && "Chưa thanh toán"}{appointment.status === "SUCCESS" && "Đã thanh toán"}{appointment.status === "REJECT" && "Từ chối"}{appointment.status === "CANCEL" && "Đã hủy"}</button>
                </div>
            ))
            }
        </div >
    );
};

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="mt-4">
            {pageNumbers.map((page) => (
                <button
                    key={page}
                    className={`mx-1 px-3 py-2 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

const AppointmentSchedule = () => {
    const [myAppointments, setMyAppointment] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Số lượng mục trên mỗi trang



    // Tính toán số lượng trang
    const totalPages = Math.ceil(myAppointments.length / itemsPerPage);

    // Tạo danh sách lịch đặt hẹn cho trang hiện tại
    const currentAppointments = myAppointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Hàm xử lý khi người dùng thay đổi trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        apiAppointmentsByUsername().then(res => {
            if (res.status === true) {
                setMyAppointment(res.data);
                console.log(myAppointments)
            }
        })
    }, []);

    return (
        <div className="bg-gray-100 p-4">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Danh sách lịch đặt hẹn</h1>

                {/* Danh sách lịch đặt hẹn */}
                <AppointmentsList appointments={currentAppointments} />

                {/* Phân trang */}
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default AppointmentSchedule;


