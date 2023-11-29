import React from 'react'
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ element }) {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
        return <Navigate to="/auth/login/admin" replace />;
    }

    if (user && user.role != "PATIENT") {
        return element;
    } else {
        return <Navigate to="/forbidden" replace />;
    }
}
