import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import Customer from './Customer';
import { Link } from 'react-router-dom';

const URL = 'http://localhost:4000/api/adm';

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return { users: [] };
  }
};

function AddUser() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const componentRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    fetchHandler().then((data) => {
      console.log(data);
      setUsers(data.users || []);
      setIsLoading(false);
    });
  }, []);

  const ComponentsRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "User Report",
    onAfterPrint: () => alert("Download complete!"),
  });

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <Link 
        to="/newuser" 
        className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Add New User
      </Link>
      
      <div ref={componentRef} className="bg-white p-4 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">User Details Display Page</h1>
        <div className="space-y-4">
          {users && users.map((user) => (
            <div key={user._id}>
              <Customer user={user} />
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={handlePrint}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors cursor-pointer block mx-auto"
      >
        Download Report
      </button>
    </div>
  );
}

export default AddUser;