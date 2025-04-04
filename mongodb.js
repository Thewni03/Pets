import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const MONGO_URI = "mongodb+srv://thewni2003:Thew123@cluster0.jk5xl.mongodb.net/petcare";

        mongoose.connection.on("connected", () => console.log("Database connected"));
        mongoose.connection.on("error", (err) => console.error("Database connection error:", err));

        // Remove deprecated options
        await mongoose.connect(MONGO_URI);

    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectDB;
