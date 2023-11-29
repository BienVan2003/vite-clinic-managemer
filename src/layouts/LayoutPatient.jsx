/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

function LayoutPatient() {
    return (
      <div className="w-full">
        <Nav />
        <div className="w-full h-scree">
            <Outlet />
           <Footer />
        </div>
        <ToastContainer />
      </div>
    );
}

export default LayoutPatient;
