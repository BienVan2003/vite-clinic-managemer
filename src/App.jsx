import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutAdmin from './layouts/LayoutAdmin';
import LayoutPatient from './layouts/LayoutPatient';
import AppointmentManagement from './pages/admin/AppointmentManagement/AppointmentManagement';
import ClinicManagement from './pages/admin/ClinicManagement/ClinicManagement';
import DoctorManagement from './pages/admin/DoctorManagement/DoctorManagement';
import MedicineManagement from './pages/admin/MedicineManagement/MedicineManagement';
import PatientManagement from './pages/admin/PatientManagement/PatientManagement';
import ServiceManagement from './pages/admin/ServiceManagement/ServiceManagement';
import ShiftManagement from './pages/admin/ShiftManagement/ShiftManagement';
import LoginAdmin from './pages/auth/login/admin/LoginAdmin';
import LoginPatient from './pages/auth/login/patient/LoginPatient';
import SignupPatient from './pages/auth/signup/patient/SignupPatient';
import NotFound from './pages/error/NotFound';
import Home from './pages/patient/Home';
import Profile from './pages/patient/Profile';
import ChangePassword from './pages/patient/ChangePassword'
import CreateAppointment from './pages/patient/CreateAppointment';
import AppointmentSchedule from './pages/patient/AppointmentSchedule'

function App() {
  
  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<LayoutPatient />} >
            <Route path='' element={<Home />} />
            <Route path='profile' element={<Profile />} />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='create-appointment' element={<CreateAppointment />} />
            <Route path='appointment-schedule' element={<AppointmentSchedule/>} />
          </Route>

          <Route path='/auth' element={<LayoutPatient />} >
            <Route path='login/admin' element={<LoginAdmin />} />
            <Route path='login/patient' element={<LoginPatient />} />
            <Route path='signup/patient' element={<SignupPatient />} />
          </Route>


          <Route path='/admin' element={<LayoutAdmin />}>
            <Route path='appointment-management' element={<AppointmentManagement />} />
            {/* <Route path='appointment-history' element={<Contact />} /> */}
            <Route path='clinic-management' element={<ClinicManagement />} />
            <Route path='service-management' element={<ServiceManagement />} />
            <Route path='medicine-management' element={<MedicineManagement />} />
            <Route path='shift-management' element={<ShiftManagement />} />
            <Route path='doctor-management' element={<DoctorManagement />} />
            <Route path='patient-management' element={<PatientManagement />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App