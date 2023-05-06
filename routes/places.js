import express from "express";
import Place from "../models/Place.js";
import { createPlace, 
	deletePlace, 
	getAllPlace, 
	getPlace, 
	updatePlace } from "../controllers/placeController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createPlace);

//UPDATE
router.put("/:id", verifyAdmin, updatePlace);

//DELETE
router.delete("/:id", verifyAdmin, deletePlace);
//GET
router.get("/:id", getPlace);

//GET ALL
router.get("/", getAllPlace);

export default router;