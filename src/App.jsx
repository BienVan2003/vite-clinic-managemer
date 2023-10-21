import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppointmentHistory from './pages/Admin/AppointmentHistory';
import AppointmentSchedule from "./pages/Admin/AppointmentSchedule";
import Clinic from './pages/Admin/Clinic';
import Doctor from './pages/Admin/Doctor';
import HospitalStaff from './pages/Admin/HospitalStaff';
import Medicine from './pages/Admin/Medicine';
import Patient from './pages/Admin/Patient';
import Service from './pages/Admin/Service';
import Login from './pages/User/Login';
import Register from './pages/User/Register';
import Home from './pages/User/Home';
import CreateAppointment from './pages/User/CreateAppointment';
import News from './pages/User/News';
import Contact from './pages/User/Contact';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-appointment" element={<CreateAppointment />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="admin/" element={<AppointmentSchedule />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="admin/appointment-schedule" element={<AppointmentSchedule />} />
          <Route path="admin/appointment-history" element={<AppointmentHistory />} />
          <Route path='admin/clinic' element={<Clinic />} />
          <Route path='admin/service' element={<Service />} />
          <Route path='admin/medicine' element={<Medicine />} />
          <Route path='admin/doctor' element={<Doctor />} />
          <Route path='admin/clinic' element={<Clinic />} />
          <Route path='admin/hospital-staff' element={<HospitalStaff />} />
          <Route path='admin/patient' element={<Patient />} />
        </Routes>
      </Router>
    </>
  )
}

export default App