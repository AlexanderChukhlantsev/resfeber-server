import express from "express";
import { deleteUser, 
	getAllUser, 
	getUser, 
	updateUser } from "../controllers/userController.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// //проверка на аксес токен
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
// 	res.send("Привет пользователь, ты авторизован");
// });
// //проверка на тот ли юзер делае запрос
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
// 	res.send("Привет пользователь, ты авторизован и ты можешь удалить свой акккаунт");
// });
// //проверка на админа
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
// 	res.send("Привет пользователь, ты админ");
// });
//UPDATE
router.put("/:id", verifyUser, updateUser);
//DELETE
router.delete("/:id", verifyUser, deleteUser);
//GET
router.get("/:id", verifyUser, getUser);
//GET ALL
router.get("/", verifyAdmin, getAllUser);

export default router