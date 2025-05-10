import express from "express";

const vetRouter = express.Router();

// import model
// import Vets from "../models/vetModel.js";

// import user controller
import {
  getAllVets,
  addVets,
  getById,
  updateVet,
  deleteVet
} from '../controllers/vetController.js'

vetRouter.get("/", getAllVets);
vetRouter.post("/", addVets);
vetRouter.get("/:id", getById);
vetRouter.put("/:id", updateVet);
vetRouter.delete("/:id", deleteVet);

// exports
export default vetRouter;