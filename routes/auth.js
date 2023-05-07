import express from "express";
import { login, register } from "../controllers/authController.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/register", 
	body('username').notEmpty(),
	body('email').isEmail(),
	body('password').isLength({min: 3,max: 32}),
	register
);
router.post("/login", login);

export default router