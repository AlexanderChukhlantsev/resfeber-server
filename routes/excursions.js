import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { countAll, 
	countUnavailableDates, 
	createExcursion, 
	deleteExcursion, 
	getAllExcursion, 
	getAllUnavailableDates, 
	getExcursion, 
	getExcursionData, 
	getOccupancyPercentage, 
	getPlaceIds, 
	updateExcursion, 
	updateExcursionAvailability} from "../controllers/excursionController.js";

const router = express.Router();

//GET ALL
router.get("/countAll", verifyAdmin, countAll);
router.get("/countUnavailableDates", verifyAdmin, countUnavailableDates);
router.get("/unavailableDates", verifyAdmin, getAllUnavailableDates);
router.get("/occupancyPercentage", verifyAdmin, getOccupancyPercentage);
router.get("/getExcursionData", verifyAdmin, getExcursionData);
router.get("/getPlaceIds/:excursionId", verifyAdmin, getPlaceIds);
router.get("/", getAllExcursion);

//CREATE
router.post("/:placeid", verifyAdmin, createExcursion);

//UPDATE
router.put("/:id", verifyAdmin, updateExcursion);
router.put("/availability/:id", updateExcursionAvailability);

//DELETE
router.delete("/:id", verifyAdmin, deleteExcursion);
router.delete("/:placeid/:id", verifyAdmin, deleteExcursion);

//GET
router.get("/:id", getExcursion);


export default router