import { Button, Label, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { apiAppointmentList, apiAppointmentWeek, apiShiftList } from '../../../services';
import { apiSearchAppointmentByDoctor, apiSearchAppointmentByPatient } from '../../../services/search';
import { formatddMMyyyy, formatyyyyMMdd } from '../../../utils/formatDateJs';

const AppointmentManagement = function () {

    const [appointments, setAppointments] = useState([]);
    const [schedule, setSchedule] = useState([])
    const [dayOfWeeks, setDayOfWeeks] = useState([])
    const [shifts, setShifts] = useState([])
    const [isTable, setIsTable] = useState(true)
    const [searchInputPatient, setSearchInputPatient] = useState('')
    const [searchInputDoctor, setSearchInputDoctor] = useState('')

    const fetchData = async () => {
        const res1 = await apiAppointmentList();
        setAppointments(res1.data)
    };

    useEffect(() => {
        return () => {
            fetchData();
        };
    }, []);

    function getWeekDates(inputDate) {
        const currentDate = new Date(inputDate);

        const dayOfWeek = currentDate.getDay();
        const monday = new Date(currentDate);
        monday.setDate(currentDate.getDate() - dayOfWeek + 1);

        const weekDates = [];

        for (let i = 0; i < 7; i++) {
            const nextDay = new Date(monday);
            nextDay.setDate(monday.getDate() + i);
            weekDates.push({
                day: i == 6 ? "Chủ nhật" : "Thứ " + (i + 2),
                date: nextDay.toISOString().slice(0, 10)
            });
        }

        return weekDates;
    }

    const fetchSchedule = async () => {
        const currentDate = new Date();
        const weekDates = getWeekDates(currentDate);
        setDayOfWeeks(weekDates);

        const res = await apiAppointmentWeek({
            start: weekDates[0].date,
            end: weekDates[6].date
        })

        setSchedule(res.data)
    }

    const fetchShifts = async () => {
        const res = await apiShiftList();
        setShifts(res.data)
    }

    useEffect(() => {
        fetchSchedule()
        fetchShifts()
    }, [])

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const handlePrevWeek = async () => {
        const start = new Date(dayOfWeeks[0].date)
        start.setDate(start.getDate() - 7);
        const weekDates = getWeekDates(start);
        setDayOfWeeks(weekDates);
        const res = await apiAppointmentWeek({
            start: weekDates[0].date,
            end: weekDates[6].date
        })

        setSchedule(res.data)
    }

    const handleNextWeek = async () => {
        const start = new Date(dayOfWeeks[dayOfWeeks.length - 1].date)
        start.setDate(start.getDate() + 1);
        const weekDates = getWeekDates(start);
        setDayOfWeeks(weekDates);

        const res = await apiAppointmentWeek({
            start: weekDates[0].date,
            end: weekDates[6].date
        })

        setSchedule(res.data)
    }

    const handleSearchByDoctor = async (e) => {
        const value = e.target.value
        setSearchInputDoctor(value)
        if (value.length >= 2) {
            const response = await apiSearchAppointmentByDoctor(value)
            const searchResult = response.data
            setAppointments(searchResult)
        } else fetchData()
    }

    const handleSearchByPatient = async (e) => {
        const value = e.target.value
        setSearchInputPatient(value)
        if (value.length >= 2) {
            const response = await apiSearchAppointmentByPatient(value)
            const searchResult = response.data
            setAppointments(searchResult)
        } else fetchData()
    }



    return (
        <div className="shadow-2xl rounded-xl mt-12 overflow-hidden">
            <ToastContainer />
            <section className="flex justify-between items-center py-4" style={{ background: "#6b7280" }}>
                <div className='flex gap-4 justify-start items-center px-3'>
                    <Button onClick={() => setIsTable(true)}>Xem dạng bảng</Button>
                    <Button onClick={() => setIsTable(false)}>Xem dạng lịch</Button>
                </div>

                {isTable && <div className='flex gap-6 px-4'>
                    <div className='flex gap-2 items-center'>
                        <Label htmlFor="search-patient" className='text-white font-semibold' value="Bệnh nhân" />
                        <TextInput
                            value={searchInputPatient}
                            onChange={handleSearchByPatient}
                            id="search-patient"
                            placeholder='Bệnh nhân'
                        />
                    </div>
                    <div className='flex gap-2 items-center'>
                        <Label htmlFor="search-doctor" className='text-white font-semibold' value="Bác sĩ" />
                        <TextInput
                            value={searchInputDoctor}
                            onChange={handleSearchByDoctor}
                            id="search-doctor"
                            placeholder='Bác sĩ'
                        />
                    </div>
                </div>}
            </section>

            {isTable ? <section className='table__body'>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th >
                                ID
                            </th>
                            <th >
                                Thời gian khám
                            </th>
                            <th >
                                Bệnh nhân
                            </th>
                            <th >
                                Bác sĩ
                            </th>
                            <th >
                                Khoa khám
                            </th>
                            <th >
                                Trạng thái
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((d) => (
                            <tr key={d.id} className="bg-white">
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    <a href="#" className="font-bold text-blue-500 hover:underline">
                                        {d.id}
                                    </a>
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {`${d.shiftSchedule.startTime} - ${d.shiftSchedule.endTime}, ${d.dateSchedule}`}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {d.patient.name}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {d.doctor.name}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {d.service.name}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {d.status}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
                :
                <section>
                    <div className='flex flex-col'>
                        <div className='flex justify-between items-center gap-2 px-10 mt-2'>
                            <div className='flex gap-2'>
                                Từ <p className='font-semibold'>{formatddMMyyyy(dayOfWeeks[0]?.date)}</p> đến <p className='font-semibold'>{formatddMMyyyy(dayOfWeeks[6]?.date)}</p>
                            </div>
                            <div className='flex gap-2'>
                                <button className="px-4 py-[4px] rounded-md text-white bg-teal-600" onClick={handlePrevWeek}>Trước</button>
                                <button className="px-4 py-[4px] rounded-md text-white bg-teal-600" onClick={handleNextWeek}>Sau</button>
                            </div>

                        </div>
                        <div className="w-full flex p-6">
                            <div className='border-[1px] border-green-700 w-[60px] text-xs bg-green-700 text-white font-semibold'>
                                <div className='flex justify-center items-center h-[32px]'>CA</div>
                                <div className="flex justify-center items-center h-[120px]">CA 1</div>
                                <div className="flex justify-center items-center h-[120px]">CA 2</div>
                                <div className="flex justify-center items-center h-[120px]">CA 3</div>
                                <div className="flex justify-center items-center h-[120px]">CA 4</div>
                                <div className="flex justify-center items-center h-[120px]">CA 5</div>
                                <div className="flex justify-center items-center h-[120px]">CA 6</div>
                                <div className="flex justify-center items-center h-[120px]">CA 7</div>
                            </div>
                            {
                                dayOfWeeks.map(item => {
                                    return <div key={item.date} className=''>
                                        <div className='px-1 h-[40px] font-semibold text-md flex items-center justify-center bg-green-700 text-white text-xs'>{item.day} ({formatddMMyyyy(item.date)})</div>
                                        {
                                            shifts.map(s => {
                                                const check = schedule.find(st => st.shiftSchedule.id === s.id && formatyyyyMMdd(st.dateSchedule) === item.date)
                                                if (
                                                    check
                                                ) {
                                                    return (
                                                        <div
                                                            style={{
                                                                backgroundColor: getRandomColor()
                                                            }}
                                                            className='px-1 w-[150px] h-[120px] border-[1px] border-slate-300 text-xs text-white flex flex-col gap-2 items-center justify-center'
                                                            key={s.id}
                                                        >
                                                            <div className='flex gap-2'>
                                                                <span className='text-left'>BN: </span>
                                                                <span className='font-semibold'>{check.patient.name}</span>
                                                            </div>
                                                            <div className='flex gap-2'>
                                                                <span className='text-left'>BS: </span>
                                                                <span className='font-semibold'>{check.doctor.name}</span>
                                                            </div>
                                                            <div className='flex gap-2'>
                                                                <span className='text-left'>Trạng thái: </span>
                                                                <span className='font-semibold'>{check.status}</span>
                                                            </div>
                                                            <div className='flex gap-2'>
                                                                <span className='text-left'>Giờ: </span>
                                                                <span className='font-semibold'>{`${s.startTime} - ${s.endTime}`}</span>
                                                            </div>
                                                        </div>
                                                    );
                                                } else {
                                                    return (
                                                        <div
                                                            className='px-1 w-[150px] h-[120px] border-[1px] border-slate-300 text-sm text-white flex flex-col items-center justify-center'
                                                            key={s.id}
                                                        ></div>
                                                    );
                                                }
                                            })
                                            // })
                                        }
                                    </div>
                                })
                            }



                        </div>
                    </div>
                </section>}

        </div>
    );
};

export default AppointmentManagement;
