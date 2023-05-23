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
export const updateExcursion = async (req, res, next) => {
	try {
		const updateExcursion = await Excursion.findByIdAndUpdate(
			req.params.id, 
			{$set: req.body}, 
			{new: true});
		res.status(200).json(updateExcursion);
	}
	catch (err) {
		next(err);
	}
};
export const updateExcursionAvailability = async (req, res, next) => {
  try {
    await Excursion.updateOne(
      { "excursionNumbers._id": req.params.id },
      {
        $push: {
          "excursionNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Экскурсия была обновлена.");
  } catch (err) {
    next(err);
  }
};
export const deleteExcursion = async (req, res, next) => {
	const placeId = req.params.placeid;
	try {
		await Excursion.findByIdAndDelete(req.params.id);
		try {
			await Place.findByIdAndUpdate(placeId, {
				$pull : {excursion: req.params.id},
			});
		} catch (err) {
			next(err);
		}
		res.status(200).json("Экскурсия была удалена");
	}
	catch (err) {
		next(err);
	}
};
export const getExcursion = async (req, res, next) => {
	try {
		const excursion = await Excursion.findById(req.params.id);
		res.status(200).json(excursion);
	}
	catch (err) {
		next(err);
	}
};
export const getAllExcursion = async (req, res, next) => {
	try {
		const excursions = await Excursion.find();
		res.status(200).json(excursions);
	}
	catch (err) {
		next(err);
	}
};
export const countAll = async (req, res, next) => {
	try {
		const allCount = await Excursion.countDocuments({});
		res.status(200).json(
			{ count: allCount }
		);
	} catch (err) {
		next(err);
	}
};
export const countUnavailableDates = async (req, res, next) => {
  try {
    const excursions = await Excursion.find(); // Получаем все экскурсии
    let count = 0;
    // Считаем общее количество unavailableDates
    excursions.forEach((excursion) => {
      excursion.excursionNumbers.forEach((excursionNumber) => {
        count += excursionNumber.unavailableDates.length;
      });
    });
    res.status(200).json({ count });
  } catch (err) {
    next(err);
  }
};
export const getAllUnavailableDates = async (req, res, next) => {
  try {
    const excursions = await Excursion.find(); // Получаем все экскурсии
    let unavailableDates = [];
    // Собираем все unavailableDates в один массив
    excursions.forEach((excursion) => {
      excursion.excursionNumbers.forEach((excursionNumber) => {
        unavailableDates = unavailableDates.concat(excursionNumber.unavailableDates);
      });
    });
    res.status(200).json(unavailableDates);
  } catch (err) {
    next(err);
  }
};
export const getOccupancyPercentage = async (req, res, next) => {
  try {
    const excursions = await Excursion.find(); // Получаем все экскурсии
    let totalUnavailableDates = 0;
    let totalMaxPeople = 0;
    // Вычисляем общее количество unavailableDates и максимальное количество людей
    excursions.forEach((excursion) => {
      excursion.excursionNumbers.forEach((excursionNumber) => {
        totalUnavailableDates += excursionNumber.unavailableDates.length;
        totalMaxPeople += excursion.maxPeople;
      });
    });
    // Вычисляем процент заполненности
    const occupancyPercentage = Math.round((totalUnavailableDates / totalMaxPeople) * 100);
    res.status(200).json({ occupancyPercentage });
  } catch (err) {
    next(err);
  }
};
export const getExcursionData = async (req, res, next) => {
  try {
    // Получаем все места
    const places = await Place.find();
    // Создаем массив для хранения данных в нужном формате
    const excursionData = [];
    // Обходим каждое место
    for (const place of places) {
      // Получаем экскурсии, прикрепленные к данному месту
      const excursions = await Excursion.find({ _id: { $in: place.excursion } });
      // Обходим каждую экскурсию
      for (const excursion of excursions) {
        // Проверяем, что у экскурсии есть непустой unavailableDates
        if (!excursion.excursionNumbers || excursion.excursionNumbers.length === 0) {
          continue; // Пропускаем экскурсию, если отсутствуют непустые unavailableDates
        }
        // Получаем занятые даты для экскурсии
        const unavailableDates = excursion.excursionNumbers
          .filter((excursionNumber) => excursionNumber.unavailableDates && excursionNumber.unavailableDates.length > 0)
          .flatMap((excursionNumber) => excursionNumber.unavailableDates);
        // Проверяем, что есть непустые занятые даты
        if (unavailableDates.length === 0) {
          continue; // Пропускаем экскурсию, если отсутствуют непустые занятые даты
        }
        // Создаем объект с необходимыми данными
        const data = {
					placeId: place._id,
          placeName: place.name,
					excursionId: excursion._id,
          excursionTitle: excursion.title,
          unavailableDates,
        };
        // Добавляем объект в массив данных
        excursionData.push(data);
      }
    }
    res.status(200).json(excursionData);
  } catch (err) {
    next(err);
  }
};