/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { apiAppointmentsByUsername, apiCreatePayment, apiGetRecordByAppointment, apiPrescriptionListByIdRecord } from '../../services';
import { Button, Modal } from 'flowbite-react';
import { formatCurrency } from '../../utils/formatCurrency';
import Schedule from './Schedule';
import { toast } from 'react-toastify';

const AppointmentsList = ({ appointments }) => {
    const [detail, setDetail] = useState(null)
    const [record, setRecord] = useState(null)
    const [prescription, setPresciption] = useState(null)

    const handlePayment = async (appoinmentId) => {
        const response = await apiCreatePayment({ appoinmentId, price: 100000 })
        if(response.status) {
            window.location.href = response.data;
        } else {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau")
        }
            
    };

    const handleViewDetail = async (appointment) => {
        setDetail(appointment)
        const response = await apiGetRecordByAppointment(appointment.id)
        if(response.status) {
            setRecord(response.data)
            console.log(response.data)
            const resPresc = await apiPrescriptionListByIdRecord(response.data.id)
            setPresciption(resPresc.data)
        }
           
    }

    return (
        <>
            <div className='grid grid-cols-3 w-full gap-6'>
                {appointments.map((appointment, index) => (
                    <div key={appointment.id} className="bg-gray-200 p-4 rounded mb-4 cursor-pointer">
                        <p className="text-lg font-bold">ID: {appointment.id}</p>
                        <p className="text-lg font-bold">Ngày: {appointment.dateSchedule}</p>
                        <p className="text-gray-600">Thời gian: {appointment.shiftSchedule.startTime + ' -> ' + appointment.shiftSchedule.endTime}</p>
                        <p className="text-gray-600">Người đặt: {appointment.patient.name}</p>
                        <p className="text-gray-600">Bác sĩ: {appointment.doctor.name}</p>
                        <p className="text-gray-600">Khoa khám: {appointment.service.name}</p>
                        <div className=''>
                            <button onClick={() => { appointment.status === "PENDING" && handlePayment(appointment.id) }} className={`mt-2 ${appointment.status === "PENDING" ? 'bg-blue-500 hover:bg-blue-700' : '' || appointment.status === "SUCCESS" ? 'bg-green-500' : '' || appointment.status === "REJECT" ? 'bg-slate-500' : '' || appointment.status === "CANCEL" ? 'bg-red-500' : ''} text-white px-4 py-2 rounded`}>{appointment.status === "PENDING" && "Thanh toán ngay"}{appointment.status === "SUCCESS" && <span className='cursor-default'>Đã thanh toán</span>}{appointment.status === "REJECT" && "Từ chối"}{appointment.status === "CANCEL" && "Đã hủy"}</button>
                            <button onClick={() => handleViewDetail(appointment)} className='ml-2 text-white px-4 py-2 rounded bg-teal-600'>Xem thông tin khám</button>
                        </div>
                    </div>
                ))
                }
            </div >
            {detail && record && prescription && <Modal position="center" show={detail} size="4xl" popup onClose={() => setDetail(null)} >
                <Modal.Header />
                <Modal.Body>
                    <p className='text-center font-bold mb-4'>HỒ SƠ KHÁM BỆNH Ở CUỘC HẸN NGÀY {detail.dateSchedule}</p>

                    <div className="flex gap-2">
                        <p>Bác sĩ phụ trách:</p>
                        <p className='font-semibold'>{detail.doctor.name}</p>
                    </div>
                    <div className="flex gap-2">
                        <p>Bệnh nhân:</p>
                        <p className='font-semibold'>{detail.patient.name}</p>
                    </div>
                    <div className='grid grid-cols-2 mt-4 border border-teal-700'>
                        <div className="border border-teal-500 p-2">
                            <p className='font-semibold mb-2'>Thông tin khám bệnh</p>
                            <div>
                                <span>Triệu chứng: </span>
                                <span className='font-semibold'>{record.symptom || <span className='italic font-normal text-sm'>Chưa có dữ liệu</span>}</span>
                            </div>
                            <div>
                                <span>Chẩn đoán: </span>
                                <span className='font-semibold'>{record.diagnose || <span className='italic font-normal text-sm'>Chưa có dữ liệu</span>}</span>
                            </div>
                            <div>
                                <span>Phương pháp điều trị: </span>
                                <span className='font-semibold'>{record.treatments || <span className='italic font-normal text-sm'>Chưa có dữ liệu</span>}</span>
                            </div>
                            <div>
                                <span>Kết luận: </span>
                                <span className='font-semibold'>{record.conclusion || <span className='italic font-normal text-sm'>Chưa có dữ liệu</span>}</span>
                            </div>
                            <div>
                                <span>Lưu ý: </span>
                                <span className='font-semibold'>{record.note || <span className='italic font-normal text-sm'>Chưa có dữ liệu</span>}</span>
                            </div>
                        </div>
                        <div className="border border-teal-500 p-2">
                            <p className='font-semibold mb-2'>Thông tin đơn thuốc</p>
                            {
                                prescription.length > 0 ? prescription.map((pre, index) => {
                                    return <div key={pre.id}>
                                       <div className='flex justify-between mb-2'>
                                            <p className='font-semibold border-b-[2px] border-teal-500 inline-block'>Đơn thuốc {index + 1}</p>
                                            <p className='font-semibold border-b-[2px] border-teal-500 inline-block'>Ngày kê đơn: {pre.datePrescription}</p>
                                        </div>
                                        <table border={1} className='border border-slate-400 mt-1'>
                                            <thead>
                                                <tr className='text-left border border-slate-400'>
                                                    <th>Tên thuốc</th>
                                                    <th>Số liều</th>
                                                    <th>Giá</th>
                                                    <th>Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    pre.prescriptionItem.map(p => 
                                                        <tr className='text-left border border-slate-400' key={p.id}>
                                                            <td>{p.medicine.name}</td>
                                                            <td>{p.dose}</td>
                                                            <td>{formatCurrency(p.price)}</td>
                                                            <td>{formatCurrency(p.priceItem)}</td>
                                                        </tr>    
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                        <p className='text-right'>Tổng tiền: {formatCurrency(pre.totalPrice)}</p>
                                    </div>
                                }) : <p className='italic'>Chưa có dữ liệu</p>
                            }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>}
        </>
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
    const [isGrid, setIsGrid] = useState(true)
    const [myAppointments, setMyAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; 


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
            if (res.status) {
                setMyAppointments(res.data);
            }
        })
    }, []);

    return (
        <div className="bg-gray-100 p-4 min-h-screen">
            
            <div className="bg-white pt-8 pb-8 rounded shadow">
                <div className='flex justify-between mb-4'>
                    <h1 className="text-2xl font-bold mb-4 pl-8">Danh sách lịch đặt hẹn</h1>
                    <div className='flex gap-3 pr-8'>
                        <Button onClick={() => setIsGrid(true)}>Xem dạng lưới</Button>
                        <Button onClick={() => setIsGrid(false)}>Xem dạng lịch</Button>
                    </div>
                    
                </div>
                {isGrid ? <div className="px-8">
                    <AppointmentsList appointments={currentAppointments} />
                    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                </div> : <Schedule />}

                
            </div>
        </div>
    );
};

export default AppointmentSchedule;


