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
		const { min, max, limit, ...others} = req.query;
		const places = await Place.find({
			...others,
			cheapestPrice: { $gt: min | 1, $lt: max || 999 },
		}).limit(limit);
		res.status(200).json(places);
	}
	catch (err) {
		next(err);
	}
}
export const countByCity = async (req, res, next) => {
	const cities = req.query.cities.split(",");
	try {
		const list = await Promise.all(
			cities.map((city) => {
				return Place.countDocuments({ city: city });
			})
		);
		res.status(200).json(list);
	} catch (err) {
		next(err);
	}
};
export const countByType = async (req, res, next) => {
	try {
		const sightCount = await Place.countDocuments({type: "Достопримечательность"});
		const museumCount = await Place.countDocuments({type: "Музей"});
		const galleryCount = await Place.countDocuments({type: "Галерея"});
		const monumentCount = await Place.countDocuments({type: "Памятник"});
		const parkCount = await Place.countDocuments({type: "Интересные места"});
		res.status(200).json([
      { type: "Достопримечательностей", count: sightCount },
      { type: "Музеев", count: museumCount },
      { type: "Галерей", count: galleryCount },
      { type: "Памятников", count: monumentCount },
      { type: "Интересных мест", count: parkCount },
    ]);
	} catch (err) {
		next(err);
	}
};