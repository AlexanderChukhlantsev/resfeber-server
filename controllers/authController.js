import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

export const register = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return next(createError(400, "Ошибка валидации!"));
		}
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);
		const newUser = new User({
//			username: req.body.username,
//			email: req.body.email,
			...req.body,
			password: hash,
		})
		const user = await User.findOne({username: req.body.username});
		if (user) return next(createError(404, "Юзер с таким именем уже есть!"));
		const email = await User.findOne({email: req.body.email});
		if (email) return next(createError(404, "Юзер с таким email уже есть!"));
		await newUser.save()
		res.status(200).send("Юзер был создан!");
	}
	catch (err) {
		next(err);
	}
}

export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({username: req.body.username});
		if (!user) return next(createError(404, "Юзер не был найден!"));
		const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
		if (!isPasswordCorrect) 
			return next(createError(400, "Неверный пароль или имя пользователя!"));
		
		const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT);
		const {password, isAdmin, ...otherDetails} = user._doc;
		res.cookie("access_token", token, {
			httpOnly: true,
		}).status(200).json({ details:{...otherDetails}, isAdmin});
	}
	catch (err) {
		next(err);
	}
}