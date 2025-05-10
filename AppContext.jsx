import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import { toast } from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = 'LKR';
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [userData, setUserData] = useState(false)
    const [pets, setPets] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [petData, setPetData] = useState({
        _id: '',
        name: '',
        type: '',
        breed: '',
        age: '',
        gender: '',
        vaccinated: '',
        medicalHistory: []
    })
    const [tickets, setTickets] = useState([]);
    

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`)
            if (data.success) {
                setDoctors(data.doctors)
                console.log("Fetched Doctors:", data.doctors);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, { headers: { token } })
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getPetsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/pet/my-pets`, { headers: { token } });
            if (data.success) setPets(data.pets);
        } catch (error) {
            console.log(error)
            toast.error("Failed to load pets.");
        }
    }

    const openModal = (pet = null) => {
        setIsEditing(!!pet);
        setPetData(pet || { _id: '', name: '', type: '', breed: '', age: '', gender: '', vaccinated: '', medicalHistory: [] });
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
    };

    const addOrEditPet = async () => {
        try {
            let response;
            if (isEditing) {
                response = await axios.put(`${backendUrl}/api/pet/update/${petData._id}`, petData, {
                    headers: { token }
                });
            } else {
                response = await axios.post(`${backendUrl}/api/pet/add`, petData, {
                    headers: { token }
                });
            }

            if (response.data.success) {
                toast.success(`Pet ${isEditing ? 'updated' : 'added'} successfully`);
                getPetsData();
                closeModal();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'adding'} pet:`, error);
            toast.error(`Failed to ${isEditing ? 'update' : 'add'} pet`);
        }
    }

    // Delete pet
    const deletePet = async (petId) => {
        try {
            const { data } = await axios.delete(`${backendUrl}/api/pet/delete/${petId}`, {
                headers: { token }
            });
            if (data.success) {
                toast.success("Pet deleted");
                setPets(pets.filter(pet => pet._id !== petId));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error deleting pet:", error);
            toast.error("Failed to delete pet");
        }
    }

    // Update user profile
    const updateUserProfileData = async () => {
        try {
            const formData = {
                userId: userData._id,
                name: userData.name,
                phone: userData.phone,
                dob: userData.dob,
                gender: userData.gender,
                pets: userData.pets || []
            }

            console.log("Sending Data:", formData); // Debugging log

            const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error("Profile update failed:", error);
            toast.error(error.response?.data?.message || error.message)
        }
    }

    // Add these to your existing context
    

    const fetchTickets = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/tickets`, { headers: { token } });
            setTickets(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching tickets:', error);
            setTickets([]); 
        }
    };

    const createTicket = async (ticketData) => {
        try {
            const response = await axios.post('/api/tickets', ticketData, { headers: { token } });
            setTickets(prev => [response.data, ...prev]);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to create ticket');
        }
    };



const value = {
    doctors, getDoctorsData,
    currencySymbol,
    token, setToken,
    backendUrl,
    userData, setUserData,
    loadUserProfileData,
    updateUserProfileData,
    pets, getPetsData,
    addOrEditPet,
    deletePet,
    openModal,
    closeModal,
    isModalOpen,
    isEditing,
    petData,
    setPetData,
    fetchTickets,
    createTicket,
    tickets
}

useEffect(() => {
    getDoctorsData()
    if (token) {
        loadUserProfileData();
        getPetsData();
    }
}, [token])

return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
)
}

export default AppContextProvider