import React from 'react'
import { Navigate } from 'react-router-dom';

export default function DoctorRoute({ element }) {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
        return <Navigate to="/auth/login/doctor" replace />;
    }

    if (user && user.role === "DOCTOR") {
        return element;
    } else {
        return <Navigate to="/forbidden" replace />;
    }
}
