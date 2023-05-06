import Place from "../models/Place.js";

export const createPlace = async (req, res, next) => {
	const newPlace = new Place(req.body);

	try {
		const savedPlace = await newPlace.save();
		res.status(200).json(savedPlace);
	}
	catch (err) {
		next(err);
	}
}
export const updatePlace = async (req, res, next) => {
	try {
		const updatePlace = await Place.findByIdAndUpdate(
			req.params.id, 
			{$set: req.body}, 
			{new:true});
		res.status(200).json(updatePlace);
	}
	catch (err) {
		next(err);
	}
}
export const deletePlace = async (req, res, next) => {
	try {
		await Place.findByIdAndDelete(req.params.id);
		res.status(200).json("Место было удалено");
	}
	catch (err) {
		next(err);
	}
}
export const getPlace = async (req, res, next) => {
	try {
		const place = await Place.findById(req.params.id);
		res.status(200).json(place);
	}
	catch (err) {
		next(err);
	}
}
export const getAllPlace = async (req, res, next) => {
	try {
		const places = await Place.find();
		res.status(200).json(places);
	}
	catch (err) {
		next(err);
	}
}