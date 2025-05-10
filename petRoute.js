import express from 'express'
// import fs from 'fs'; // Add this import at the top of petRoute.js
// import path from 'path';
// import { fileURLToPath } from 'url';
import { addPet, getUserPets, updatePet, deletePet, getById } from '../controllers/petController.js'
import authUser from '../middlewares/authUser.js'

const petRouter = express.Router()

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

petRouter.post('/add', authUser, addPet);
petRouter.get('/my-pets', authUser, getUserPets);
petRouter.put('/update/:petId', authUser, updatePet);
petRouter.delete('/:petId', authUser, deletePet);
petRouter.get('/:petId', authUser, getById);

// petRouter.get('/getImage', authUser, getImages)
// Add this to petRoute.js
// petRouter.get('/pet-files/:imageName', (req, res) => {
//     const { imageName } = req.params;
//     const filePath = path.join(__dirname, '../../uploads/petUploads', imageName);
    
//     if (fs.existsSync(filePath)) {
//         res.sendFile(filePath);
//     } else {
//         res.status(404).json({ status: "error", message: "Image not found" });
//     }
// });






// petRouter.post('/uploadImg', authUser, imgUpload.single("image"), uploadImage)

// petRouter.delete('/deleteImage/:id', authUser, deleteImage)

export default petRouter