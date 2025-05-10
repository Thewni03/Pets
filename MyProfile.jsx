import React, { useState, useContext, useEffect } from 'react'
import { UserCircleIcon, PlusCircleIcon, Trash2, Edit2, X } from "lucide-react";
import { AppContext } from '../context/AppContext';

const MyProfile = () => {
    const {userData, setUserData, token, updateUserProfileData, pets, getPetsData, addOrEditPet, deletePet, openModal, closeModal, isModalOpen, isEditing, petData, setPetData  } = useContext(AppContext)

    const [isEdit, setIsEdit] = useState(false)
    
    useEffect(() => {
        if (token) getPetsData();
    }, [token]);

    const handleSave = async () => {
        await updateUserProfileData()
        setIsEdit(false)
    };
    
    // Handle pet form input
    const handlePetChange = (e) => {
        setPetData({ ...petData, [e.target.name]: e.target.value });
    }

    return userData && (
        <div className='max-w-lg flex flex-col gap-2 text-sm'>
            <UserCircleIcon className="w-20 h-30 text-green-300"/>
            {
                isEdit
                ? <input className='bg-gray-100 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e => setUserData(prev => ({...prev, name:e.target.value}))}/>
                : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
            }
            <hr className='bg-zinc-400 h-[1px] border-none' />
            <div>
                <p className='text-neutral-600 underline mt-3'>Contact Information</p>
                <div className='grid grid-cols-[1fr_3fr] gap-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Email id:</p>
                    <p className='text-blue-500'>{userData.email}</p>
                    <p className='font-medium'>Phone:</p>
                    {
                        isEdit
                        ? <input className='bg-gray-100 max-w-52' type="tel" value={userData.phone} onChange={e => setUserData(prev => ({...prev, phone:e.target.value}))}/>
                        : <p className='text-blue-400'>{userData.phone}</p>
                    }
                    {/* <p className='font-medium'>Address:</p>
                    {
                        isEdit
                        ? <p>
                            <input className='bg-gray-100' onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line1: e.target.value}}))} value={userData.address.line1} type="text" />
                            <br />
                            <input className='bg-gray-100' onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line2: e.target.value}}))} value={userData.address.line2} type="text" />
                        </p>
                        : <p className='text-gray-500'>
                            {userData.address.line1}
                            <br />
                            {userData.address.line2}
                        </p>
                    } */}
                </div>
            </div>
            <div>
                <p className='text-neutral-600 underline mt-3'>Basic Information</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Gender: </p>
                    {
                        isEdit
                        ? <select className='max-w-20 bg-gray-200' onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))} value={userData.gender}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        : <p className='text-gray-500'>{userData.gender}</p>
                    }
                    <p className='font-medium'>Birthday</p>
                    {
                        isEdit
                        ? <input className='max-w-28 bg-gray-200' type="date" onChange={(e) => setUserData(prev => ({...prev, dob: e.target.value}))} value={userData.dob} />
                        : <p className='text-gray-500'>{userData.dob}</p>
                    }
                </div>
            </div>

            <div className='mt-10'>
                {
                    isEdit
                    ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={handleSave}>Save information</button>
                    : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={()=>setIsEdit(true)}>Edit</button>
                }
            </div>
            
            {/* Pet Section */}
            <div className='mt-6'>
                <div className='flex justify-between items-center'>
                    <p className='text-neutral-600 underline text-lg'>My Pets</p>
                    <PlusCircleIcon className="w-6 h-6 text-blue-500 cursor-pointer" onClick={() => openModal()} />
                </div>

                {/* Display Pets */}
                <div className='mt-4'>
                    {pets.length === 0 ? (
                        <p className='text-gray-500'>No pets added yet.</p>
                    ) : (
                        pets.map(pet => (
                            <div key={pet._id} className='border p-3 rounded-lg flex justify-between items-center mt-2'>
                                <div>
                                    <p className='font-medium'>{pet.name} ({pet.type})</p>
                                    <p className="text-gray-500 text-sm grid grid-cols-3 gap-4 w-[375px]">
                                        <span className="w-[125px]">Breed: {pet.breed}</span>
                                        <span className="w-[125px]">Age: {pet.age} years old</span>
                                        <span className="w-[125px]">Vaccinated: {pet.vaccinated ? 'Yes' : 'No'}</span>
                                    </p>
                                </div>
                                <div className='flex gap-4'>
                                    <Edit2 className="w-5 h-5 text-yellow-500 cursor-pointer" onClick={() => openModal(pet)} />
                                    <Trash2 className="w-5 h-5 text-red-500 cursor-pointer" onClick={() => deletePet(pet._id)} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className='fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-sky-100 p-6 rounded-lg shadow-lg w-96'>
                        <div className='flex justify-between'>
                            <h2 className='text-xl font-semibold'>{isEditing ? "Edit Pet" : "Add a Pet"}</h2>
                            <X className="w-5 h-5 cursor-pointer" onClick={closeModal} />
                        </div>
                        <input className='w-full p-2 border rounded mt-2' type="text" name="name" placeholder="Pet Name" value={petData.name} onChange={handlePetChange} required />
                        <select className='w-full p-2 border rounded mt-2' name="type" value={petData.type} onChange={handlePetChange} required>
                            <option value="">Select Type</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Bird">Bird</option>
                            <option value="Other">Other</option>
                        </select>
                        <input className='w-full p-2 border rounded mt-2' type="text" name="breed" placeholder="Breed" value={petData.breed} onChange={handlePetChange} />
                        <input className='w-full p-2 border rounded mt-2' type="number" name="age" placeholder="Age" value={petData.age} onChange={handlePetChange} />
                        <select className='w-full p-2 border rounded mt-2' name="gender" value={petData.gender} onChange={handlePetChange}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <label className='flex items-center mt-2'>
                            <input type='checkbox' className='mr-2' checked={petData.vaccinated} onChange={e => setPetData(prev => ({ ...prev, vaccinated: e.target.checked }))} />
                            Vaccinated
                        </label>
                        <textarea className='w-full p-2 border rounded mt-2' name="medicalHistory" placeholder="Medical History" value={petData.medicalHistory} onChange={handlePetChange}></textarea>

                        <button className='bg-blue-500 text-white px-4 py-2 rounded mt-4' onClick={addOrEditPet}>{isEditing ? "Update Pet" : "Save Pet"}</button>
                    </div>
                </div>
            )}

            
        </div>
    )
}

export default MyProfile