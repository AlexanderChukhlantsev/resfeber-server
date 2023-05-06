import express from "express";
import Place from "../models/Place.js";
import { createPlace, 
	deletePlace, 
	getAllPlace, 
	getPlace, 
	updatePlace } from "../controllers/placeController.js";

const router = express.Router();

//CREATE
router.post("/", createPlace);

//UPDATE
router.put("/:id", updatePlace);

//DELETE
router.delete("/:id", deletePlace);
//GET
router.get("/:id", getPlace);

//GET ALL
router.get("/", getAllPlace);

export default router;