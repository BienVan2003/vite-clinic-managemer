import React from 'react'
import Nav from '../components/Nav'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Footer from '../components/Footer'

export default function LayoutAuth() {
    return (
        <div className='h-screen'>
            <Nav />
            <div className='flex justify-center items-center h-screen bg-slate-300'>
                <Outlet />
            </div>
            <Footer />
            <ToastContainer />
        </div>
    )
}
