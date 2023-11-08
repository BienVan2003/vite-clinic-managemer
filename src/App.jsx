import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AdminLogin, AppointmentHistory, AppointmentSchedule, Clinic, Doctor, Medicine, Patient, Service } from './pages/admin';
import { Contact, CreateAppointment, Home, Login, News, Signup } from './pages/public';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="auth/login/patient" element={<Login />} />
          <Route path="auth/signup/patient" element={<Signup />} />
          <Route path="/create-appointment" element={<CreateAppointment />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="admin/" element={<Doctor />} />
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="admin/appointment-schedule" element={<AppointmentSchedule />} />
          <Route path="admin/appointment-history" element={<AppointmentHistory />} />
          <Route path='admin/clinic-management' element={<Clinic />} />
          <Route path='admin/service-management' element={<Service />} />
          <Route path='admin/medicine-management' element={<Medicine />} />
          <Route path='admin/doctor-management' element={<Doctor />} />
          <Route path='admin/patient-management' element={<Patient />} />
        </Routes>
      </Router>
    </>
  )
}

export default App