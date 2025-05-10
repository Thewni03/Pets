import express from 'express'
import { addPet, getUserPets, updatePet, deletePet } from '../controllers/petController.js'
import authUser from '../middlewares/authUser.js'

const petRouter = express.Router()

petRouter.post('/add', authUser, addPet)
petRouter.get('/my-pets', authUser, getUserPets)
petRouter.put('/update/:petId', authUser, updatePet)
petRouter.delete('/delete/:petId', authUser, deletePet)


export default petRouter