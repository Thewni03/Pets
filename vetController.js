import vetModel from "../models/vetModel.js";

// Get all vets
export const getAllVets = async (req, res) => {
    try {
        const vets = await vetModel.find();
        if (!vets || vets.length === 0) {
            return res.status(404).json({ message: "Vets not found" });
        }
        return res.status(200).json(vets);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Add a new vet
export const addVets = async (req, res) => {
    const { Appointment, Diagnosis, treatment, prescription, vetId } = req.body;

    try {
        const vet = new vetModel({ Appointment, Diagnosis, treatment, prescription, vetId });
        await vet.save();
        return res.status(201).json(vet);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to add Vet" });
    }
};

// Get vet by ID
export const getById = async (req, res) => {
    try {
        const vet = await vetModel.findById(req.params.id);
        if (!vet) {
            return res.status(404).json({ message: "Vet not found" });
        }
        return res.status(200).json(vet);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update vet details
export const updateVet = async (req, res) => {
    // const id = ;
    // const { Appointment, Diagnosis, treatment, prescription, vetId } = req.body;

    try {
        const vet = await vetModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!vet) {
            return res.status(404).json({ message: "Unable to update vet details" });
        }
        return res.status(200).json(vet);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete vet
export const deleteVet = async (req, res) => {
    try {
        const vet = await vetModel.findByIdAndDelete(req.params.id);
        if (!vet) {
            return res.status(404).json({ message: "Unable to delete vet details" });
        }
        return res.status(200).json({ message: "Vet deleted successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// // Export functions
// exports.getAllVets = getAllVets;
// exports.addVets = addVets;
// exports.getById = getById;
// exports.updateVet = updateVet;
// exports.deleteVet = deleteVet;