import React from 'react'
import { UserRoundPlus, Trash2 } from 'lucide-react'
import { useState, useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'


const AddDoctor = () => {
    const [docImg, setDocImg] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General')
    const [degree, setDegree] = useState('')

    const { backendUrl, aToken } = useContext(AdminContext)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setDocImg(file);
        }
    }

    const removeImage = (e) => {
        e.stopPropagation();
        setDocImg(null);
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if(!docImg){
                return toast.error("Image has not selected")
            }
            const formData = new FormData()

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)

            formData.forEach((value, key)=>{
                console.log(`${key} : ${value}`)
            })

            const {data} = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {headers:{ aToken }})

            if(data.success){
                toast.success(data.message)
                setDocImg(null)
                setName('')
                setEmail('')
                setPassword('')
                setDegree('')
                setAbout('')
                setFees('')
            } else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>
            <p className='mb-3 text-lg font-medium'>Add Doctor</p>
            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-500 relative'>
                    {
                        docImg ? (
                            <div className="relative w-24 h-24">
                                <img src={docImg ? URL.createObjectURL(docImg) : ""} alt="Doctor" className="w-24 h-24 bg-gray-100 rounded-full object-cover" />
                                <button type="button" onClick={removeImage} className="absolute bottom-0 right-0 bg-red-500 text-white p-1 rounded-full shadow-md" >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <label htmlFor="doc-img" className="cursor-pointer relative">
                                <UserRoundPlus className="w-24 h-24 bg-gray-100 rounded-full" />
                            </label>
                        )
                    }
                    
                    <input onChange={handleImageChange} type="file" id="doc-img" hidden accept="image/*" />
                    <p>Upload doctor <br /> picture</p>
                </div>

                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor Name :</p>
                            <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor Email :</p>
                            <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor Password :</p>
                            <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Experience :</p>
                            <select onChange={(e)=>setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2' name="" id="">
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Year</option>
                                <option value="3 Year">3 Year</option>
                                <option value="4 Year">4 Year</option>
                                <option value="5 Year">5 Year</option>
                                <option value="6 Year">6 Year</option>
                                <option value="7 Year">7 Year</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-4'>
                            <p>Fees :</p>
                            <input onChange={(e)=>setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="text" placeholder='fees' required />
                        </div>

                    </div>
                    
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Specialty</p>
                            <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2' name="" id="">
                                <option value="General">General</option>
                                <option value="Surgeon">Surgeon</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Education</p>
                            <input onChange={(e)=>setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Education' required />
                        </div>
                    </div>

                </div>
                <p className='mt-4 mb-2'>About Doctor</p>
                <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' type="text" placeholder='Write about doctor' rows={5} required />
                <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full cursor-pointer'>Add doctor</button>
            </div>
        </form>
    )
}

export default AddDoctor