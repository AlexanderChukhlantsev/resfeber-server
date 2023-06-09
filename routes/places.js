import express from "express";
import { countAll, 
	countByCity, 
	countByType, 
	createPlace, 
	deletePlace, 
	getAllPlace, 
	getPlace, 
	getPlaceExcursions, 
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
router.get("/find/:id", getPlace);

//GET ALL
router.get("/", getAllPlace);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/excursion/:id", getPlaceExcursions);
router.get("/countAll", verifyAdmin, countAll);

export default router;