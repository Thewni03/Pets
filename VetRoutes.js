const express = require("express");
const router = express.Router();

//insert model

const Vets = require("../model/VetModel");

//insert user controller

const VetController = require("../controllers/VetControllers");

router.get("/",VetController.getAllVets);
router.post("/",VetController.addVets);
router.get("/:id",VetController.getById);
router.put("/:id",VetController.updateVet);
router.delete("/:id",VetController.deleteVet);



//exports

module.exports = router;
