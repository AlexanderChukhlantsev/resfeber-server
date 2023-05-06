import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { createExcursion, 
	deleteExcursion, 
	getAllExcursion, 
	getExcursion, 
	updateExcursion } from "../controllers/excursionController.js";

const router = express.Router();

//CREATE
router.post("/:placeid", verifyAdmin, createExcursion);

//UPDATE
router.put("/:id", verifyAdmin, updateExcursion);

//DELETE
router.delete("/:id/:placeid", verifyAdmin, deleteExcursion);

//GET
router.get("/:id", getExcursion); 

//GET ALL
router.get("/", getAllExcursion);


export default router