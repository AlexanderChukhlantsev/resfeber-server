import express, { response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import placesRoute from "./routes/places.js";
import usersRoute from "./routes/users.js";
import excursionsRoute from "./routes/excursions.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const cors = require('cors');
app.use(cors());

const connect = async ()=>{
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log("Connected to MongoDB!");
	} catch (error) {
		throw error;  
	}
};

mongoose.connection.on("disconnected", ()=>{
	console.log("Disconnected from MongoDB!");
})

//middlewares
app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/places", placesRoute);
app.use("/api/excursions", excursionsRoute);

app.use((err, req, res, next) => {
	const errorStatus = err.status || 500
	const errorMessage = err.message || "something went wrong"
	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	})
})

app.listen(8800, ()=>{
	connect()
	console.log("Connected to backend!");
});