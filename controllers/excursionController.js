import Excursion from "../models/Excursion.js";
import Place from "../models/Place.js";
import { createError } from "../utils/error.js";

export const createExcursion = async (req, res, next) => {
	const placeId = req.params.placeid;
	const newExcursion = new Excursion(req.body);
	try {
		const saveExcursion = await newExcursion.save();
		try {
			await Place.findByIdAndUpdate(placeId, {
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