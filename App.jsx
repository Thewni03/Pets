import React from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard';
import AllApointments from './pages/Admin/AllApointments';
import DoctorsList from './pages/Admin/DoctorsList';
import AddDoctor from './pages/Admin/AddDoctor';
import AddUser from './pages/Admin/AddUser';
import Customer from './pages/Admin/Customer';
import AIChat from './pages/Admin/AIChat';
import NewUser from './pages/Admin/NewUser';
import Records from './pages/Admin/Records';
import UpdateUser from './pages/Admin/UpdateUser';
import UploadFiles from './pages/Admin/UploadFiles';
import VetVisit from './pages/Admin/VetVisit';
import VetAppointments from './pages/Doctor/VetAppointments';
import VetDashboard from './pages/Doctor/VetDashboard';
import VetProfile from './pages/Doctor/VetProfile';
import { DoctorContext } from './context/DoctorContext';
import Appointments from './pages/Doctor/Appointments';
import UpdateVetForm from './pages/Doctor/UpdateVetForm';
import VetForm from './pages/Doctor/VetForm';
import Vets from './pages/Doctor/Vets';


const App = () => {
  const {aToken} = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)
 
  return aToken || dToken ? (
    <div>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start '>
        <Sidebar />
        <Routes>
          {/* Admin routes */}
          <Route path = '/' element = {<></>} />
          <Route path = '/admin-dashboard' element = {<Dashboard />} />
          <Route path = '/all-appointments' element = {<AllApointments />} />
          <Route path = '/add-doctor' element = {<AddDoctor />} />
          <Route path = '/doctor-list' element = {<DoctorsList />} />
          <Route path = '/add-user' element = {<AddUser />} />
          <Route path = '/customer' element = {<Customer />} />
          <Route path = '/ai' element = {<AIChat />} />
          <Route path = '/newuser' element = {<NewUser />} />
          <Route path = '/record' element = {<Records />} />
          <Route path = '/updateuser/:id' element = {<UpdateUser />} />
          <Route path = '/files' element = {<UploadFiles />} />
          <Route path = '/vet-visit' element = {<VetVisit />} />

          {/* Vet routes */}
          <Route path = '/vet-dashboard' element = {<VetDashboard />} />
          <Route path = '/vet-appointments' element = {<VetAppointments />} />
          <Route path = '/vet-profile' element = {<VetProfile />} />
          <Route path = '/vets' element = {<Vets />} />
          <Route path = '/vetForm' element = {<VetForm />} />
          <Route path = '/UpdateVetForm/:id' element = {<UpdateVetForm />} />
          <Route path = '/appointments' element = {<Appointments />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App