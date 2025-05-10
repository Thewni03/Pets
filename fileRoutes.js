import express from 'express';
import { upload, uploadFile, getFiles } from '../controllers/fileController.js';

const fileRouter = express.Router();
fileRouter.post("/upload", upload.single("file"), uploadFile);
fileRouter.get("/", getFiles);

export default fileRouter;