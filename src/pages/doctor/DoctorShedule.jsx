import React, { useEffect, useState } from 'react'
import { apiAppointmentDoctorWeek, apiShiftList } from '../../services';
import { formatddMMyyyy, formatyyyyMMdd } from '../../utils/formatDateJs';

export default function DoctorShedule() {
    const user = JSON.parse(localStorage.getItem('user'))
    const [schedule, setSchedule] = useState([])
    const [dayOfWeeks, setDayOfWeeks] = useState([])
    const [shifts, setShifts] = useState([])



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

        const res = await apiAppointmentDoctorWeek({
            doctorId: user.id,
            start: weekDates[0].date,
            end: weekDates[6].date
        })

        console.log(res.data)
        setSchedule(res.data)
    }

    const fetchShifts = async () => {
        const res = await apiShiftList();
        console.log(res)
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

        const res = await apiAppointmentDoctorWeek({
            doctorId: user.id,
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

        const res = await apiAppointmentDoctorWeek({
            doctorId: user.id,
            start: weekDates[0].date,
            end: weekDates[6].date
        })

        setSchedule(res.data)
    }


    return (
        <div className='flex flex-col mt-16'>
            <div className='flex flex-col justify-end gap-2 px-10'>
                <div className='text-2xl mb-2'>LỊCH KHÁM CHỮA BỆNH CỦA BÁC SĨ <span className='uppercase font-semibold'>{user.name}</span></div>
                <div className='flex gap-4'>
                    <button className="px-4 py-[4px] rounded-md text-white bg-teal-600" onClick={handlePrevWeek}>Trước</button>
                    <button className="px-4 py-[4px] rounded-md text-white bg-teal-600" onClick={handleNextWeek}>Sau</button>
                </div>
                <div className='flex gap-2'>
                    Từ <p className='font-semibold'>{dayOfWeeks[0] && formatddMMyyyy(dayOfWeeks[0].date)}</p> đến <p className='font-semibold'>{dayOfWeeks[6] && formatddMMyyyy(dayOfWeeks[6].date)}</p>
                </div>
            </div>
            <div className="w-full flex p-6 mt-6">
                <div className='border-[1px] w-[60px] bg-green-700 text-white'>
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
                            <div className='px-1 h-[32px] font-semibold text-md flex items-center justify-center bg-green-700 text-white'>{item.day} ({formatddMMyyyy(item.date)})</div>
                            {
                                shifts.map(s => {
                                    const check = schedule.find(st => st.shiftSchedule.id === s.id && formatyyyyMMdd(st.dateSchedule) === item.date && st.status === "SUCCESS" && st.doctor.id == user.id)
                                    if (
                                        check
                                    ) {
                                        return (
                                            <div
                                                style={{
                                                    backgroundColor: getRandomColor()
                                                }}
                                                className='px-1 w-[200px] h-[120px] border-[1px] border-slate-300 text-sm text-white flex flex-col gap-2 items-center justify-center'
                                                key={s.id}
                                            >
                                                <div className='flex gap-2'>
                                                    <span>BN: </span>
                                                    <span className='font-semibold'>{check.patient.name}</span>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <span>Khoa: </span>
                                                    <span className='font-semibold'>{check.service.name}</span>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <span>Giờ: </span>
                                                    <span className='font-semibold'>{`${s.startTime} - ${s.endTime}`}</span>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div
                                                className='px-1 w-[200px] h-[120px] border-[1px] border-slate-300 text-sm text-white flex flex-col items-center justify-center'
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
    )
}
