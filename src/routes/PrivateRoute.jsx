import React from 'react'
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({element}) {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user || user.role !== "PATIENT") {
        return <Navigate to="/auth/login/patient" replace />;
    }

    return element;
   
}
