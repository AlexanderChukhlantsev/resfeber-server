import Excursion from "../models/Excursion.js";
import Excursion from "../models/Excursion.js";
import { createError } from "../utils/error.js";

export const createExcursion = async (req, res, next) => {
	const excursionId = req.params.excursionid;
	const newExcursion = new Excursion(req.body);
	try {
		const saveExcursion = await newExcursion.save();
		try {
			await Excursion.findByIdAndUpdate(excursionId, {
				$push : {excursion: saveExcursion._id},
			});
		} catch (err) {
			next(err);
		}
		res.status(200).json(saveExcursion);
	} catch (err) {
		next(err);
	}
};
export const updateExcursion = async (req, res, next) => {
	try {
		const updateExcursion = await Excursion.findByIdAndUpdate(
			req.params.id, 
			{$set: req.body}, 
			{new:true});
		res.status(200).json(updateExcursion);
	}
	catch (err) {
		next(err);
	}
}
export const deleteExcursion = async (req, res, next) => {
	try {
		await Excursion.findByIdAndDelete(req.params.id);
		res.status(200).json("Место было удалено");
	}
	catch (err) {
		next(err);
	}
}
export const getExcursion = async (req, res, next) => {
	try {
		const excursion = await Excursion.findById(req.params.id);
		res.status(200).json(excursion);
	}
	catch (err) {
		next(err);
	}
}
export const getAllExcursion = async (req, res, next) => {
	try {
		const excursions = await Excursion.find();
		res.status(200).json(excursions);
	}
	catch (err) {
		next(err);
	}
}