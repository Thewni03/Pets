import express from "express";
import adminControl from "../controllers/adminControl.js";

const arouter = express.Router();


arouter.get("/", adminControl.getAllUsers);
arouter.post("/", adminControl.addUser);

arouter.get("/vets", adminControl.vetVisit);


arouter.get("/:id", adminControl.getById);
arouter.put("/:id", adminControl.updateUser);
arouter.delete("/:id", adminControl.deleteUser);

export default arouter;