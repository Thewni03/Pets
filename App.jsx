import React from 'react';
import { Route, Routes } from 'react-router-dom';
import "tailwindcss";
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import SuccessPage from './pages/SuccessPage';
import ErrorPage from './pages/ErrorPage';
import PetHome from './pages/lak/PetHome';
import AddUser from './pages/lak/AddUser';
import Users from './pages/lak/Users';
import UpdateUser from './pages/lak/UpdateUser';
//import Imguploader from './pages/lak/ImgUploader';
import Imgupload from './pages/lak/ImgUpload';
import TicketDashboard from './pages/ticket/TicketDashboard';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/pet-home' element={<PetHome />} />
        <Route path="/petvacdetails" element={<AddUser />} />
        <Route path="/petdetails" element={<Users />} />
        <Route path="/petdetails/:petId" element={<UpdateUser />} />
        <Route path="/imgpart" element={<Imgupload />} />
        <Route path='/tickets' element={<TicketDashboard />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App