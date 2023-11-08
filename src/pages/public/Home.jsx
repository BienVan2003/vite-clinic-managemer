// import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import UserLayout from "../../layouts/UserLayout";
const Home = function () {
    const notify = () => toast("Wow so easy!");
    return (
        <UserLayout>
            <button onClick={notify}>Notify!</button>
            <ToastContainer />

        </UserLayout>
    );
};

export default Home;
