import express from "express";
import {
  registerUser,
  getAllUsers,
  getUser,
  editUser,
  removeUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);

router.get("/", getAllUsers);

router.get("/profile", getUser);

router.put("/profile", editUser);

router.delete("/profile/:id", removeUser);

export default router;
