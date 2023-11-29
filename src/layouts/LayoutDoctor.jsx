import React from 'react'
import Nav from '../components/Nav';
import { Footer } from 'flowbite-react';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';

export default function LayoutDoctor() {
    return (
        <div className="w-full">
            <Nav />
            <div className="w-full">
                <Outlet />
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
}
