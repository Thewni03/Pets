import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Use 'react-router-dom' for routing
import './App.css';

import Addusers from './Components/Addusers/AddUser';
import Records from './Components/Records/Records';
import UploadFiles from './Components/UploadFiles/UploadFiles';
import NewUser from './Components/NewUser/NewUser';
import UpdateUser from './Components/UpdateUser/UpdateUser';
import Customer from './Components/Customers/Customer';
import DisplayPdf from './Components/UploadFiles/DisplayPdf';
import AIChat from './Components/Diet/AIChat';
function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>

          <Route path="/adduser" element={<Addusers />} />
          <Route path="/record" element={<Records />} />
          <Route path="/files" element={<UploadFiles />} />
          <Route path="/newuser" element={<NewUser />} />
          <Route path="/updateuser/:id" element={<UpdateUser />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/display" element={<DisplayPdf />} />
          <Route path="/ai" element={<AIChat />} />

          DisplayPdf
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
