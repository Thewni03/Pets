const VetModel = require("../model/VetModel");

// Get all vets
const getAllVets = async (req, res, next) => {
    try {
        const vets = await VetModel.find();
        if (!vets || vets.length === 0) {
            return res.status(404).json({ message: "Vets not found" });
        }
        return res.status(200).json({ vets });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Add a new vet
const addVets = async (req, res, next) => {
    const { Appointment, Diagnosis, treatment, prescription, vetId } = req.body;

    try {
        const vet = new VetModel({ Appointment, Diagnosis, treatment, prescription, vetId });
        await vet.save();
        return res.status(201).json({ vet });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to add Vet" });
    }
};

// Get vet by ID
const getById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const vet = await VetModel.findById(id);
        if (!vet) {
            return res.status(404).json({ message: "Vet not found" });
        }
        return res.status(200).json({ vet });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update vet details
const updateVet = async (req, res, next) => {
    const id = req.params.id;
    const { Appointment, Diagnosis, treatment, prescription, vetId } = req.body;

    try {
        const vet = await VetModel.findByIdAndUpdate(
            id,
            { Appointment, Diagnosis, treatment, prescription, vetId },
            { new: true }
        );
        if (!vet) {
            return res.status(404).json({ message: "Unable to update vet details" });
        }
        return res.status(200).json({ vet });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete vet
const deleteVet = async (req, res, next) => {
    const id = req.params.id;
    try {
        const vet = await VetModel.findByIdAndDelete(id);
        if (!vet) {
            return res.status(404).json({ message: "Unable to delete vet details" });
        }
        return res.status(200).json({ message: "Vet deleted successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Export functions
exports.getAllVets = getAllVets;
exports.addVets = addVets;
exports.getById = getById;
exports.updateVet = updateVet;
exports.deleteVet = deleteVet;