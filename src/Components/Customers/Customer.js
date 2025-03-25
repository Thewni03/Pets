import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import Nav from '../Nav/Nav';
import './Customer.css';

const Customer = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);

    const componentRef = useRef();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5008/users');
                setUsers(response.data.users || []);
                setFilteredUsers(response.data.users || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            setFilteredUsers(users);
            setNoResults(false);
            return;
        }

        const filtered = users.filter(user =>
            Object.values(user).some(field =>
                field?.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );

        setFilteredUsers(filtered);
        setNoResults(filtered.length === 0);
    };

    const handleDelete = async (userId) => {
        if (!userId) {
          console.error('Invalid User ID');
          return;
        }
      
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (!confirmDelete) return;
      
        try {
          const response = await axios.delete(`http://localhost:5008/users/${userId}`);
          console.log('User deleted:', response.data);
          setUsers(users.filter(user => user.userId !== userId));
          setFilteredUsers(filteredUsers.filter(user => user.userId !== userId));
        } catch (error) {
          console.error('Error deleting user:', error.response?.data || error.message);
        }
      };
      

    const handlePrint = useReactToPrint({
        documentTitle: 'User Report',
        content: () => componentRef.current,
    });

    return (
        <div>
            <Nav />
            <br /><br />
            <button className='click'>
                <Link to="/newuser" className="ab">New User</Link>
            </button>
            <br /><br />
            <input
                type='text'
                placeholder='Search user details'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className='find' onClick={handleSearch}>Search</button>

            <div ref={componentRef} style={{ padding: '20px' }}>
                {noResults ? (
                    <p>No users found</p>
                ) : (
                    <div className="container">
                        <h2>Manage Users</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Phone</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.userId}>
                                        <td>{user.userId}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>{user.phone}</td>
                                        <td>
                                            <Link to={`/updateuser/${user.userId}`} className="edit-btn">
                                                Update
                                            </Link>
                                        </td>
                                        <td>
                                        <button className="delete-btn" onClick={() => handleDelete(user._id)}>
                                        Delete
                                        </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <center>
                <button 
                    className='down' 
                    onClick={handlePrint}
                    style={{ marginTop: '10px', padding: '10px', cursor: 'pointer' }}
                >
                    Download Report
                </button>
            </center>
        </div>
    );
};

export default Customer;
