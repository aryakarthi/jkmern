import express from "express";
import { loginUser, logoutUser, refresh } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.post("/refresh", refresh);

export default router;
