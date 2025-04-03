const express = require("express");
const router = express.Router();
//insert model
const User = require("../Model/UserModel");
//Insert User controller
const UserController = require("../controllers/UserControllers");

router.get("/",UserController.getAllUsers);
router.post("/",UserController.addUsers);
router.get("/:id",UserController.getById);
router.put("/:id",UserController.updateUser);
router.delete("/:id",UserController.deleteUser);

//export
module.exports = router;