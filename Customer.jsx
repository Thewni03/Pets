import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import Nav from '../../components/Components/Nav';

const Customer = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [error, setError] = useState('');

    const componentRef = useRef();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/adm');
                setUsers(response.data.users || []);
                setFilteredUsers(response.data.users || []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load users. Please try again later.');
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

    const handleDelete = async (id) => {
        // if (!userId) {
        //     alert('Invalid User ID');
        //     return;
        // }
        
        const confirmDelete = window.confirm('Do you really wanna delete?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:4000/api/adm/${id}`);
            setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
            setFilteredUsers(prevFiltered => prevFiltered.filter(user => user._id !== id));
        } catch (error) {
            console.error('Error deleting user:', error.response?.data || error.message);
            alert('Failed to delete user. Please try again.');
        }
    };

    const handlePrint = useReactToPrint({
        documentTitle: 'Title',
        contentRef: componentRef,
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Nav />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col space-y-6">
                    <Link 
                        to="/newuser" 
                        className="bg-indigo-400 hover:bg-blue-600 text-white text-center rounded px-6 py-3 text-xl font-medium transition-colors duration-300 self-center"
                    >
                        New User
                    </Link>

                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Search user details"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button 
                            onClick={handleSearch}
                            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded text-xl font-medium transition-colors duration-300"
                        >
                            Search
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <div ref={componentRef} className="bg-white p-6 rounded-lg shadow-md">
                        {noResults ? (
                            <p className="text-center text-gray-500">No users found</p>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Manage Users</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full border border-gray-200">
                                        <thead>
                                            <tr className="bg-blue-500 text-white">
                                                <th className="px-6 py-3 text-left">User ID</th>
                                                <th className="px-6 py-3 text-left">Name</th>
                                                <th className="px-6 py-3 text-left">Email</th>
                                                <th className="px-6 py-3 text-left">Role</th>
                                                <th className="px-6 py-3 text-left">Phone</th>
                                                <th className="px-6 py-3 text-left">Update</th>
                                                <th className="px-6 py-3 text-left">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredUsers.map((user) => (
                                                <tr key={user._id} className="hover:bg-gray-50 even:bg-gray-50">
                                                    <td className="px-6 py-4 border border-gray-200">{user.userId}</td>
                                                    <td className="px-6 py-4 border border-gray-200">{user.name}</td>
                                                    <td className="px-6 py-4 border border-gray-200">{user.email}</td>
                                                    <td className="px-6 py-4 border border-gray-200">{user.role}</td>
                                                    <td className="px-6 py-4 border border-gray-200">{user.phone}</td>
                                                    <td className="px-6 py-4 border border-gray-200">
                                                        <Link 
                                                            to={`/updateuser/${user._id}`} 
                                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-300"
                                                        >
                                                            Update
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4 border border-gray-200">
                                                        <button 
                                                            onClick={() => handleDelete(user._id)}
                                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-300"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={handlePrint}
                        className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded text-xl font-medium transition-colors duration-300 self-center"
                    >
                        Download Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Customer;