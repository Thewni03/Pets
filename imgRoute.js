import express from 'express';
import { upload, uploadImg, getImage, deleteImage } from '../controllers/imgController.js'
import authUser from '../middlewares/authUser.js'

const imgRouter = express.Router();

imgRouter.post("/upload-img", authUser, upload.single("image"), uploadImg);
imgRouter.get("/get-img", authUser, getImage);
imgRouter.delete("/delete-img/:id", authUser, deleteImage);

export default imgRouter;