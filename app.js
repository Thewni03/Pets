//pass= 7AAAXNPecWdORCB8

const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/UserRoutes");

const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());
app.use("/dogs",router);


mongoose.connect("mongodb+srv://thewni2003:Thew123@cluster0.jk5xl.mongodb.net/dogs")
.then(()=> console.log("Connected to mongoDB"))
.then(() => {
    app.listen(5008);
})
.catch((err)=> console.log((err)));