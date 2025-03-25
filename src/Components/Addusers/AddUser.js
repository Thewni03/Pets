import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import Customer from '../Customers/Customer';
import { Link } from 'react-router-dom';

const URL = 'http://localhost:5008/users';

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
    content: () => ComponentsRef.current,
    documentTitle: "User Report",
    onAfterPrint: () => alert("Download complete!"),
  })


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to="/newuser" className="new-user-link">
        newone
      </Link>
      <div ref={ComponentsRef}>
        <h1>User Details Display Page</h1>
        <div>
          {users &&
            users.map((user) => (
              <div key={user._id}>
                <Customer user={user} />
              </div>
            ))}
        </div>
      </div>
      <button
        onClick={handlePrint}
        style={{ marginTop: '10px', padding: '10px', cursor: 'pointer' }}
      >
        Download Report
      </button>
    </div>
  );
}

export default AddUser;