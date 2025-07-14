import express from "express";
import {
  register,
  login,
  logout,
  getAllUsers,
  updateProfile,
} from "../controllers/user.controller.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

// 🔐 Authentication Routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

// 👤 User Profile Routes
router.put("/profile/update", isAuthenticated, singleUpload, updateProfile);

// 🔎 Admin or Dev Routes (optional)
router.get("/all-users", getAllUsers);

export default router;

