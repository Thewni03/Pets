const express = require("express");
const router = express.Router();


const User = require("../model/UserModel");


const UserControl = require("../controllers/UserControl");

//diet ai
const AiControl = require("../controllers/AiControl"); 


router.get("/", UserControl.getAllUsers);
router.post("/", UserControl.addusers);
router.get("/:userId", UserControl.getById);
router.put("/:userId", UserControl.updateUser);
router.delete("/:userId", UserControl.deleteUser);


router.post("/ai-response", AiControl.getAiResponse); 

module.exports = router;
