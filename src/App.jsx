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
import PrescriptionManagement from './pages/Admin/PrescriptionManagement/PrescriptionManagement';
import PatientRecordManagement from './pages/Admin/PatientRecordManagement/PatientRecordManagement';
import Forbidden from './pages/error/Forbidden';
import AdminRoute from './routes/AdminRoute';
import LayoutAuth from './layouts/LayoutAuth';
import LoginDoctor from './pages/auth/login/doctor/LoginDoctor';
import LayoutDoctor from './layouts/LayoutDoctor';
import DoctorShedule from './pages/doctor/DoctorShedule';
import DoctorRoute from './routes/DoctorRoute';
import PrivateRoute from './routes/PrivateRoute';
import ForgotPassword from './pages/patient/ForgotPassword';

function App() {
  
  return (
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<LayoutPatient />} >
            <Route path='' element={<Home />} />
            <Route path='profile' element={<Profile />} />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='create-appointment' element={<PrivateRoute element={<CreateAppointment />} />} />
            <Route path='appointment-schedule' element={<PrivateRoute element={<AppointmentSchedule/>} />} />
          </Route>

          <Route path='/doctor' element={<DoctorRoute element={<LayoutDoctor />} />} >
            <Route path='schedule' element={<DoctorRoute element={<DoctorShedule />} />} />
          </Route>

          <Route path='/auth' element={<LayoutAuth />} >
            <Route path='login/admin' element={<LoginAdmin />} />
            <Route path='login/doctor' element={<LoginDoctor />} />
            <Route path='login/patient' element={<LoginPatient />} />
            <Route path='signup/patient' element={<SignupPatient />} />
          </Route>


          <Route path='/admin' element={<AdminRoute element={<LayoutAdmin />} />}>
            <Route index path='appointment-management' element={<AppointmentManagement />} />
            <Route path='clinic-management' element={<ClinicManagement />} />
            <Route path='service-management' element={<ServiceManagement />} />
            <Route path='medicine-management' element={<MedicineManagement />} />
            <Route path='shift-management' element={<ShiftManagement />} />
            <Route path='doctor-management' element={<DoctorManagement />} />
            <Route path='patient-management' element={<PatientManagement />} />
            <Route path='prescription-management' element={<PrescriptionManagement />} />
            <Route path='record-management' element={<PatientRecordManagement />} />
          </Route>

          <Route path='*' element={<NotFound />} />
          <Route path='/forbidden' element={<Forbidden />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App